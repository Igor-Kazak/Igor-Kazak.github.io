var drums = document.getElementsByClassName('drums');

for (let i = 0; i < drums.length; i++){
    drums[i].onmouseover = function (event){
        event.target.classList.toggle('drumson');
    };
    drums[i].onmouseout = function (event){
        event.target.classList.toggle('drumson');
    };
    drums[i].onclick = function (event){
        sound(event);
    };
}

document.body.onkeydown = function (event){
    sound(event);
}


function pressed(letter){
    document.getElementById(letter).classList.toggle('drumsplay');
    setTimeout(function(){ 
    document.getElementById(letter).classList.toggle('drumsplay');
    }, 200);
}


function sound(event) {
    var audio = new Audio();
    if (event.target.id == 'a' || event.keyCode == '65') {
        audio.src = 'sounds/tom.wav';
        audio.autoplay = true;
        pressed('a');
    }
    if (event.target.id == 's' || event.keyCode == '83') {
        audio.src = 'sounds/boom.wav';
        audio.autoplay = true;
        pressed('s');
    }
    if (event.target.id == 'd' || event.keyCode == '68') {
        audio.src = 'sounds/clap.wav';
        audio.autoplay = true;
        pressed('d');
    }
    if (event.target.id == 'f' || event.keyCode == '70') {
        audio.src = 'sounds/hihat.wav';
        audio.autoplay = true;
        pressed('f');
    }
    if (event.target.id == 'g' || event.keyCode == '71') {
        audio.src = 'sounds/kick.wav';
        audio.autoplay = true;
        pressed('g');
    }
    if (event.target.id == 'h' || event.keyCode == '72') {
        audio.src = 'sounds/openhat.wav';
        audio.autoplay = true;
        pressed('h');
    }
    if (event.target.id == 'j' || event.keyCode == '74') {
        audio.src = 'sounds/ride.wav';
        audio.autoplay = true;
        pressed('j');
    }
    if (event.target.id == 'k' || event.keyCode == '75') {
        audio.src = 'sounds/snare.wav';
        audio.autoplay = true;
        pressed('k');
    }
    if (event.target.id == 'l' || event.keyCode == '76') {
        audio.src = 'sounds/tink.wav';
        audio.autoplay = true;
        pressed('l');
    }
}