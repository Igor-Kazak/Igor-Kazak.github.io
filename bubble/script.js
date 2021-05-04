document.body.style.fontFamily = 'Courier New';
createBubble();

function createBubble() {
    let bubble = document.createElement('div');
    bubble.id = 'bubble';
    bubble.style.width = '100px';
    bubble.style.height = '100px';
    bubble.style.borderRadius = '100%';
    bubble.style.background = 'lightblue';
    bubble.style.margin = '5px';
    bubble.style.position = 'absolute';
    bubble.style.right = 0;
    bubble.style.bottom = 0;
    bubble.addEventListener('mouseenter', handleMouseEnter);
    bubble.addEventListener('mouseleave', handleMouseLeave);
    bubble.addEventListener('click', handleClick);
    document.body.appendChild(bubble);
}

function handleMouseEnter(event) {
    event.target.style.background = 'lightgreen';
}

function handleMouseLeave(event) {
    event.target.style.background = 'lightblue';
}

function handleClick(event) {
    event.target.style.visibility = 'hidden';
    createPanel();
}

function handleClose() {
    document.getElementById('bubble').style.visibility = 'visible';
    document.body.removeChild(document.getElementById('panel'));
}

function handleRefresh() {
    document.getElementById('informDiv').innerHTML = countElements();
}

function handleContact() {
    let panel = document.getElementById('panel')
    panel.removeChild(document.getElementById('informDiv'));
    createContactForm(panel);
}

function handleBack() {
    let panel = document.getElementById('panel')
    if (document.getElementById('contactForm')) {
        panel.removeChild(document.getElementById('contactForm'));
    }
    else {
        panel.removeChild(document.getElementById('messageOk'));
    }
    panel.removeChild(document.getElementById('buttonDiv'));
    createButtons(panel);
    createInform(panel);
}

function handleSubmit(event) {
    event.preventDefault();
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let message = document.getElementById('inputMessage').value;
    let panel = document.getElementById('panel');
    panel.removeChild(document.getElementById('contactForm'));
    let messageOk = document.createElement('div');
    messageOk.id = 'messageOk';
    messageOk.style.width = '100%';
    messageOk.style.height = '80%';
    messageOk.style.display = 'flex';
    messageOk.style.justifyContent = 'center';
    messageOk.style.alignItems = 'center';
    messageOk.textContent = 'Sending...';
    panel.appendChild(messageOk);
    document.getElementById('buttonBack').setAttribute('disabled', 'disabled');
    document.getElementById('buttonSubmit').setAttribute('disabled', 'disabled');
    document.getElementById('buttonClose').setAttribute('disabled', 'disabled');
    sendData({ name, email, message });
}

function createPanel() {
    let panel = document.createElement('div');
    panel.id = 'panel';
    panel.style.width = '50%';
    panel.style.height = '250px';
    panel.style.borderRadius = '5px';
    panel.style.background = 'lightblue';
    panel.style.position = 'absolute';
    panel.style.left = '25%';
    panel.style.top = '25%';
    document.body.appendChild(panel);
    createButtons(panel);
    createInform(panel);
}

function createButtons(panel) {
    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'buttonDiv';
    buttonDiv.style.width = '80%';
    buttonDiv.style.margin = '2% 10% 2% 10%';
    buttonDiv.style.position = 'absolute';
    buttonDiv.style.left = 0;
    buttonDiv.style.bottom = 0;
    buttonDiv.style.display = 'flex';
    buttonDiv.style.justifyContent = 'space-between';
    panel.appendChild(buttonDiv);

    let buttonContactUs = document.createElement('button');
    buttonContactUs.id = 'buttonContactUs';
    buttonContactUs.textContent = 'ContactUs';
    buttonContactUs.style.width = '80px';
    buttonContactUs.addEventListener('click', handleContact);
    buttonDiv.appendChild(buttonContactUs);

    let buttonRefresh = document.createElement('button');
    buttonRefresh.id = 'buttonRefresh';
    buttonRefresh.textContent = 'Refresh';
    buttonRefresh.style.width = '80px';
    buttonRefresh.addEventListener('click', handleRefresh);
    buttonDiv.appendChild(buttonRefresh);

    let buttonClose = document.createElement('button');
    buttonClose.id = 'buttonClose';
    buttonClose.textContent = 'Close';
    buttonClose.style.width = '80px';
    buttonClose.addEventListener('click', handleClose);
    buttonDiv.appendChild(buttonClose);
}

function createInform(panel) {
    let informDiv = document.createElement('div');
    informDiv.id = 'informDiv';
    informDiv.style.width = '100%';
    informDiv.style.height = '80%';
    informDiv.style.display = 'flex';
    informDiv.style.justifyContent = 'center';
    informDiv.style.alignItems = 'center';
    informDiv.innerHTML = countElements();
    panel.appendChild(informDiv);
}

function countElements() {
    let allElements = document.body.getElementsByTagName("*");
    let images = 0;
    let fixed = 0;
    for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].nodeName == 'IMG') {
            images++;
        }
        if (allElements[i].style.position == 'fixed') {
            fixed++;
        }
    }
    return `<p>Number of images: ${images}<br>Number of fixed elements: ${fixed}</p>`
}

function createContactForm(panel) {
    let contactForm = document.createElement('form');
    contactForm.id = 'contactForm';
    contactForm.style.width = '90%';
    contactForm.style.height = '180px';
    contactForm.style.padding = '3% 5% 0 5%'
    contactForm.style.display = 'grid';
    contactForm.setAttribute('onsubmit', 'handleSubmit(event)')
    panel.appendChild(contactForm);

    let labelName = document.createElement('label');
    labelName.textContent = 'Name:'
    labelName.setAttribute('for', 'inputName')
    contactForm.appendChild(labelName);

    let inputName = document.createElement('input');
    inputName.id = 'inputName';
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('required', 'required');
    inputName.setAttribute('pattern', '[A-Za-z]{2,16}');
    inputName.style.margin = '1% 0 2% 0'
    contactForm.appendChild(inputName);

    let labelEmail = document.createElement('label');
    labelEmail.textContent = 'E-mail:'
    labelEmail.setAttribute('for', 'inputEmail')
    contactForm.appendChild(labelEmail);

    let inputEmail = document.createElement('input');
    inputEmail.id = 'inputEmail';
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('required', 'required');
    inputEmail.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    inputEmail.style.margin = '1% 0 2% 0'
    contactForm.appendChild(inputEmail);

    let labelMessage = document.createElement('label');
    labelMessage.textContent = 'Message:'
    labelMessage.setAttribute('for', 'inputMessage')
    contactForm.appendChild(labelMessage);

    let inputMessage = document.createElement('input');
    inputMessage.id = 'inputMessage';
    inputMessage.setAttribute('type', 'text');
    inputMessage.style.margin = '1% 0 2% 0'
    contactForm.appendChild(inputMessage);

    let buttonBack = document.getElementById('buttonContactUs');
    buttonBack.id = 'buttonBack';
    buttonBack.textContent = 'Back';
    buttonBack.removeEventListener('click', handleContact);
    buttonBack.addEventListener('click', handleBack);

    let buttonSubmit = document.createElement('input');
    buttonSubmit.id = 'buttonSubmit';
    buttonSubmit.setAttribute('type', 'submit');
    buttonSubmit.setAttribute('value', 'Submit');
    buttonSubmit.setAttribute('form', 'contactForm');
    buttonSubmit.style.width = '80px';
    let buttonDiv = document.getElementById('buttonDiv');
    let buttonRefresh = document.getElementById('buttonRefresh');
    buttonDiv.replaceChild(buttonSubmit, buttonRefresh);
}

function sendData(dataToSend) {
    fetch('http://localhost:3000/addMessage', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('messageOk').textContent = 'Thank you! Your message was sent!';
            document.getElementById('buttonBack').removeAttribute('disabled');
            document.getElementById('buttonClose').removeAttribute('disabled');
            console.log(data);
        })
        .catch(e => {
            document.getElementById('messageOk').textContent = 'Error! Your message was not sent!';
            document.getElementById('buttonBack').removeAttribute('disabled');
            document.getElementById('buttonClose').removeAttribute('disabled');
            console.log(e);
        });
}