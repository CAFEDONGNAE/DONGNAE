package sillim.dongnae.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.chat.entity.ChatMessage;

@Getter
@NoArgsConstructor
public class ChatMessageDto {

    Long writerId;
    String writer;
    String content;

    public ChatMessageDto(ChatMessage chatMessage) {
        this.writerId = chatMessage.getWriter().getId();
        this.writer = chatMessage.getWriter().getNickName();
        this.content = chatMessage.getContent();
    }
}
