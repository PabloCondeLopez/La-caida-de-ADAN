# Quantum-Weavers
Somos un estudio de desarrollo de videojuegos especializado en Tower Defense Games. Actualmente nos hayamos en el desarrollo de nuestro nuevo título Cyberpañita.
El estudio está conformado por 6 miembros, cada uno encargado de una determinada tarea:

- Pablo Conde López: Representante del equipo y encargado de la jugabilidad. Correo: p.conde.2020@alumnos.urjc.es Github: PabloCondeLopez
- Gonzalo Barranco Castro: Encargado de la narrativa. Correo: g.barranco.2020@alumnos.urjc.es Github: Gonsowo
- Luming Fan Guo: Redes sociales y la parte social del juego. Correo: l.fan.2020@alumnos.urjc.es Github: daniever6
- Laura Garcés Martí: Apartado sonoro. Correo: l.garces.2020@alumnos.urjc.es Github: IceHummingBird
- Almudena Sánchez Encinas: Visuales del juego y artista principal. Correo: a.sanchez.2020@alumnos.urjc.es Github: 
- David Antonio Vélez Rebollo: Apartado técnico y programador principal. Correo: da.velez.2020@alumnos.urjc.es Github: DavidVelezRebollo

# La caída de ADAN
La historia se ambienta en una España alternativa donde en el año 2000, tal como fue profetizado por diferentes gurús de la informática, cayeron todos los sistemas de comunicación a nivel global. Esta situación de caos derivó en unos determinados acontecimientos que sacudieron el orden mundial.

Como jugador controlamos a las fuerzas de resistencia ante la rebelión robótica de la armada española. Nuestro papel es defender la prisión de máxima seguridad donde está encerrado ADAN (Androide de Defensa del Armamento Nacional) de la rebelión de las máquinas. En concreto cada uno de los jugadores controlan a: 
- Marta Ayamonte: Jefa de la unidad militar encargada de proteger el lugar. 
- Javier Rosales: Miembro importante de MOR, conoce muchas de las debilidades de los robots y es el diseñador de muchas de las armas que se usarán en el juego. 

Tablero HacknPlan: https://app.hacknplan.com/p/173818/kanban?boardId=477013

El inicio del juego se mostrará de la siguiente forma
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Fondo%20Nuevo.png)
Se ha diseñado la escena debido a la temática del juego, la cuadrícula de color neon. El fondo de color frío con un rayo, que representa una crisis se está acercando.

Después de darle al botón Infinito, se inicia el juego.
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Pantalla%20de%20juego.png)
Los robots saldrán por ambos lados, siguiendo un pathing que se ha predeterminado, una vez que se haya llegado al medio de la pantalla, resta la vida del jugador de 10 en 10, y si la vida del jugador llega a 0, pierde. En las casillas que contiene un enchufe gris y azul, es donde se podrán colocar las torretas para derrotar a los robots y defender la base. Ejemplo de un estado del juego con un torretas colocadas. Se podrán colocar torretas de 2 tipos: generadoras de energía (verdes) o de ataque (naranjas).

Al pulsar escape se accede al menú de pausa:
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Pausa.png)
Desde aquí puedes continuar o salir.
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Pantalla%20con%20Torreta%20.png)


Los robots saldran por ambos lados, siguiendo un pathing que se ha predeterminado, una vez que se haya llegado al medio de la pantalla,resta la vida del jugador de 10 en 10, y si la vida del jugador llega a 0,pierde. En las casillas que contiene un enchufe gris y azul, es donde se podrán colocar las torretas para derrotar a los robots y defender la base.

Los controles serán lo siguiente: El jugador 1 controla la parte izquierda de la pantalla, mediante teclas WASD como movimiento de la casilla, Q para poner torretas ofensivas, y E para poner torretas regeneradoras. El jugador 2, que controla el otro lado de la pantalla, usa el raton, dando un click izquierdo para asignar una torreta y la rueda para asignar una regeneradora, y moviendo el raton permite navegar libremente su lado.

Cuando el robot llega a la mitad de pantalla, aparece una pantalla de derrota.
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Gameover.PNG)
Solo se puede salir de la partida si se quiere reintentar pasar el nivel.

El diagrama del flujo serán lo siguiente
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/FLujos.png)

El diseño de los niveles serán lo siguiente
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/dise%C3%B1o%400.25x.jpg)
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Armas.PNG)
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Armas2.PNG)
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Enemigos.PNG)
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Personajes.PNG)
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Interfaces.PNG)
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Niveles.PNG)
--------------------------------------------------------------------------------------------------------------------------
3º practica
En esta fase se ha implementado la API REST para el servidor mediante SpringBoot

Nombre del juego: La caida de Adan
En esta practica, se ha implementado el chat y el lobby en funcion del diagrama siguiente, se implementa una clase de Mensajes para chat y su controller,junto con la clase de Player y su controller, en ellos se implementan todos los atributos necesarios que se muestra en la foto siguiente.
(foto de atributo de player)
(foto de atributo de chat)
Y dentro del controlador se implementa los metodos adecuados, ya que en chat se considera que no es necesario el metodo de delete y update, los cuales sí se implementan dentro del controlador de jugador.
(foto de metodos de controlador)
(foto de metodos de controlador de mensajes)

Todas esas clases de API REST se ha implementado en funcion de ese diagrama que se presenta.
(foto del diagrama)

El juego se ha implementado escenas nuevas, una escena para ayuda, y otra escena que presenta el chat y log in del usuario, los restos seran iguales.

Para usar el jar se necesita una aplicacion 7z, se descomprime y se abre el proyecto con SPRING TOOL SUITE 4.0, se hace un run as /spring boot app, y se inicia google chrome con web de localhost:8080
(foto de la web)





