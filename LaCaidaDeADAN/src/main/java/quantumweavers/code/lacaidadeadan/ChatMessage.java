package quantumweavers.code.lacaidadeadan;

import java.sql.Timestamp;

import org.springframework.stereotype.Component;

@Component
public class ChatMessage {
	private String message;
	private String sender;
	private Timestamp date;
	private long id;
	
	public ChatMessage() {}
	
	public ChatMessage(String s, String m) {
		this.sender = s;
		this.message = m;
	}
	
	public long GetId() {
		return this.id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getMessage() {
		return this.message;
	}
	
	@Override
	public String toString() {
		return "ChatMessage [id=" + id + ", message=" + message + ", sender=" + sender + "]";
	}

	public void setMessage(String newMessage) {
		this.message = newMessage;
	}
	
	public String getSender() {
		return this.sender;
	}
	
	public void setSender(String newSender) {
		this.sender = newSender;
	}
	
	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}
}