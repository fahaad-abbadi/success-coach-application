package com.fahaadabbadi.silentedge.controllers;

import com.fahaadabbadi.silentedge.dtos.CommentRequestDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/add/{postId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Response> addComment(@PathVariable Long postId, @RequestBody CommentRequestDTO commentRequestDTO){
        return ResponseEntity.ok(commentService.addComment(postId, commentRequestDTO));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Response> getCommentsByPostId(@PathVariable Long postId){
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @GetMapping("/update/{commentId}")
    public ResponseEntity<Response> getCommentById(@PathVariable Long commentId){
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    @DeleteMapping("/delete/{commentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteComment(@PathVariable Long commentId){
        return ResponseEntity.ok(commentService.deleteComment(commentId));
    }
}
