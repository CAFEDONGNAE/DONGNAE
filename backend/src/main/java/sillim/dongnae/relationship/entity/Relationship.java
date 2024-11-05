package sillim.dongnae.relationship.entity;

import lombok.Getter;

@Getter
public class Relationship {

    private Long id;
    private Long followerId;
    private Long followingId;
    private boolean approve;

    public Relationship(Long followerId, Long followingId, boolean approve) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.approve = approve;
    }

    public void setRelationshipId(Long relationshipId) {
        this.id = relationshipId;
    }
}
