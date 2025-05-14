package com.fahaadabbadi.silentedge.repositories;

import com.fahaadabbadi.silentedge.models.Comment;
import com.fahaadabbadi.silentedge.models.Post;
import com.fahaadabbadi.silentedge.models.User;
import com.fahaadabbadi.silentedge.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndPost(User user, Post post);
    Optional<Vote> findByUserAndComment(User user, Comment comment);
}
