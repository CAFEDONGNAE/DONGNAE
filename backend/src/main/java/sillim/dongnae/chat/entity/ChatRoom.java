package sillim.dongnae.chat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chatroom_name")
    private String name;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomParticipant> chatRoomMembers = new ArrayList<>();

    public ChatRoom(String roomName) {
        this.name = roomName;
    }

    public void addParticipant(ChatRoomParticipant chatRoomParticipant) {
        chatRoomMembers.add(chatRoomParticipant);
        // 양방향 매핑?
    }
}
