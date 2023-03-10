let words =["ANANAS", "MASA", "STERNOCLEIDOMASTOIDIAN", "CARAMIDA", "BOTOSANI", "XILOFON", 
"KILOCALORIE", "ZARZAVAT", "VOLKSWAGEN", "ANANAS", "MASA", "ELECTROCORTICOGRAFIE", "ALGORITM", "CLAUSTROFOBIE"];
let randomWord = words[Math.floor(Math.random()*words.length)];
let cards = document.querySelectorAll(".card-body");
let word = "", hang = 0, countLetters = 0;

const canvas = document.getElementById('a');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.beginPath();
ctx.moveTo(100,140);
ctx.lineTo(100,50);
ctx.lineTo(130,50);
ctx.lineTo(130,60);
ctx.stroke();

for (let i = 0; i < randomWord.length; ++i) {
    word += "_ ";   
}

document.body.onload = addAlphabet();
document.body.onload = addWordForGuess();

function addWordForGuess() {
    const newElem = document.createElement("h3");
    const newContent = document.createTextNode(word);
    newElem.appendChild(newContent);
    const currentElem = document.getElementById("guess");
    currentElem.appendChild(newElem);
}

function addAlphabet() {
    for (let i = 65; i <= 90; ++i) {
        const newElem = document.createElement("button");
        const newContent = document.createTextNode(String.fromCharCode(i));
        let letter = String.fromCharCode(i);
        newElem.appendChild(newContent);
        const currentElem = document.getElementById("alphabet");
        currentElem.appendChild(newElem);
        newElem.onclick = function() {
            fillLetter(newElem , letter, i);
        }
    }
}

function fillLetter(element, pressedletter, index) {
    let found = 0;
    for (let j = 0; j < randomWord.length; ++j) {
        if (pressedletter == randomWord[j]) {
            element.style.background = 'lime';
            word = word.substring(0, j * 2) + pressedletter + word.substring(j * 2 + 1, word.length);          
            document.querySelector("h3").textContent = word; 
            console.log(word);
            ++countLetters;
            if (countLetters == randomWord.length) {
                const dialog = document.getElementById("winningdialog");
                const playbtn = document.getElementById("refreshgame");
                dialog.show(); 
                playbtn.addEventListener('click', function playagain(){
                    location.reload();
                });
            }
            found = 1;
        } 
    } 
    if (found == 0 && pressedletter != randomWord[index]) {
        element.style.background = 'red';
        ++hang;
        draw();
    }
}

function draw() {
    if (hang == 1) {
        const radius = 10;
        ctx.beginPath();
        ctx.arc(130, 70, radius, 0, 2 * Math.PI,false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    if (hang == 2) {
        ctx.moveTo(130,80);
        ctx.lineTo(130,115);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    if (hang == 3) {
        ctx.moveTo(130,80);
        ctx.lineTo(120,95);
        ctx.stroke();
    }
    if (hang == 4) {
        ctx.moveTo(130,80);
        ctx.lineTo(140,95);
        ctx.stroke();
    }
    if (hang == 5) {
        ctx.moveTo(130,115);
        ctx.lineTo(120,130);
        ctx.stroke();
    }
    if (hang == 6) {
        ctx.moveTo(130,115);
        ctx.lineTo(140,130);
        ctx.stroke();
        alert("You lost");
        document.querySelector("h3").style.color = 'red';
        document.querySelector("h3").textContent = randomWord;
        
    }
}