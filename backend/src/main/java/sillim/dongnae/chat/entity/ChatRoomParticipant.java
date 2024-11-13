package sillim.dongnae.chat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.member.entity.Member;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoomParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member participant;

    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    ChatRoom chatRoom;

    public ChatRoomParticipant(Member participant, ChatRoom chatRoom) {
        this.participant = participant;
        this.chatRoom = chatRoom;
    }
}
