// fetch('https://jsonplaceholder.typicode.com/users', {
//     method: "GET"
// })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         createRobots(data);
//     })
//     .catch(err => {
//         console.log('Request Failed', err)
//     });

async function fetchRobots() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await response.json();
        createRobots(data);
    } catch (err) {
        console.log('Request Failed', err)
    }
}

fetchRobots()

var robots;

function createRobots(obj){
    robots = Object.assign([], obj);
for (let i = 0; i < obj.length; i++) {
    let div = document.getElementsByClassName('row')[0];
    let col = document.createElement('div');
    col.classList.add('col');
    col.id = obj[i].id;
    div.appendChild(col);
    let card = document.createElement('div');
    card.classList.add('card');
    col.appendChild(card);
    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute("src", 'https://robohash.org/'+obj[i].id+'?200x200');
    card.appendChild(img);
    let cardbody = document.createElement('div');
    cardbody.classList.add('card-body');
    card.appendChild(cardbody);
    let h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = obj[i].name;
    cardbody.appendChild(h5);
    let p = document.createElement('p');
    p.classList.add('card-text');
    p.textContent = obj[i].email;
    cardbody.appendChild(p);
    let p1 = document.createElement('p');
    p1.classList.add('card-text');
    p1.textContent = obj[i].address.city;
    cardbody.appendChild(p1);
    let btn = document.createElement('button');
    btn.classList.add(obj[i].id);
    btn.addEventListener('click', posts);
    btn.textContent = 'View posts';
    cardbody.appendChild(btn);
}
}

function keyupFunction() {
    let formcontrol = document.getElementsByClassName('form-control')[0];
    var col = document.getElementsByClassName('col');
    if (formcontrol.value != '') {
        for (let i = 0; i < col.length; i++) {
            col[i].setAttribute('hidden', '');
        }
        for (let i = 0; i < robots.length; i++) {
            if (robots[i].name.toLowerCase().includes(formcontrol.value)) {
                document.getElementById(robots[i].id).removeAttribute('hidden');
            }
        }
    }
    else {
        for (let i = 0; i < col.length; i++) {
            col[i].removeAttribute('hidden');
        }
    }
}

// function posts(event) {
//     fetch('https://jsonplaceholder.typicode.com/posts?userId=' + event.target.className, {
//     method: "GET"
// })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         for (let i = 0; i < data.length; i++) {
//             console.log(data[i].title);
//             console.log(data[i].body);
//         }
//     })
//     .catch(err => {
//         console.log('Request Failed', err)
//     });
// }

async function posts(event) {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + event.target.className);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].body);
        }
    } catch (err) {
        console.log('Request Failed', err)
    }
}
