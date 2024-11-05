package sillim.dongnae.member.servcie;

import sillim.dongnae.member.dto.request.MemberJoinRequest;
import sillim.dongnae.member.dto.request.MemberLoginRequest;
import sillim.dongnae.member.dto.response.MemberProfileResponse;
import sillim.dongnae.member.entity.Member;

import java.util.List;

public interface MemberService {


    boolean registerMember(MemberJoinRequest request);

    boolean checkEmailDuplication(String email);

    Member login(MemberLoginRequest request);

    Member findById(Long id);

    List<MemberProfileResponse> searchMembers(String param);
}
