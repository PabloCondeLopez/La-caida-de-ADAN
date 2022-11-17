class GenerationTurret extends Phaser.GameObjects.Image {

    constructor (scene, gR) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'generationTurret');
        var level = 1;
        var updateCost;
        var generationRate = generationRate;
        var energyGenerated;
        var maxLevel = 3;

        this.onConstruction();
    }

    onConstruction()                   // al construir la torreta se inicia un ciclo de la funcion generar
    {
        let interval = setInterval(generate(), frequency);
    }

    generate(){                        // generamos energia, sumando la cantidad de energia generada por segundo
        energy += energyGenerated;
    }

    upgrade(){                         // se mejora la torreta
        if(!level == maxLevel){
            level++;                            // se suma un nivel y se resta el coste de mejora
            generationRate *= updateCost + 1;   // se sube el porcentaje de generacion 
            energy *= 1 - updateCost;           // se aplica el porcentaje de update a la energia
        }      
    }

    destroy(){                         // destruir la torreta          
        clearInterval(interval);                // se elimina el ciclo de generacion    
    }
}