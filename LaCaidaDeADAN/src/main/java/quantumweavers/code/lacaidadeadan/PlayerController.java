package quantumweavers.code.lacaidadeadan;

import java.io.*;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

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
@RequestMapping("/player")
@CrossOrigin("*")
public class PlayerController {
	Map<Long, Player> Players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);	
	
	 private File text = new File("jugadores.txt");
	
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
			
			try {
				PrintStream flujo;
				flujo = new PrintStream(new FileOutputStream("jugadores.txt", true));

				flujo.println(player.getUser());
				flujo.close();

			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return player;
		}
		return null;
	}
	
	@PutMapping
	public ResponseEntity<Player> actulizaPlayer(@RequestBody Player PlayerActualizado) {
		
		long playerID = validPlayer(PlayerActualizado);

		if (playerID != -1) {
			
			if(Players.get(playerID).isConnected()) {
				PlayerActualizado.setConnected(false);
			} else {
				PlayerActualizado.setConnected(true);
			}
			
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
	
	private long validPlayer (Player player) {
		for (Map.Entry<Long,Player> entry : Players.entrySet()) {
			if(entry.getValue().getUser().equals(player.getUser())) {
				return entry.getKey();
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
