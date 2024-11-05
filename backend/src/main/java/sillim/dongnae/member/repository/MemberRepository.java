package sillim.dongnae.member.repository;

import sillim.dongnae.member.dto.response.MemberProfileResponse;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.List;

public interface MemberRepository {

    boolean checkEmailDuplication(String email);

    boolean registerMember(Member member);

    Member login(String email, String password);

    Member findById(Long id);

    boolean addRelationship(Long memberId, Relationship relationship);

    List<FollowingResponse> getFollowingInfo(List<Long> followingIdList);

    List<FollowSuggestResponse> getFollowSuggestInfo(List<Long> followSuggestIdList);

    List<MemberProfileResponse> searchMember(String query);
}
