package sillim.dongnae.chat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.member.entity.Member;

@Getter
@Entity
@NoArgsConstructor

public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member writer;

    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    private ChatRoom chatRoom;


    private String content;

    public ChatMessage(Member writer, ChatRoom chatRoom, String content) {
        this.writer = writer;
        this.chatRoom = chatRoom;
        this.content = content;
    }
}
