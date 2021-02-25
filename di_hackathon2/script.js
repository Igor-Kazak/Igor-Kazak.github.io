class UserLogin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class UserRegister {
  constructor(username, password, lastname, firstname, email) {
      this.username = username;
      this.password = password;
      this.lastname = lastname;
      this.firstname = firstname;
      this.email = email;
  }
}

document.getElementById('secret').addEventListener('click', enter);

function userLogin() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  if (username != '' && password != '') {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify((new UserLogin(username, password)))
    })
      .then(res => res.json())
      .then(data => {
        userWelcome(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  else {
    document.getElementById('loginmessage').textContent = 'Enter username and password!';
  }
}

function userWelcome(data){
  let welcome = '';
  if (data.length > 0){
    welcome = 'Welcome, '+data[0].firstname+' '+data[0].lastname+'! Entering...';
    setTimeout(function(){ enter() }, 1000);
  }
  else {
    welcome = 'Login error!';
  }
  document.getElementById('loginmessage').textContent = welcome;
}

function enter(){
  document.body.innerHTML = '';
  fetchNasa();
}

function fetchNasa(){
  fetch('https://api.nasa.gov/planetary/apod?count=5&api_key=DEMO_KEY')
      .then(res => res.json())
      .then(data => {
        draw(data);
      })
      .catch(err => {
        console.log(err);
      })
}

function draw(data){
  // let div = document.createElement('div');
  // div.className = 'drawdiv';
  // document.body.appendChild(div);
  // let title = document.createElement('p');
  // title.className = 'h3';
  // title.textContent = data.title;
  // let img = document.createElement('img');
  // img.setAttribute('src', data.hdurl);
  // img.className = 'img-fluid';
  // let exp = document.createElement('p');
  // exp.className = 'h6';
  // exp.textContent = data.explanation;
  // div.appendChild(title);
  // div.appendChild(img);
  // div.appendChild(exp);
  document.body.innerHTML = `
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${data[0].hdurl}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${data[0].title}</h5>
        <p class="ps">${data[0].explanation}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${data[1].hdurl}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${data[1].title}</h5>
        <p class="ps">${data[1].explanation}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${data[2].hdurl}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${data[2].title}</h5>
        <p class="ps">${data[2].explanation}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${data[3].hdurl}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${data[3].title}</h5>
        <p class="ps">${data[3].explanation}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${data[4].hdurl}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${data[4].title}</h5>
        <p class="ps">${data[4].explanation}</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
}

function userRegister() {
  let username = document.getElementById('usernamereg').value;
  let password = document.getElementById('passwordreg').value;
  let lastname = document.getElementById('lastname').value;
  let firstname = document.getElementById('firstname').value;
  let email = document.getElementById('email').value;
  if (username != '' && password != '' && lastname != '' && firstname != '' && email != '') {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify((new UserRegister(username, password, lastname, firstname, email)))
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById('registermessage').textContent = data.message;
      })
      .catch(err => {
        console.log(err);
      })
      document.getElementById('usernamereg').value = '';
      document.getElementById('passwordreg').value = '';
      document.getElementById('lastname').value = '';
      document.getElementById('firstname').value = '';
      document.getElementById('email').value = '';
  }
  else {
    document.getElementById('registermessage').textContent = 'Enter all data!';
  }
}
