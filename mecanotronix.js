import Word from './word.js';
import helper from './helper.js';

//Set difficulty. First time it won't show anything until you choose the difficulty button
var level = localStorage.getItem("maxWords")
if (level == null) {
    level = localStorage.setItem("maxWords", 3)
}

const maxWordCount = level; //maximum word count attacking

//Menu Selector
document.getElementById("easy").addEventListener("click", function () {
    level = localStorage.setItem("maxWords", 3)
    location.reload();
});
document.getElementById("normal").addEventListener("click", function () {
    level = localStorage.setItem("maxWords", 4)
    location.reload();
});
document.getElementById("hard").addEventListener("click", function () {
    level = localStorage.setItem("maxWords", 6)
    location.reload();
});


//word database
const wordList = ['hecho', 'ayer', 'olla', 'hache', 'abeja', 'vuela', 'queso', 'había', 'día', 'hubo', 'aparte', 'época', 'etéreo', 'juego', 'escuela', 'literatura', 'matemáticas', 'lengua', 'geografía', 'batería', 'escultura', 'dormía', 'comía', 'tractor', 'perro', 'gato', 'ardilla', 'rata', 'oso', 'ogro', 'orca', 'oveja', 'feliz', 'desayuno', 'almuerzo', 'merienda', 'cena', 'balón', 'bicicleta', 'vestuario', 'maquillaje', 'prueba', 'quizás', 'escenario', 'escoger', 'fragmento', 'diálogo', 'guión', 'magnífico', 'elogiar', 'difícil', 'avión', 'también', 'prohibido', 'líder', 'cebolla', 'joya', 'arqueólogo', 'yuca', 'rayo', 'yate', 'semilla', 'apellido', 'araña', 'bocadillo', 'anillo', 'mejilla', 'calle', 'aquella', 'cuchillo', 'abdomen', 'abreviatura', 'absorber', 'acceso', 'actitud', 'adviento', 'ágil', 'ahorrar', 'ajedrez', 'bahía', 'playa', 'baúl'];

const words = [];
let score = 0;
let scoreElement = document.getElementById("score");

//holds word index got hit until word dies
let activeWordIndex = null;

for (let i = 0; i < maxWordCount; i++) {
    const word = new Word(randomWord());

    //bind events
    word.onDie = onWordDies;
    word.onHit = onWordHits;

    words[i] = word;

    setTimeout(function () {
        word.attack();
    }, 1000 * i);
}

document.addEventListener("keydown", heroAttack);

function randomWord() {
    return wordList[helper.random(0, wordList.length)];
}

//called when a word dies
function onWordDies(word) {
    activeWordIndex = null;

    word.reset(randomWord());
}

//called when a word reaches the hero
function onWordHits(word) {
    for (let i = 0; i < words.length; i++) {
        //stop every word animation
        words[i].stop();
    }

    //animations need time to stop
    setTimeout(function () {
        document.getElementById("gameOver").style.display = "block"
        document.getElementById("resetBtn").style.display = "block"
        document.getElementById("gameOverText").innerText = `Has perdido...` + `\n` + `Puntuación: ${score}` + `\n` + `¿Volver a empezar?` + `\n`
    }, 10);


}

function heroAttack(e) {
    const letter = e.key.toLowerCase()

    if (activeWordIndex === null) {
        for (let i = 0; i < words.length; i++) {
            if (words[i].letters[0] === letter) {
                incrementScore();
                setStage();
                activeWordIndex = i;
                words[i].damage(letter);

                return;
            }

        }
    } else {
        if (words[activeWordIndex].letters[0] === letter) {
            incrementScore();
            setStage();
            words[activeWordIndex].damage(letter);
        }
    }
}

function incrementScore() {
    score++;
    scoreElement.innerText = score;
}

var stage = 0;
let stageElement = document.getElementById("stage");

function setStage() {
    let score = scoreElement.innerText
    if (score < 100) {
        stageElement.innerText = 'Nivel ' + 1;
    }
    if (score > 100 && score < 200) {
        stageElement.innerText = 'Nivel ' + 2;
    } else if (score > 200 && score < 300) {
        stageElement.innerText = 'Nivel ' + 3;
    } else if (score > 300 && score < 400) {
        stageElement.innerText = 'Nivel ' + 4;
    } else if (score > 400 && score < 500) {
        stageElement.innerText = 'Nivel ' + 5;
    } else if (score > 500 && score < 600) {
        stageElement.innerText = 'Nivel ' + 6;
    } else if (score > 600 && score < 700) {
        stageElement.innerText = 'Nivel ' + 7;
    } else if (score > 700 && score < 800) {
        stageElement.innerText = 'Nivel ' + 8;
    } else if (score > 800 && score < 900) {
        stageElement.innerText = 'Nivel ' + 9;
    } else if (score > 900 && score < 999) {
        stageElement.innerText = 'Nivel ' + 10;
    }
    else if (score > 100) {
        //stop other words
        for (let i = 0; i < words.length; i++) {
            //stop every word animation
            words[i].stop();
        }

        //animations need time to stop
        setTimeout(function () {
            document.getElementById("gameOver").style.display = "block"
            document.getElementById("resetBtn").style.display = "block"
            document.getElementById("gameOverText").innerText = `¡Has GANADO! ` + `🥇` + `\n` + `Puntuación: ${score}` + `\n` + `¿Volver a empezar?` + `\n`
        }, 10);
    }
}

setStage();