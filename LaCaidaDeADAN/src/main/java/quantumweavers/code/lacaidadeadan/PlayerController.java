package quantumweavers.code.lacaidadeadan;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/player")
public class PlayerController {
	Map<Long, Player> Players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<Player> Players() {
		return Players.values();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Player nuevoPlayer(@RequestBody Player player) {
		
		if(!hasAccount(player)) {
			long id = nextId.incrementAndGet();
			player.setId((int)id);
			Players.put(id, player);
			
			return player;
		}
		return null;
	}
	
	@PutMapping
	public ResponseEntity<Player> actulizaPlayer(@RequestBody Player PlayerActualizado) {
		
		long playerID = validPassword(PlayerActualizado);

		if (playerID != -1) {

			Players.put(playerID, PlayerActualizado);

			return new ResponseEntity<>(PlayerActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	private boolean hasAccount (Player player) {
		for (Map.Entry<Long,Player> entry : Players.entrySet()) {
			if(entry.getValue().getUser().equals(player.getUser())) return true;
		}
		return false;
	}
	
	private long validPassword (Player player) {
		for (Map.Entry<Long,Player> entry : Players.entrySet()) {
			if(entry.getValue().getUser().equals(player.getUser())) {
				if(entry.getValue().getPassword().equals(player.getPassword())) return entry.getKey();
				else return -1;
			}
		}
		return -1;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {

		Player savedPlayer = Players.get(id);

		if (savedPlayer != null) {
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Player> borraPlayer(@PathVariable long id) {

		Player savedPlayer = Players.get(id);

		if (savedPlayer != null) {
			Players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

}
