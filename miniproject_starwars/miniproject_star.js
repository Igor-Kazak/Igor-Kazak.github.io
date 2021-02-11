document.getElementById('button').addEventListener('click', findSomeone);

async function fetchSomeone(url) {
    document.getElementById('p1').textContent = 'Loading....';
    document.getElementById('p2').textContent = 'Please wait';
    try {
        let response = await fetch(url);
        if (response.status !== 200){
            throw Error;
        }
        let data = await response.json();
        printSomeone(data);
    } catch (err) {
        printNotfound();
    }
}

async function findSomeone(){
    let rnd = parseInt(Math.random()*83)
    let url = 'https://swapi.dev/api/people/'+rnd;
    fetchSomeone(url);
}

async function printSomeone(data){
    document.getElementById('p1').textContent = data.name;
    let text = 'Height: ' + data.height + '<br>' +
            'Gender: ' + data.gender + '<br>' +
            'Birth Year: ' + data.birth_year + '<br>' +
            'Home World: ' + await nameWorld(data.homeworld)
    document.getElementById('p2').innerHTML = text;
}

async function printNotfound(){
    document.getElementById('p1').textContent = 'This person is not available!';
    document.getElementById('p2').textContent = '';
}

async function nameWorld(homeworld) {
    try {
        let response = await fetch(homeworld);
        if (response.status !== 200){
            throw Error;
        }
        let data = await response.json();
        return(data.name);
    } catch (err) {
        console.log(err);
    }
}