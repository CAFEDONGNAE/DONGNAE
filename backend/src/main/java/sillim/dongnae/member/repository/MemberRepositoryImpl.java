package sillim.dongnae.member.repository;

import org.springframework.stereotype.Repository;
import sillim.dongnae.member.dto.response.MemberProfileResponse;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    List<Member> memberList = new ArrayList<>();

    @Override
    public boolean checkEmailDuplication(String email) {

        for (Member member : memberList) {
            if (member.getEmail().equals(email)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean registerMember(Member member) {
        member.setMemberId((long) (memberList.size() + 1));
        return memberList.add(member);
    }

    @Override
    public Member login(String email, String password) {
        for (Member member : memberList) {
            if (member.getEmail().equals(email) && member.getPassword().equals(password)) {
                return member;
            }
        }
        return null;
    }

    @Override
    public Member findById(Long id) {

        for (Member member : memberList) {
            System.out.println(member.getId()+" ");
            if (member.getId().equals(id)) {
                return member;
            }
        }

        System.out.println("찾지못함");
        return null;
    }

    @Override
    public boolean addRelationship(Long memberId, Relationship relationship) {
        System.out.println(memberId);
        Member member = findById(memberId);
        member.addRelationShip(relationship);
        return true;
    }

    @Override
    public List<FollowingResponse> getFollowingInfo(List<Long> followingIdList) {

        List<FollowingResponse> followingResponseList = new ArrayList<>();

        for (Long followingId : followingIdList) {

            Member following = findById(followingId);
            followingResponseList.add(new FollowingResponse(following.getId(), following.getEmail(), following.getNickName()));
        }

        return followingResponseList;
    }

    @Override
    public List<FollowSuggestResponse> getFollowSuggestInfo(List<Long> followSuggestIdList) {

        List<FollowSuggestResponse> followSuggestResponseList = new ArrayList<>();

        for (Long followingId : followSuggestIdList) {

            Member following = findById(followingId);
            followSuggestResponseList.add(new FollowSuggestResponse(following.getId(), following.getEmail(), following.getNickName()));
        }

        return followSuggestResponseList;
    }

    @Override
    public List<MemberProfileResponse> searchMember(String query) {

        return memberList.stream()
                .filter(entity -> entity.getNickName() != null &&
                                  entity.getNickName().toLowerCase().contains(query.toLowerCase()))
                .map(MemberProfileResponse::of)
                .collect(Collectors.toList());
    }
}
