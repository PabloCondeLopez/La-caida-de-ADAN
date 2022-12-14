package quantumweavers.code.lacaidadeadan;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatRestController {
	Map<Long, ChatMessage> Chat = new ConcurrentHashMap<>();
	long currentId = 0;
	
	@GetMapping
	public Collection<ChatMessage> ChatLog() {
		return Chat.values();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void NewMessage(@RequestBody ChatMessage Message) {
		Message.SetId(currentId);
		currentId++;
	}
}