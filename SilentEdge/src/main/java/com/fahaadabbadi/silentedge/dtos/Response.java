package com.fahaadabbadi.silentedge.dtos;

import com.fahaadabbadi.silentedge.enums.Role;
import com.fahaadabbadi.silentedge.models.Announcement;
import com.fahaadabbadi.silentedge.models.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    //Generic
    private int status;
    private String message;

    //For Login
    private String token;
    private Role role;
    private String expirationTime;

    //for pagination
    private Integer totalPages;
    private Long totalElements;

    // data output optionals
    // post related messages
    private PostResponseDTO post;
    private List<PostResponseDTO> posts;

    // comment related responses
    private CommentResponseDTO comment;
    private List<CommentResponseDTO> comments;

    // Category related responses
    private CategoryDTO category;
    private List<CategoryDTO> categories;

    // User-related response
    private UserDTO user;
    private List<UserDTO> users;

    // Announcements
    private AnnouncementResponseDTO announcement;
    private List<AnnouncementResponseDTO> announcements;

    private final LocalDateTime timestamp = LocalDateTime.now();
}
