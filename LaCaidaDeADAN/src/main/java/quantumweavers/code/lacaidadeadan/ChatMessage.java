package quantumweavers.code.lacaidadeadan;

import java.sql.Timestamp;

import org.springframework.stereotype.Component;

@Component
public class ChatMessage {
	private long id;
	private String message;
	private String sender;
	private Timestamp date;
	
	public ChatMessage() {}
	
	public ChatMessage(String s, String m) {
		this.sender = s;
		this.message = m;
	}
	
	public long GetId() {
		return this.id;
	}
	
	public void SetId(long id) {
		this.id = id;
	}
	
	public String GetMessage() {
		return this.message;
	}
	
	@Override
	public String toString() {
		return "ChatMessage [id=" + id + ", message=" + message + ", sender=" + sender + "]";
	}

	public void SetMessage(String newMessage) {
		this.message = newMessage;
	}
	
	public String GetSender() {
		return this.sender;
	}
	
	public void SetSender(String newSender) {
		this.sender = newSender;
	}
	
	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}
}