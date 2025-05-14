package com.fahaadabbadi.silentedge.dtos;

import lombok.Data;

@Data
public class CommentRequestDTO {
    private String content;
    private Long parentCommentId;
}
