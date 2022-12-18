package quantumweavers.code.lacaidadeadan;

import java.security.Timestamp;
import org.springframework.stereotype.Component;

@Component
public class Player {
	private String user;
	private String passWord;
	private long id;
	private Timestamp connection;

	
	public Player() {}
	
	public Player(String u,String p, long i , Timestamp c) {
		this.user = u;
		this.passWord = p;
		this.id = i;
		this.connection = c;
	}
	
	public String getUser() {
		return this.user;
	}
	
	public String getPassword() {
		return this.passWord;
	}
	
	public long getId() {
		return this.id;
	}
	
	public Timestamp getConnection() {
		return this.connection;
	}
	
	
	public void setUser(String u) {
		this.user = u;
	}
	
	public void setPassword(String p) {
		this.passWord = p;
	}
	
	public void setId(long ID) {
		this.id = ID;
	}
	
	public void setConnection(Timestamp c) {
		this.connection = c;
	}
	
	
	

}
