package sillim.dongnae.relationship.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sillim.dongnae.member.repository.MemberRepository;
import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;
import sillim.dongnae.relationship.entity.Relationship;
import sillim.dongnae.relationship.repository.RelationshipRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RelationshipServiceImpl implements RelationshipService {

    private final RelationshipRepository relationshipRepository;
    private final MemberRepository memberRepository;

    @Override
    public boolean addRelationship(Long followerId, Long followingId) {

        Relationship relation = relationshipRepository.findRelation(followerId, followingId);
        if (relation != null) {
            relation.approve();
            return true;
        }

        Relationship followerRelationship = relationshipRepository.addRelationship(followerId, followingId, true);
        memberRepository.addRelationship(followerId, followerRelationship);

        Relationship followingRelationship = relationshipRepository.addRelationship(followingId, followerId, false);
        memberRepository.addRelationship(followingId, followingRelationship);

        return true;
    }

    @Override
    public List<FollowingResponse> getFollowing(Long memberId) {

        List<Long> followingIdList = relationshipRepository.getFollowing(memberId);
        return memberRepository.getFollowingInfo(followingIdList);
    }

    @Override
    public List<FollowSuggestResponse> getFollowSuggests(Long memberId) {

        List<Long> followSuggestId = relationshipRepository.getFollowSuggestId(memberId);
        return memberRepository.getFollowSuggestInfo(followSuggestId);
    }
}
