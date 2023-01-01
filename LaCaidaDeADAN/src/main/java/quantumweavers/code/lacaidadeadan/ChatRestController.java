package quantumweavers.code.lacaidadeadan;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatRestController {

	Map<Long, ChatMessage> messages = new ConcurrentHashMap<>(); 
	private File text = new File("chat.txt");
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<ChatMessage> messages() {
		return messages.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ChatMessage nuevoMensaje(@RequestBody ChatMessage message) {

		long id = nextId.incrementAndGet();
		message.setId(id);
		messages.put(id, message);
		
		try {
			PrintStream flujo;
			flujo = new PrintStream(new FileOutputStream("chat.txt", true));

			flujo.println(message.getSender() + ": " + message.getMessage());
			flujo.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return message;
	}

	@PutMapping("/{id}")
	public ResponseEntity<ChatMessage> actualizaMensaje(@PathVariable long id, @RequestBody ChatMessage updatedMS) {

		ChatMessage savedMessage = messages.get(updatedMS.getId());

		if (savedMessage != null) {

			messages.put(id, updatedMS);

			return new ResponseEntity<>(updatedMS, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<ChatMessage> getMensaje(@PathVariable long id) {

		ChatMessage savedMessage = messages.get(id);

		if (savedMessage != null) {
			return new ResponseEntity<>(savedMessage, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ChatMessage> borraMensaje(@PathVariable long id) {

		ChatMessage savedItem = messages.get(id);

		if (savedItem != null) {
			messages.remove(savedItem.getId());
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
