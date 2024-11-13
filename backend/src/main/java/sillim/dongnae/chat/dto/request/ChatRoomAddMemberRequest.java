package sillim.dongnae.chat.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ChatRoomAddMemberRequest {

    Long chatRoomId;
    List<Long> memberIds;

}
