package quantumweavers.code.lacaidadeadan.GameHandlers;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/echo")
public class echoHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<String, WebSocketSession>();
	private String[] IDs = new String[2];
	private boolean onLevelSelect = false;
	private int currentSession = 0;
	String selectedLevel = "";
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("---------- NUEVO MENSAJE ----------");
		System.out.println("Mensaje recibido: '" + message.getPayload() + "', sesión: " + session.getId());
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode node = mapper.createObjectNode();
		String json = "";
		
		// REGISTRO DE LOS JUGADORES
		// PARA COMPROBAR SI SE PUEDE INICIAR EL JUEGO
		if(message.getPayload().equals("check")) {
			onLevelSelect = false;
			
			if(session.getId().equals(IDs[0])) {
				if(IDs[1] != null) {
					sessions.get(IDs[1]).sendMessage(new TextMessage("p1Connected"));
					session.sendMessage(new TextMessage("p2Connected"));
				}
			}
			
			if(session.getId().equals(IDs[1])) {
				if(IDs[0] != null) { 
					sessions.get(IDs[0]).sendMessage(new TextMessage("p2Connected"));
					session.sendMessage(new TextMessage("p1Connected"));
				}
			}
			
			if(IDs[0] != null && IDs[1] != null) {
				for(WebSocketSession playerSession : sessions.values()) {
					playerSession.sendMessage(new TextMessage("ready"));
				}
			}
			
			return;
		}
		
		// PARA LA SELECCION DE NIVELES
		if(message.getPayload().equals("selector")) {
			if(IDs[0] == null && IDs[1] == null) {
				session.sendMessage(new TextMessage("selector"));
				return;
			}
			
			if(onLevelSelect == true) {
				session.sendMessage(new TextMessage("wait"));
			} else {
				node.put("estado", "lobby");
				node.put("level", selectedLevel);
				json = mapper.writeValueAsString(node);
				session.sendMessage(new TextMessage(json));
			}
			
			return;
		}
		
		if(message.getPayload().equals("registrar") && currentSession < 2) {
			sessions.put(session.getId(), session);
			IDs[currentSession] = session.getId();
			
			if(currentSession == 0) {
				node.put("jugador", currentSession + 1);
				
				if(IDs[1] != null) { 
					currentSession = 2;
				}
				else {
					currentSession = 1;
					onLevelSelect = true;
				}
			}
			else if (currentSession == 1) {
				node.put("jugador", currentSession + 1);
				currentSession++;
			}
			
			node.put("estado", "registrado");
			json = mapper.writeValueAsString(node);
			System.out.println("JUGADOR " + (currentSession) + " REGISTRADO");
			session.sendMessage(new TextMessage(json));
			return;
		}
		else if (message.getPayload().equals("registrar") && currentSession >= 2) {
			node.put("estado", "lleno");
			json = mapper.writeValueAsString(node);
			System.out.println("SALA LLENA");
			session.sendMessage(new TextMessage(json));
			return;
		}
		
		try {
			JsonNode jsonNode = mapper.readTree(message.getPayload());
			
			if(jsonNode.get("info").asText().equals("level")) {
					selectedLevel = jsonNode.get("selected").asText();
			}
		} catch(IOException e) { }
		
		// SI INTENTAMOS ENVIAR UN MENSAJE CON MENOS DE DOS JUGADORES CONECTADOS
		if(currentSession < 2) return;
		
		// ENVIO DE MENSAJES AL OTRO JUGADOR
		if(session.getId().equals(IDs[0])) {
			sessions.get(IDs[1]).sendMessage(new TextMessage(message.getPayload()));
		} else if (session.getId().equals(IDs[1])) {
			sessions.get(IDs[0]).sendMessage(new TextMessage(message.getPayload()));
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		session.close();
		if(currentSession == 0 && (IDs[0] == null && IDs[1] == null)) return;
		
		if(session.getId().equals(IDs[0])) {
			IDs[0] = null;
			currentSession = 0;
			
			if(IDs[1] != null) {
				sessions.get(IDs[1]).sendMessage(new TextMessage("p1Disconnected"));
			}
		}
		
		if(IDs[1] != null) {
			if (session.getId().equals(IDs[1])) {
				IDs[1] = null;
				
				if(currentSession == 2)
					currentSession = 1;
				else
					currentSession = 0;
				
				if(IDs[0] != null) {
					sessions.get(IDs[0]).sendMessage(new TextMessage("p2Disconnected"));
				}
			}
		}
		
		System.out.println("---------- DESCONEXION ----------");
		System.out.println("Jugador desconectado con la id " + session.getId());
		sessions.remove(session.getId());
	}
}