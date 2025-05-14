package com.fahaadabbadi.silentedge.services.impl;

import com.fahaadabbadi.silentedge.enums.VoteType;
import com.fahaadabbadi.silentedge.models.Post;
import com.fahaadabbadi.silentedge.models.User;
import com.fahaadabbadi.silentedge.models.Vote;
import com.fahaadabbadi.silentedge.repositories.PostRepository;
import com.fahaadabbadi.silentedge.repositories.UserRepository;
import com.fahaadabbadi.silentedge.repositories.VoteRepository;
import com.fahaadabbadi.silentedge.services.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public void vote(Long postId, VoteType voteType, String username) {
        User user = userRepository.findByAnonymousUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<Vote> existingVote = voteRepository.findByUserAndPost(user, post);

        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();

            if (vote.getVoteType() == voteType) {
                // Undo the vote
                voteRepository.delete(vote);
                post.setVoteCount(post.getVoteCount() + (voteType == VoteType.UPVOTE ? -1 : 1));
            } else {
                // Change vote direction
                vote.setVoteType(voteType);
                voteRepository.save(vote);
                post.setVoteCount(post.getVoteCount() + (voteType == VoteType.UPVOTE ? 2 : -2));
            }
        } else {
            // New vote
            Vote newVote = Vote.builder()
                    .user(user)
                    .post(post)
                    .voteType(voteType)
                    .build();
            voteRepository.save(newVote);
            post.setVoteCount(post.getVoteCount() + (voteType == VoteType.UPVOTE ? 1 : -1));
        }

        postRepository.save(post);
    }
}
