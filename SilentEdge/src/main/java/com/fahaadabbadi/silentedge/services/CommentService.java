package com.fahaadabbadi.silentedge.services;

import com.fahaadabbadi.silentedge.dtos.CommentRequestDTO;
import com.fahaadabbadi.silentedge.dtos.Response;

public interface CommentService {
    Response addComment(Long postId, CommentRequestDTO commentRequestDTO);
    Response getCommentsByPostId(Long postId);
    Response getCommentById(Long commentId);
    Response deleteComment(Long commentId);
}
