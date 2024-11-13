package sillim.dongnae.chat.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class ChatMessage {

    private String content;
    private String writer;
    private String roomId;

}
