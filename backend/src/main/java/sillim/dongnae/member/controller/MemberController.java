package sillim.dongnae.member.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sillim.dongnae.member.dto.request.EmailCheckRequest;
import sillim.dongnae.member.dto.request.MemberJoinRequest;
import sillim.dongnae.member.dto.request.MemberLoginRequest;
import sillim.dongnae.member.dto.response.MemberProfileResponse;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.member.servcie.MemberService;

import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/check-email")
    public ResponseEntity<String> checkEmail(@RequestBody EmailCheckRequest request) {

        boolean result = memberService.checkEmailDuplication(request.getEmail());
        if (!result) {
            return new ResponseEntity<>("존재하는 이메일입니다.", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("사용 가능한 이메일입니다.", HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberJoinRequest request) {
        boolean result = memberService.registerMember(request);
        if (!result) {
            return new ResponseEntity<>("존재하는 이메일입니다.", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("가입 완료!", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody MemberLoginRequest request,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
    ) {
        System.out.println("들어옴");
        Member member = memberService.login(request);
        if (member == null) {
            return new ResponseEntity<>("존재하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }

        // 로그인 성공
        // 세션 생성 및 사용자 정보 저장
        HttpSession session = servletRequest.getSession();
        session.setAttribute("memberId", member.getId());

        // 세션 ID를 쿠키에 설정하여 클라이언트에 전달
        Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
        sessionCookie.setHttpOnly(true); // JS 에서 쿠키에 접근하지 못하도록 설정
        sessionCookie.setPath("/"); // 전체 도메인에 대해 유효
        servletResponse.addCookie(sessionCookie);

        System.out.println(member.getNickName());
        return new ResponseEntity<>(MemberProfileResponse.of(member), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest servletRequest) {

        HttpSession session = servletRequest.getSession(false);

        if (session == null || session.getAttribute("memberId") == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        Long memberId = (Long) session.getAttribute("memberId");

        Member member = memberService.findById(memberId);
        if (member == null) {
            return new ResponseEntity<>("존재하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(MemberProfileResponse.of(member), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<MemberProfileResponse>> searchMembers(@RequestParam String query) {
        return new ResponseEntity<>(memberService.searchMembers(query), HttpStatus.OK);
    }

}
