package sillim.dongnae.member.repository;

import org.springframework.stereotype.Repository;
import sillim.dongnae.member.entity.Member;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
}
