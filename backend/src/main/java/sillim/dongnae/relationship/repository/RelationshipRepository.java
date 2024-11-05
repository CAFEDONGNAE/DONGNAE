package sillim.dongnae.relationship.repository;

import sillim.dongnae.relationship.entity.Relationship;

import java.util.List;

public interface RelationshipRepository {

    Relationship addRelationship(Long followerId, Long followingId, boolean approve);

    List<Long> getFollowing(Long memberId);

    List<Long> getFollowSuggestId(Long memberId);

}
