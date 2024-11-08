package sillim.dongnae.relationship.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.member.repository.MemberJpaRepository;
import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;
import sillim.dongnae.relationship.entity.Relationship;
import sillim.dongnae.relationship.repository.RelationshipJpaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RelationshipServiceImpl implements RelationshipService {

    private final RelationshipJpaRepository relationshipRepository;
    private final MemberJpaRepository memberRepository;

    @Override
    @Transactional
    public boolean follow(Long followerId, Long followingId) {

        /*
         * 예외처리 리스트
         * 1. 팔로우, 팔로워 멤버 존재하는지 확인한다.
         * 2. 이미 존재하는 팔로우 관계인지 확인한다.
         * 3. 팔로우 관계 중 발생하는 에러를 확인한다.
         * */

        Member followerMember = memberRepository.findById(followerId).orElse(null);
        Member followingMember = memberRepository.findById(followingId).orElse(null);

        Relationship newRelationship = new Relationship(followerMember, followingMember);

        relationshipRepository.save(newRelationship);

        return true;
    }

    @Override
    public List<FollowingResponse> getFollowing(Long memberId) {

        return relationshipRepository.findByFollowerMemberId(memberId)
                .stream()
                .map(relationship -> new FollowingResponse(relationship.getFollowingMember()))
                .toList();
    }

    @Override
    public List<FollowSuggestResponse> getFollowSuggests(Long memberId) {

        return relationshipRepository.followSuggest(memberId)
                .stream()
                .map(relationship -> new FollowSuggestResponse(relationship.getFollowerMember()))
                .toList();
    }
}
