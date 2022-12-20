package quantumweavers.code.lacaidadeadan;

import org.springframework.stereotype.Component;

@Component
public class Player {
	private String user;
	private long id;
	private boolean connected;

	
	public Player() {}
	
	public Player(String u, String p) {
		this.user = u;
		this.setConnected(false);
	}
	
	public String getUser() {
		return this.user;
	}
	
	public long getId() {
		return this.id;
	}
	
	public void setUser(String u) {
		this.user = u;
	}
	
	public void setId(long ID) {
		this.id = ID;
	}

	public boolean isConnected() {
		return connected;
	}

	public void setConnected(boolean connected) {
		this.connected = connected;
	}
	

}
