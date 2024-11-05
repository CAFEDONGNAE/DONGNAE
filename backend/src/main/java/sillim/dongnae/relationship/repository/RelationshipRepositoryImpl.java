package sillim.dongnae.relationship.repository;

import org.springframework.stereotype.Repository;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RelationshipRepositoryImpl implements RelationshipRepository {

    private final List<Relationship> relationshipList = new ArrayList<>();

    @Override
    public Relationship addRelationship(Long followerId, Long followingId, boolean approve) {

        Relationship relationship = new Relationship(followerId, followingId, true);
        relationship.setRelationshipId((long) (relationshipList.size() + 1));

        relationshipList.add(relationship);

        return relationship;
    }

    @Override
    public List<Long> getFollowing(Long memberId) {

        List<Long> followingIdList = new ArrayList<>();

        for (Relationship relationship : relationshipList) {
            if (relationship.getFollowerId().equals(memberId)) {
                followingIdList.add(relationship.getFollowingId());
            }
        }

        return followingIdList;
    }

    @Override
    public List<Long> getFollowSuggestId(Long memberId) {

        // 추천하는 사람들의 아이디를 저장하는 List
        List<Long> followingSuggestIdList = new ArrayList<>();

        for (Relationship relationship : relationshipList) {
            if (relationship.getFollowingId().equals(memberId)) {
                followingSuggestIdList.add(relationship.getFollowerId());
            }
        }

        return followingSuggestIdList;
    }
}
