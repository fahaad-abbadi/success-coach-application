package com.fahaadabbadi.silentedge.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResponseDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private int voteCount;
    private boolean isDeleted;
}
