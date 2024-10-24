package sillim.dongnae.member.repository;

import sillim.dongnae.member.entity.Member;

public interface MemberRepository {

    boolean checkEmailDuplication(String email);

    boolean registerMember(Member member);

    Member login(String email, String password);

    Member findById(Long id);
}
