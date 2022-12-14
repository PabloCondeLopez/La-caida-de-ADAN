package quantumweavers.code.lacaidadeadan;

public class ChatMessage {
	private long id;
	private String message;
	private String sender;
	private String receiver;
	
	public ChatMessage() {
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
	
	public void SetMessage(String newMessage) {
		this.message = newMessage;
	}
	
	public String GetSender() {
		return this.sender;
	}
	
	public void SetSender(String newSender) {
		this.sender = newSender;
	}
	
	public String GetReceiver() {
		return this.receiver;
	}
	
	public void SetReceiver(String newReceiver) {
		this.receiver = newReceiver;
	}
}