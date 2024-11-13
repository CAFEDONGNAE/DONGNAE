package sillim.dongnae.chat.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sillim.dongnae.chat.dto.request.ChatRoomAddMemberRequest;
import sillim.dongnae.chat.dto.response.ChatRoomInfoResponse;
import sillim.dongnae.chat.dto.request.ChatRoomRequest;
import sillim.dongnae.chat.service.ChatRoomService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;


    @PostMapping("/create")
    public ResponseEntity<ChatRoomInfoResponse> createChatRoom(@RequestBody ChatRoomRequest chatRoomRequest) {
        return new ResponseEntity<>(chatRoomService
                .createChatRoom(chatRoomRequest.getRoomName(), chatRoomRequest.getMemberIds()), HttpStatus.CREATED);
    }

    // 기존 채팅방에 새로운 멤버를 추가
    // 초대하는 인원이 채팅방에 속해있는지 Check
    // 단순히 memberId만 받기 때문에 파라미터로 값을 받는다
    @PostMapping("/addMember")
    public void addMemberToRoom(@RequestBody ChatRoomAddMemberRequest chatRoomAddMemberRequest) {

        chatRoomService
                .addMemberToRoom(chatRoomAddMemberRequest.getChatRoomId(), chatRoomAddMemberRequest.getMemberIds());
    }


    @GetMapping
    public ResponseEntity<?> getChatRooms(HttpServletRequest servletRequest) {

        HttpSession session = servletRequest.getSession(false);

        if (session == null || session.getAttribute("memberId") == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        Long memberId = (Long) session.getAttribute("memberId");

        return new ResponseEntity<>(chatRoomService.getChatRoomList(memberId), HttpStatus.OK);
    }

}
