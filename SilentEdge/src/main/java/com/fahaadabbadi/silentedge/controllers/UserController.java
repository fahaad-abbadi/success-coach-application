package com.fahaadabbadi.silentedge.controllers;

import com.fahaadabbadi.silentedge.dtos.LoginRequest;
import com.fahaadabbadi.silentedge.dtos.RegisterRequest;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.dtos.UserDTO;
import com.fahaadabbadi.silentedge.models.User;
import com.fahaadabbadi.silentedge.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@Valid @RequestBody RegisterRequest registerRequest)
    {
        return ResponseEntity.ok(userService.registerUser(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@Valid @RequestBody LoginRequest loginRequest)
    {
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable Long userId)
    {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PutMapping("/update/{userId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO){
        return ResponseEntity.ok(userService.updateUser(userId, userDTO));
    }

    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUser(@PathVariable Long userId)
    {
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @GetMapping("/current")
    public ResponseEntity<Response> getCurrentUser(){
        return ResponseEntity.ok(userService.getCurrentLoggedInUser());
    }
}
