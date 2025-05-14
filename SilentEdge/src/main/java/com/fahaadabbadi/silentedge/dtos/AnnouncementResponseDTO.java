package com.fahaadabbadi.silentedge.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnnouncementResponseDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
}
