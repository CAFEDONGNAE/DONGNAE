package sillim.dongnae.member.servcie;

import sillim.dongnae.member.dto.request.MemberJoinRequest;
import sillim.dongnae.member.dto.request.MemberLoginRequest;
import sillim.dongnae.member.entity.Member;

public interface MemberService {


    boolean registerMember(MemberJoinRequest request);

    boolean checkEmailDuplication(String email);

    Member login(MemberLoginRequest request);

    Member findById(Long id);
}
