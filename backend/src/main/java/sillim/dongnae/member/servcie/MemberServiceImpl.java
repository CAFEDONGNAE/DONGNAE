package sillim.dongnae.member.servcie;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sillim.dongnae.member.dto.request.MemberJoinRequest;
import sillim.dongnae.member.dto.request.MemberLoginRequest;
import sillim.dongnae.member.dto.response.MemberProfileResponse;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.member.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public boolean registerMember(MemberJoinRequest request) {

        // 이메일 중복 다시 확인
        if (!checkEmailDuplication(request.getEmail())) {
            return false;
        }

        Member member = new Member(request.getEmail(), request.getName(), request.getPassword());
        return memberRepository.registerMember(member);
    }

    @Override
    public boolean checkEmailDuplication(String email) {
        return memberRepository.checkEmailDuplication(email);
    }

    @Override
    public Member login(MemberLoginRequest request) {
        return memberRepository.login(request.getEmail(), request.getPassword());
    }

    @Override
    public Member findById(Long id) {
        return memberRepository.findById(id);
    }

    @Override
    public List<MemberProfileResponse> searchMembers(String param) {
        return memberRepository.searchMember(param);
    }
}
