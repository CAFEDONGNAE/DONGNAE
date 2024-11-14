package sillim.dongnae.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import sillim.dongnae.chat.dto.ChatMessageDto;
import sillim.dongnae.chat.service.ChatMessageService;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/topic/{roomId}")
    public ChatMessageDto sendMessage(@DestinationVariable String roomId, ChatMessageDto chatMessage) {

        // 메세지 처리 로직 추가 (ex. 채팅 저장)
        chatMessageService.saveMessage(chatMessage, Long.parseLong(roomId));

        return chatMessage;
    }
}
