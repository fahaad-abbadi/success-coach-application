package com.fahaadabbadi.silentedge.repositories;

import com.fahaadabbadi.silentedge.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategory_Id(Long categoryId);
}
