package quantumweavers.code.lacaidadeadan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import quantumweavers.code.lacaidadeadan.GameHandlers.onEnemyCreateHandler;
import quantumweavers.code.lacaidadeadan.GameHandlers.onPlayerLoseHandler;
import quantumweavers.code.lacaidadeadan.GameHandlers.onPlayerWinHandler;
import quantumweavers.code.lacaidadeadan.GameHandlers.turretBuyHandler;
import quantumweavers.code.lacaidadeadan.GameHandlers.turretSellHandler;
import quantumweavers.code.lacaidadeadan.GameHandlers.turretUpgradeHandler;

@SpringBootApplication
@EnableWebSocket
public class RestLaCaidaDeADAN implements WebSocketConfigurer {
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createTurretBuyHandler(), "/buy").setAllowedOrigins("*");
		registry.addHandler(createTurretSellHandler(), "/sell").setAllowedOrigins("*");
		registry.addHandler(createUpgradeTurretHandler(), "/upgrade").setAllowedOrigins("*");
		registry.addHandler(createOnPlayerLoseHandler(), "/lose").setAllowedOrigins("*");
		registry.addHandler(createOnPlayerWinHandler(), "/win").setAllowedOrigins("*");
		registry.addHandler(createOnEnemyCreateHandler(), "/enemy").setAllowedOrigins("*");
	}
	
	@Bean
	private turretBuyHandler createTurretBuyHandler() {
		return new turretBuyHandler();
	}
	
	@Bean
	private turretSellHandler createTurretSellHandler() {
		return new turretSellHandler();
	}
	
	@Bean
	private turretUpgradeHandler createUpgradeTurretHandler() {
		return new turretUpgradeHandler();
	}
	
	@Bean
	private onPlayerLoseHandler createOnPlayerLoseHandler() {
		return new onPlayerLoseHandler();
	}
	
	@Bean onPlayerWinHandler createOnPlayerWinHandler() {
		return new onPlayerWinHandler();
	}
	
	@Bean
	private onEnemyCreateHandler createOnEnemyCreateHandler() {
		return new onEnemyCreateHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(RestLaCaidaDeADAN.class, args);
	}
}