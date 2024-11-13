package sillim.dongnae.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sillim.dongnae.chat.entity.ChatRoomParticipant;

public interface ChatRoomParticipantRepository extends JpaRepository<ChatRoomParticipant, Long> {
}
