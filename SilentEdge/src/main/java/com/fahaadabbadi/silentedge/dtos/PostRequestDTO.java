package com.fahaadabbadi.silentedge.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PostRequestDTO {
    private String title;
    private String content;
    private Long categoryId;
    private LocalDateTime createdAt;
}
