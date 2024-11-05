package sillim.dongnae.member.repository;

import org.springframework.stereotype.Repository;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.ArrayList;
import java.util.List;

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
            if (member.getId().equals(id)) {
                return member;
            }
        }
        return null;
    }

    @Override
    public boolean addRelationship(Long memberId, Relationship relationship) {
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
}
