package com.fahaadabbadi.silentedge.controllers;

import com.fahaadabbadi.silentedge.dtos.VoteRequestDTO;
import com.fahaadabbadi.silentedge.enums.VoteType;
import com.fahaadabbadi.silentedge.services.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<String> voteOnPost(
            @PathVariable Long postId,
            @RequestParam("type") VoteType voteType,
            Authentication authentication
    ) {
        String username = authentication.getName();
        voteService.vote(postId, voteType, username);
        return ResponseEntity.ok("Vote on post processed");
    }

}
