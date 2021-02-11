var colour = document.getElementById('colour');
var canvas = document.querySelector('.canvas');
var check = false;

document.querySelector('.button').addEventListener('click', clear);

for (let i = 0; i < 3200; i++){
    let div = document.createElement('div');
    div.className = 'canvas-items';
    div.addEventListener('mousedown', drawdown);
    div.addEventListener('mouseover', drawover);    
    div.addEventListener('mouseup', drawup);    
    canvas.appendChild(div);
}

function drawdown(event){
    event.target.style.background = colour.value;
    check = true;
}

function drawover(event){
    if (check){
    event.target.style.background = colour.value;
    }
}

function drawup(event){
    check = false;
}

function clear(){
    console.log('clear!');
    window.location.reload();
}