package quantumweavers.code.lacaidadeadan.GameHandlers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RestController
@RequestMapping("/echo")
public class echoHandler extends TextWebSocketHandler {
	private WebSocketSession[] sessions = new WebSocketSession[2];
	private int currentSession = 0;
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Mensaje recibido: " + message.getPayload() + " , sesión: " + session.getId());
		
		if(currentSession < 2) {
			System.out.println("No hay suficientes jugadores");
			return;
		}
		
		if(session.getId() == sessions[0].getId()) {
			sessions[1].sendMessage(new TextMessage(message.getPayload()));
		} else if (sessions[1].getId() == sessions[1].getId()) {
			sessions[0].sendMessage(new TextMessage(message.getPayload()));
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if(currentSession == 2) {
			System.out.println("Sala llena");
			return;
		}
		
		sessions[currentSession] = session;
		currentSession++;
		System.out.println("Jugador conectado con la id " + session.getId());
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		session.close();
		
		sessions[currentSession] = null;
		currentSession--;
		System.out.println("Jugador desconectado con la id " + session.getId());
	}
}