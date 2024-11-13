package sillim.dongnae.chat.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ChatRoomRequest {

    private String roomName;
    private List<Long> memberIds;
}
