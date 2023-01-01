package quantumweavers.code.lacaidadeadan.GameHandlers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer {
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// TODO Auto-generated method stub
		registry.addHandler(createTurretBuyHandler(), "/buy").setAllowedOrigins("*");
		registry.addHandler(createTurretSellHandler(), "/sell").setAllowedOrigins("*");
		registry.addHandler(createTurretUpgradeHandler(), "/upgrade").setAllowedOrigins("*");
		registry.addHandler(createEnemyCreateHandler(), "/enemy").setAllowedOrigins("*");
		registry.addHandler(createPlayerLoseHandler(), "/lost").setAllowedOrigins("*");
	}
	
	@Bean
	public onEnemyCreateHandler createEnemyCreateHandler() {
		return new onEnemyCreateHandler();
	}
	@Bean
	public onPlayerLoseHandler createPlayerLoseHandler() {
		return new onPlayerLoseHandler();
	}
	@Bean
	public turretBuyHandler createTurretBuyHandler() {
		return new turretBuyHandler();
	}
	@Bean
	public turretSellHandler createTurretSellHandler() {
		return new turretSellHandler();
	}
	@Bean
	public turretUpgradeHandler createTurretUpgradeHandler() {
		return new turretUpgradeHandler();
	}
	/*@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
			}
		};
	} */
}