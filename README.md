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

El inicio del juego se mostrará de la siguiente forma:
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Fondo%20Nuevo.png)
Se ha diseñado la escena debido a la temática del juego. El fondo color negro para que destaquen el robot y el logo del juego. Los botones también siguen la estética robótica. Por ahora solo funciona el modo historia, que te lleva directamente al primer nivel.


Después de darle al botón Endless, se inicia el juego:
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Juego.png)
Los robots saldrán por ambos lados, siguiendo un pathing que se ha predeterminado, una vez que se haya llegado al medio de la pantalla, resta la vida del jugador de 10 en 10, y si la vida del jugador llega a 0, pierde. En las casillas que contiene un enchufe gris y azul, es donde se podrán colocar las torretas para derrotar a los robots y defender la base. 

![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Pantalla%20con%20torretas.png)
Se podrán colocar torretas de 2 tipos: generadoras de energía (verdes) o de ataque (naranjas).

Los controles serán los siguientes: 
  -	El jugador 1 controla la parte izquierda de la pantalla, mediante teclas WASD como movimiento de la casilla, Q para poner torretas ofensivas, y E para poner torretas regeneradoras. 
  -	El jugador 2, que controla el otro lado de la pantalla, usa el ratón, dando un click izquierdo para asignar una torreta y la rueda para asignar una regeneradora, y moviendo el ratón permite navegar libremente su lado.

Al pulsar escape se accede al menú de pausa:
imagen menu de pausa
Desde aquí puedes continuar o salir.

Cuando el robot llega a la mitad de pantalla, te quita vida. Si te quedas sin vida aparece una pantalla de derrota:
![image](https://github.com/PabloCondeLopez/La-caida-de-ADAN/blob/main/IMG/Derrota.png)
Solo se puede salir de la partida si se quiere reintentar pasar el nivel.

