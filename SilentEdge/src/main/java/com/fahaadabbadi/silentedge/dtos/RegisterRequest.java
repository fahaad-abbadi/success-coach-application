package com.fahaadabbadi.silentedge.dtos;

import com.fahaadabbadi.silentedge.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Anonymous username is required")
    private String anonymousUserName;

    @NotBlank(message = "Password is required")
    private String password;

    private Role role;
}
