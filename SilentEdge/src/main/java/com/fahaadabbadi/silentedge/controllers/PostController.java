package com.fahaadabbadi.silentedge.controllers;

import com.fahaadabbadi.silentedge.dtos.PostRequestDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.repositories.PostRepository;
import com.fahaadabbadi.silentedge.repositories.UserRepository;
import com.fahaadabbadi.silentedge.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Response> createPost(@RequestBody PostRequestDTO postRequestDTO){
        return ResponseEntity.ok(postService.createPost(postRequestDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllPosts(){
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getPostById(@PathVariable Long id){
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Response> updatePost(@PathVariable Long id, @RequestBody PostRequestDTO postRequestDTO){
        return ResponseEntity.ok(postService.updatePost(id, postRequestDTO));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deletePost(@PathVariable Long id){
        return ResponseEntity.ok(postService.deletePost(id));
    }
}
