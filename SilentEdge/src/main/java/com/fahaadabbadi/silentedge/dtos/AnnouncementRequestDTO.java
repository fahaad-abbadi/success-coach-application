package com.fahaadabbadi.silentedge.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnnouncementRequestDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
}
