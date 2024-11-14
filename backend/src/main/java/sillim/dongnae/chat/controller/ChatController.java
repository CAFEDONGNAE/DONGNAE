package sillim.dongnae.chat.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import sillim.dongnae.chat.entity.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/topic/{roomId}")
    public ChatMessage sendMessage(@DestinationVariable String roomId, ChatMessage chatMessage) {

        // 메세지 처리 로직 추가 (ex. 채팅 저장)

        return chatMessage;
    }




}
