package sillim.dongnae.member.servcie;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sillim.dongnae.member.dto.request.MemberJoinRequest;
import sillim.dongnae.member.dto.request.MemberLoginRequest;
import sillim.dongnae.member.dto.response.MemberProfileResponse;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.member.repository.MemberJpaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberJpaRepository memberJpaRepository;

    // 이메일 중복 검사
    @Override
    public boolean checkEmailDuplication(String email) {
        return memberJpaRepository.existsByEmail(email);
    }

    // 회원가입
    @Override
    @Transactional
    public boolean registerMember(MemberJoinRequest request) {

        // 이메일 중복 다시 확인
        if (checkEmailDuplication(request.getEmail())) {
            return false;
        }

        Member member = new Member(request.getEmail(), request.getName(), request.getPassword());
        memberJpaRepository.save(member);
        return true;
    }

    // 로그인
    @Override
    public Member login(MemberLoginRequest request) {

        return memberJpaRepository
                .findByEmailAndPassword(request.getEmail(), request.getPassword())
                .orElse(null);
    }

    @Override
    public Member findById(Long id) {
        return memberJpaRepository.findById(id).orElse(null);
    }

    @Override
    public List<MemberProfileResponse> searchMembers(String param, Long memberId) {

        String searchKeyword = "%" + param + "%";
        return memberJpaRepository.searchMember(searchKeyword, memberId).stream().map(MemberProfileResponse::new).toList();
    }
}
