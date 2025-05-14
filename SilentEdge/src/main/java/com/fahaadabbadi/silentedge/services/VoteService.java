package com.fahaadabbadi.silentedge.services;

import com.fahaadabbadi.silentedge.dtos.VoteRequestDTO;
import com.fahaadabbadi.silentedge.enums.VoteType;

public interface VoteService {
    public void vote(Long postId, VoteType voteType, String username);
}
