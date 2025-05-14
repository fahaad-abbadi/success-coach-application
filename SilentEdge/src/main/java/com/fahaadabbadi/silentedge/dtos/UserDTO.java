package com.fahaadabbadi.silentedge.dtos;

import com.fahaadabbadi.silentedge.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {
    private Long id;
    private String displayName;

    @JsonIgnore
    private String anonymousUserName;

    @JsonIgnore
    private String password;
    private Role role;
    private List<PostResponseDTO> posts;
    private List<CommentResponseDTO> comments;

    private LocalDateTime createdAt = LocalDateTime.now();

    public void setDisplayName(String anonymousUsername) {
        // Handle null or empty values gracefully
        if (anonymousUsername != null && !anonymousUsername.isEmpty()) {
            this.displayName = decodeUsername(anonymousUsername);
        }
    }

    private String decodeUsername(String encodedUsername) {
        try {
            return new String(Base64.getDecoder().decode(encodedUsername));
        } catch (IllegalArgumentException e) {
             return "Anonymous"; // Fallback for invalid encoding
        }
    }
}
