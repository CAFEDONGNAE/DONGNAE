package sillim.dongnae.chat.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sillim.dongnae.chat.dto.response.ChatRoomInfoResponse;
import sillim.dongnae.chat.entity.ChatRoom;
import sillim.dongnae.chat.entity.ChatRoomParticipant;
import sillim.dongnae.chat.repository.ChatRoomParticipantRepository;
import sillim.dongnae.chat.repository.ChatRoomRepository;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.member.repository.MemberJpaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;
    private final MemberJpaRepository memberJpaRepository;

    // 채팅방을 생성
    @Transactional
    public ChatRoomInfoResponse createChatRoom(String roomName, List<Long> memberIds) {

        ChatRoom chatRoom = new ChatRoom(roomName);
        chatRoomRepository.save(chatRoom);

        for (Long memberId : memberIds) {

            Member member = memberJpaRepository.findById(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 멤버입니다."));

            ChatRoomParticipant save = chatRoomParticipantRepository.save(new ChatRoomParticipant(member, chatRoom));
            chatRoom.addParticipant(save);

        }

        return new ChatRoomInfoResponse(chatRoom);
    }

    @Transactional
    public void addMemberToRoom(Long chatRoomId, List<Long> memberIds) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));

        for (Long memberId : memberIds) {
            Member member = memberJpaRepository.findById(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 멤버입니다."));

            ChatRoomParticipant participant = new ChatRoomParticipant(member, chatRoom);
            chatRoomParticipantRepository.save(participant);

            chatRoom.addParticipant(participant);
        }
    }

    public List<ChatRoomInfoResponse> getChatRoomList(Long memberId) {

        return chatRoomParticipantRepository.findChatRoomParticipantByParticipantId(memberId)
                .stream()
                .map(participantInfo -> new ChatRoomInfoResponse(participantInfo.getChatRoom()))
                .toList();
    }
}
