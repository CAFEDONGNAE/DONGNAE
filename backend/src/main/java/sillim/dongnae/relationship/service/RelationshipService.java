package sillim.dongnae.relationship.service;

import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;

import java.util.List;

public interface RelationshipService {

    boolean follow(Long followerId, Long followingId);

    List<FollowingResponse> getFollowing(Long memberId);

    List<FollowSuggestResponse> getFollowSuggests(Long memberId);

}

