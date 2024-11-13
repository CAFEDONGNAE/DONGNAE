package sillim.dongnae.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sillim.dongnae.chat.entity.ChatRoomParticipant;

import java.util.List;

public interface ChatRoomParticipantRepository extends JpaRepository<ChatRoomParticipant, Long> {

    List<ChatRoomParticipant> findChatRoomParticipantByParticipantId(Long memberId);

}
