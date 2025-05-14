package com.fahaadabbadi.silentedge.dtos;

import com.fahaadabbadi.silentedge.enums.VoteType;
import lombok.Data;

@Data
public class VoteRequestDTO {
    private Long postId;
    private Long commentId;
    private VoteType voteType;
}
