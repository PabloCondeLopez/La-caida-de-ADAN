package quantumweavers.code.lacaidadeadan.GameHandlers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/echo")
public class echoHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<String, WebSocketSession>();
	private String[] IDs = new String[2];
	private int currentSession = 0;
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Mensaje recibido: '" + message.getPayload() + "', sesión: " + session.getId());
		System.out.println("ID Player 1: " + IDs[0]);
		System.out.println("ID Player 2: " + IDs[1]);
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode node = mapper.createObjectNode();
		String json = "";
		
		// REGISTRO DE LOS JUGADORES
		// PARA COMPROBAR SI SE PUEDE INICIAR EL JUEGO
		if(message.getPayload().equals("check")) {
			if(session.getId().equals(IDs[0])) {
				if(IDs[1] != null) sessions.get(IDs[1]).sendMessage(new TextMessage("p1Connected"));
				else sessions.get(IDs[0]).sendMessage(new TextMessage("p2Disconnected"));
			}
			
			if(session.getId().equals(IDs[1])) {
				if(IDs[0] != null) sessions.get(IDs[0]).sendMessage(new TextMessage("p2Connected"));
				else sessions.get(IDs[1]).sendMessage(new TextMessage("p1Disconnected"));
			}
			
			return;
		}
		
		if(message.getPayload().equals("registrar") && currentSession < 2) {
			sessions.put(session.getId(), session);
			IDs[currentSession] = session.getId();
			
			if(currentSession == 0) {
				node.put("jugador", 1);
				
				if(IDs[1] != null) currentSession = 2;
				else currentSession = 1;
			}
			else if (currentSession == 1) {
				node.put("jugador", 2);
				currentSession++;
			}
			
			node.put("estado", "registrado");
			json = mapper.writeValueAsString(node);
			session.sendMessage(new TextMessage(json));
			
			System.out.println("Jugador conectado con la id " + session.getId());
			return;
		}
		else if (message.getPayload().equals("registrar") && currentSession >= 2) {
			node.put("estado", "lleno");
			json = mapper.writeValueAsString(node);
			session.sendMessage(new TextMessage(json));
			System.out.println("Sala llena, no se admiten más jugadores");
			return;
		}
		
		
		
		// SI INTENTAMOS ENVIAR UN MENSAJE CON MENOS DE DOS JUGADORES CONECTADOS
		if(currentSession < 2) {
			System.out.println("No hay suficientes jugadores");
			return;
		}
		
		if(session.getId().equals(IDs[0])) {
			sessions.get(IDs[1]).sendMessage(new TextMessage(message.getPayload()));
		} else if (session.getId().equals(IDs[1])) {
			sessions.get(IDs[0]).sendMessage(new TextMessage(message.getPayload()));
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		session.close();
		System.out.println("Jugador desconectado con la id " + session.getId());
		if(currentSession == 0) return;
		
		if(session.getId().equals(IDs[0])) {
			IDs[0] = null;
			currentSession = 0;
		}
		
		if(currentSession == 2) {
			if (session.getId().equals(IDs[1])) {
				IDs[1] = null;
				currentSession = 1;
			}
		}
		
		sessions.remove(session.getId());
	}
}