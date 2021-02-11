const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var yourGame = [];
var myGame = [];

function createX() {
    var x = document.createElement('p');
    x.classList.add('elem');
    x.textContent = 'X';
    return x;
}

function createO() {
    var o = document.createElement('p');
    o.classList.add('elem');
    o.textContent = 'O';
    return o;
}


function clickMe(event) {
    if (event.target.childElementCount == 0 && event.target.classList[0] == 'cell') {
        event.target.appendChild(createX());
        yourTurn(event.target.id);
    }
}

function yourTurn(id) {
    yourGame.push(parseInt(id));
    yourGame.sort();
    for (let i = 0; i < winCombos.length; i++) {
        if (yourGame.includes(winCombos[i][0]) && yourGame.includes(winCombos[i][1]) && yourGame.includes(winCombos[i][2])) {
            return win('You');
        }
    }
    if (document.getElementsByClassName('elem').length < 8){
        myTurn();
    }
    else {
        setTimeout(restartyourGame, 2000);        
    }
}

function myTurn() {
    let turn = true;
    while (turn) {
        let rnd = parseInt(Math.random() * 9);
        if (!yourGame.includes(rnd) && !myGame.includes(rnd)) {
            document.getElementById(rnd).appendChild(createO());
            myGame.push(rnd);
            turn = false;
            for (let i = 0; i < winCombos.length; i++) {
                if (myGame.includes(winCombos[i][0]) && myGame.includes(winCombos[i][1]) && myGame.includes(winCombos[i][2])) {
                    return win('I');
                }
            }
        }
    }
}

function win(who) {
    console.log(who + ' win!')
    var colored = document.getElementsByClassName('cell');
    for (let i = 0; i < colored.length; i++) {
        if (who == 'You') {
            colored[i].classList.add('green');
        }
        else {
            colored[i].classList.add('red');
        }
    }
    setTimeout(restartyourGame, 2000);
}

function restartyourGame(){
    location.reload();
}