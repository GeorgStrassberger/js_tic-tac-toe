let fields = [];
let gameOver = false;
let currentShape = `circle`;
let winner;
let name1;
let name2;


function fillShape(id) {
    if (!fields[id] && !gameOver) { // Wenn das aufgerufene Feld noch keinen Wert enthält wird der Wert undefiniert(false) ausgegeben und durch das ! wird der Wert in (true) umgewandelt. Die Bedingung ist somit erfüllt und es kann der inhalt {ausgeführt werden}.
        // Wenn das aufgerufene Feld schon einen Wert besitzt (Circle OR Cross), wird der Wert in (false) umgewandelt und die Bedingung ist nicht erfüllt. Der inhalt {wird nicht ausgeführt}.
        if (currentShape == 'circle') {
            currentShape = 'cross';
            document.getElementById('player_2').classList.remove('inactive');
            document.getElementById('player_1').classList.add('inactive');
            document.getElementById('spinner-2').classList.remove('o-none');
            document.getElementById('spinner-1').classList.add('o-none');
        } else {
            currentShape = 'circle';
            document.getElementById('player_2').classList.add('inactive');
            document.getElementById('player_1').classList.remove('inactive');
            document.getElementById('spinner-2').classList.add('o-none');
            document.getElementById('spinner-1').classList.remove('o-none');
        }
        fields[id] = currentShape; // Weist dem ARRAY fields an die Position [id] den String Circle oder Cross zu duch das klicken auf das ensprechende feld [0-8]
        console.log(fields); // Schreibt die inhalte des ARRAYs fields in die Konsole.
        draw(); // Ruft die Funktion Draw auf um das entsprechende Bild Anzuzeigen.
        checkForWin(); // ruft die Function checkFor Win auf um zu kontrolieren ob schon 3 gleiche elemente in rehe stehn.
    }
}

function draw() { // zeigt auf allen feldern die angeclickt worden sind, das entsprechende Bild an. Durch die im Array enthaltenen Werte.
    for (let i = 0; i < fields.length; i++) { // konntroliert immer das komplette array welche position belegt ist. Und mit welchem Wert Cross oder Circle.
        if (fields[i] == 'circle') {
            document.getElementById('circle_' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross_' + i).classList.remove('d-none');
        }
    }
}



function checkForWin() { // Ermittelt 3 gleiche Zeichen in Reihe für den Gewinner.
    winHorizontal();
    winVertical()
    winAslant()

    if (winner) { // wenn duie Variable winner belegt wird aus einer der Abfragen wird die bedingung TRUE (WAHR) und somit in der console ausgeben.
        gameOver = true;
        console.log('Gewonnen hat: ' + winner);
        chanceFrameToWinner();
        if (winner == 'cross') {
            document.getElementById('win-name').innerHTML = name1;
            document.getElementById('win-cross').classList.remove('d-none');
            console.log('Gewonnen hat: ' + name1);

        } else {
            document.getElementById('win-name').innerHTML = name2;
            document.getElementById('win-circle').classList.remove('d-none');
            console.log('Gewonnen hat: ' + name2);
        }
    }
}

function chanceFrameToWinner() {
    document.getElementById('players').classList.add('d-none');
    document.getElementById('player-win').classList.remove('d-none');
}

function winHorizontal() {
    winHorizontelTop();
    winHorizontelMid();
    winHorizontelBot();
}

function winHorizontelTop() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        // Var winner wird der Wert aus dem Array Pos 0 zugewissen. ('Cross' oder 'Circle')
        winner = fields[0];
        //       document.getElementById('line_0').style.transform = 'scaleX(1.1)';
        document.getElementById(winner + '_0_red').classList.remove('d-none');
        document.getElementById(winner + '_1_red').classList.remove('d-none');
        document.getElementById(winner + '_2_red').classList.remove('d-none');
    }
}

function winHorizontelMid() {
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        //        document.getElementById('line_1').style.transform = 'scaleX(1.1)';
        document.getElementById(winner + '_3_red').classList.remove('d-none');
        document.getElementById(winner + '_4_red').classList.remove('d-none');
        document.getElementById(winner + '_5_red').classList.remove('d-none');
    }
}

function winHorizontelBot() {
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        //        document.getElementById('line_2').style.transform = 'scaleX(1.1)';
        document.getElementById(winner + '_6_red').classList.remove('d-none');
        document.getElementById(winner + '_7_red').classList.remove('d-none');
        document.getElementById(winner + '_8_red').classList.remove('d-none');
    }
}
//Vertikal - vertical
function winVertical() {
    winVerticalLeft();
    winVerticalMid();
    winVerticalRight()
}

function winVerticalLeft() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        //        document.getElementById('line_3').style.transform = 'scaleX(1.1) rotate(90deg)';
        document.getElementById(winner + '_0_red').classList.remove('d-none');
        document.getElementById(winner + '_3_red').classList.remove('d-none');
        document.getElementById(winner + '_6_red').classList.remove('d-none');
    }
}

function winVerticalMid() {
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        //        document.getElementById('line_4').style.transform = 'scaleX(1.1) rotate(90deg)';
        document.getElementById(winner + '_1_red').classList.remove('d-none');
        document.getElementById(winner + '_4_red').classList.remove('d-none');
        document.getElementById(winner + '_7_red').classList.remove('d-none');
    }
}

function winVerticalRight() {
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        //        document.getElementById('line_5').style.transform = 'scaleX(1.1) rotate(90deg)';
        document.getElementById(winner + '_2_red').classList.remove('d-none');
        document.getElementById(winner + '_5_red').classList.remove('d-none');
        document.getElementById(winner + '_8_red').classList.remove('d-none');
    }
}
//Quer - ASLANT
function winAslant() {
    winAslantPlus();
    winAslantMinus();
}

function winAslantPlus() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        //        document.getElementById('line_6').style.transform = 'rotate(45deg) scaleX(1.5)';
        document.getElementById(winner + '_0_red').classList.remove('d-none');
        document.getElementById(winner + '_4_red').classList.remove('d-none');
        document.getElementById(winner + '_8_red').classList.remove('d-none');
    }
}

function winAslantMinus() {
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        //        document.getElementById('line_7').style.transform = 'rotate(-45deg) scaleX(1.5)';
        document.getElementById(winner + '_2_red').classList.remove('d-none');
        document.getElementById(winner + '_4_red').classList.remove('d-none');
        document.getElementById(winner + '_6_red').classList.remove('d-none');
    }
}


function restart() {
    gameOver = false;
    for (let i = 0; i < 9; i++) {
        document.getElementById('circle_' + i).classList.add('d-none');
        document.getElementById('cross_' + i).classList.add('d-none');
    }
    window.open('/html/select.html');
    window.close('/game.html');
}

function openSelectMenu() {
    window.open('/html/select.html'); // oder mit einem Link 
    window.close('/index.html');
}

function selectName() {
    name1 = document.getElementById('player_1').value;
    name2 = document.getElementById('player_2').value;

    localStorage.setItem('nameEINS', name1);
    localStorage.setItem('nameZWEI', name2);
}

function loadName() {
    name1 = localStorage.getItem('nameEINS');
    name2 = localStorage.getItem('nameZWEI');
    document.getElementById('player-one').innerHTML = `${name1}:`;
    document.getElementById('player-two').innerHTML = `${name2}:`;

}

function quitGame() {
    window.close('/html/select.html');
    window.close('/index.html');
    window.close('/html/game.html');
}

function startGame() {
    selectName();
    window.open('/html/game.html');
    window.close('/html/select.html');
}

function writeName() {
    document.getElementById('player-one').innerHTML = player1;
    document.getElementById('player-two').innerHTML = player2;
}
// Balken einfügen
// Sieger Sound einfügen
// Player namen eingeben -> inputfeld
// Sieger farbe ändern auf rot

// Local SAVE / LOAD