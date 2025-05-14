package com.fahaadabbadi.silentedge.services.impl;

import com.fahaadabbadi.silentedge.dtos.CommentRequestDTO;
import com.fahaadabbadi.silentedge.dtos.CommentResponseDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.exceptions.NotFoundException;
import com.fahaadabbadi.silentedge.models.Category;
import com.fahaadabbadi.silentedge.models.Comment;
import com.fahaadabbadi.silentedge.models.Post;
import com.fahaadabbadi.silentedge.models.User;
import com.fahaadabbadi.silentedge.repositories.CommentRepository;
import com.fahaadabbadi.silentedge.repositories.PostRepository;
import com.fahaadabbadi.silentedge.repositories.UserRepository;
import com.fahaadabbadi.silentedge.services.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public Response addComment(Long postId, CommentRequestDTO requestDTO) {
        // 1. Get current user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByAnonymousUserName(username)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        // 2. Get the Post
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found"));

        // 3. Convert RequestDTO -> Comment
        Comment comment = modelMapper.map(requestDTO, Comment.class);
        comment.setPost(post);
        comment.setUser(user);

        // 4. If it's a reply, set the parent comment
        if (requestDTO.getParentCommentId() != null) {
            Comment parentComment = commentRepository.findById(requestDTO.getParentCommentId())
                    .orElseThrow(() -> new NotFoundException("Parent Comment not Found"));
            comment.setId(null);
            comment.setParentComment(parentComment);
        }

        // 5. Save
        comment.setCreatedAt(LocalDateTime.now());
        commentRepository.save(comment);

        return Response.builder()
                .status(200)
                .message("Comment added successfully")
                .build();
    }

    @Override
    public Response getCommentsByPostId(Long postId) {
        List<Comment> allComments = commentRepository.findByPost_Id(postId);

        // Filter out top-level
        List<Comment> topLevel = allComments.stream()
                .filter(c -> c.getParentComment() == null)
                .collect(Collectors.toList());

        // Recursively map them
        List<CommentResponseDTO> dtoList = topLevel.stream()
                .map(this::mapToDtoRecursively)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .comments(dtoList)
                .build();
    }

    private CommentResponseDTO mapToDtoRecursively(Comment comment) {
        CommentResponseDTO dto = modelMapper.map(comment, CommentResponseDTO.class);

        // Convert children if any
        if (comment.getReplies() != null && !comment.getReplies().isEmpty()) {
            List<CommentResponseDTO> childDtos = comment.getReplies().stream()
                    .map(this::mapToDtoRecursively)  // recursion
                    .collect(Collectors.toList());
            dto.setReplies(childDtos);
        }
        // Also set parentCommentId if you want
        if (comment.getParentComment() != null) {
            dto.setParentCommentId(comment.getParentComment().getId());
        }
        return dto;
    }


    /**
     * Recursively maps a Comment entity -> CommentResponseDTO (including child replies)
     */
    private CommentResponseDTO mapToDTOWithReplies(Comment comment) {
        // Basic mapping
        CommentResponseDTO dto = modelMapper.map(comment, CommentResponseDTO.class);

        // Recursively map child replies if present
        if (comment.getReplies() != null && !comment.getReplies().isEmpty()) {
            List<CommentResponseDTO> replyDTOs = comment.getReplies().stream()
                    .map(this::mapToDTOWithReplies)
                    .collect(Collectors.toList());
            dto.setReplies(replyDTOs);
        }
        return dto;
    }

    @Override
    public Response getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found"));
        // Optionally, fetch child replies, too
        CommentResponseDTO commentDTO = mapToDTOWithReplies(comment);

        return Response.builder()
                .status(200)
                .message("Comment retrieved successfully")
                .comment(commentDTO)
                .build();
    }

    @Override
    public Response deleteComment(Long commentId) {
        commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found"));
        commentRepository.deleteById(commentId);
        return Response.builder()
                .status(200)
                .message("Comment deleted successfully")
                .build();
    }
}
