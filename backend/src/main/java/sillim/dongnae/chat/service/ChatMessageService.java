package sillim.dongnae.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import sillim.dongnae.chat.dto.ChatMessageDto;
import sillim.dongnae.chat.entity.ChatMessage;
import sillim.dongnae.chat.entity.ChatRoom;
import sillim.dongnae.chat.repository.ChatMessageRepository;
import sillim.dongnae.chat.repository.ChatRoomRepository;
import sillim.dongnae.member.entity.Member;
import sillim.dongnae.member.repository.MemberJpaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Async
    public void saveMessage(ChatMessageDto chatMessageDto, Long roomId) {

        Member member = memberJpaRepository.findById(chatMessageDto.getWriterId())
                .orElseThrow(() -> new IllegalArgumentException("존재 하지 않는 아이디입니다"));

        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재 하지 않는 채팅방입니다."));

        ChatMessage chatMessage = new ChatMessage(member, chatRoom, chatMessageDto.getContent());
        chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessageDto> getMessages(Long roomId) {

        // 시간 측정을 해보자
        return chatMessageRepository.findChatMessageByChatRoomIdOrderById(roomId)
                .stream()
                .map(ChatMessageDto::new)
                .toList();
    }
}
