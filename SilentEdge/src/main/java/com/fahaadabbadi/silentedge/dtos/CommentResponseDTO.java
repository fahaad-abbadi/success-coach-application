package com.fahaadabbadi.silentedge.dtos;

import com.fahaadabbadi.silentedge.models.Comment;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentResponseDTO {
    private Long id;
    private String content;
    private int voteCount;
    private Long parentCommentId;
    List<CommentResponseDTO> replies;
    private LocalDateTime createdAt;
}
