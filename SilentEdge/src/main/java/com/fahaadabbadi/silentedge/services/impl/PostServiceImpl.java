package com.fahaadabbadi.silentedge.services.impl;

import com.fahaadabbadi.silentedge.dtos.PostRequestDTO;
import com.fahaadabbadi.silentedge.dtos.PostResponseDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.exceptions.NotFoundException;
import com.fahaadabbadi.silentedge.models.Category;
import com.fahaadabbadi.silentedge.models.Post;
import com.fahaadabbadi.silentedge.models.User;
import com.fahaadabbadi.silentedge.repositories.CategoryRepository;
import com.fahaadabbadi.silentedge.repositories.PostRepository;
import com.fahaadabbadi.silentedge.repositories.UserRepository;
import com.fahaadabbadi.silentedge.services.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {
    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    public Response createPost(PostRequestDTO postRequestDTO) {
        //Fetch the user manually
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByAnonymousUserName(username)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        Category category = categoryRepository.findById(postRequestDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        String capitalized = capitalizeTitle(postRequestDTO.getTitle());
        postRequestDTO.setTitle(capitalized);
        Post postToSave = modelMapper.map(postRequestDTO, Post.class);

        // Set the category manually
        postToSave.setId(null);
        postToSave.setCategory(category);
        postToSave.setCreatedAt(LocalDateTime.now());
        postToSave.setVoteCount(0);
        postToSave.setUser(user);


        // Log post before saving
        log.info("Saving post: {}", postToSave);

        postRepository.save(postToSave);

        return Response.builder()
                .status(200)
                .message("Post Created Successfully")
                .build();
    }

    private String capitalizeTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            return title; // or return ""
        }
        // Split by spaces, capitalize first letter, lower the rest
        return Arrays.stream(title.split("\\s+"))
                .map(word -> word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    @Override
    public Response getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post Not Found"));

        PostResponseDTO postResponseDTO = modelMapper.map(post, PostResponseDTO.class);
        return Response.builder()
                .status(200)
                .message("Post retrieved successfully")
                .post(postResponseDTO)
                .build();
    }

    @Override
    public Response getAllPosts() {
        List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<PostResponseDTO> postResponseDTOS = modelMapper.map(posts, new TypeToken<List<PostResponseDTO>>() {}.getType());

        return Response.builder()
                .status(200)
                .message("Post retrieved successfully")
                .posts(postResponseDTOS)
                .build();
    }

    @Override
    public Response updatePost(Long postId, PostRequestDTO postRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post Not Found"));

        if(!existingPost.getUser().getAnonymousUserName().equals(username)){
            throw new AccessDeniedException("You can only update your own posts");
        }

        existingPost.setTitle(postRequestDTO.getTitle());
        existingPost.setContent(postRequestDTO.getContent());

        postRepository.save(existingPost);

        return Response.builder()
                .status(200)
                .message("Post Updated Successfully")
                .build();
    }

    @Override
    public Response deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post Not Found"));

        //Replace content with null value
        post.setContent("");
        post.setTitle("");

        // Mark the post as deleted and set the reason
        post.setDeleted(true);

        postRepository.save(post);

        return Response.builder()
                .status(200)
                .message("Post deleted successfully by admin")
                .build();
    }
}
