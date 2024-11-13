package sillim.dongnae.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sillim.dongnae.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

}
