package sillim.dongnae.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sillim.dongnae.chat.entity.ChatMessage;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findChatMessageByChatRoomIdOrderById(Long roomId);
}
