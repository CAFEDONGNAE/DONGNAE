package sillim.dongnae.chat.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.chat.entity.ChatRoom;

@Getter
@NoArgsConstructor
public class ChatRoomInfoResponse {

    Long roomId;
    String roomName;
    int roomSize;

    public ChatRoomInfoResponse(ChatRoom chatRoom) {

        this.roomId = chatRoom.getId();
        this.roomName = chatRoom.getName();
        this.roomSize = chatRoom.getChatRoomMembers().size();
    }
}
