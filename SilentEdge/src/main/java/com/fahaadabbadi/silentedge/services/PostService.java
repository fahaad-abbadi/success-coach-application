package com.fahaadabbadi.silentedge.services;

import com.fahaadabbadi.silentedge.dtos.PostRequestDTO;
import com.fahaadabbadi.silentedge.dtos.PostResponseDTO;
import com.fahaadabbadi.silentedge.dtos.Response;

import java.util.List;

public interface PostService {
    Response createPost(PostRequestDTO postRequestDTO);
    Response getPostById(Long postId);
    Response getAllPosts();
    Response updatePost(Long postId, PostRequestDTO postRequestDTO);
    Response deletePost(Long postId);
}
