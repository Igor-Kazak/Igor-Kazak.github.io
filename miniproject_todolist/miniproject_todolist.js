class Item {
    constructor(name, description, start, end, status) {
        this.name = name;
        this.description = description;
        this.start = start;
        this.end = end;
        this.status = status;
    }
}

if (localStorage.getItem('todolist')) {
    var obj = JSON.parse(localStorage.getItem('todolist'));
    let temp = {};
    for (let i = 0; i < obj.items.length; i++) {
        for (let b = i + 1; b < obj.items.length; b++) {
            if (obj.items[i].start > obj.items[b].start) {
                temp = { ...obj.items[i] };
                obj.items[i] = { ...obj.items[b]};
                obj.items[b] = { ...temp};
            }
        }
    }
    let now = Date.now();
    for (let i = 0; i < obj.items.length; i++) {
        let date = new Date(obj.items[i].end);
        if (date < now && obj.items[i].status != 'Done' && obj.items[i].end != null) {
            obj.items[i].status = 'Missed'
        }
    }
    printAll();
}
else {
    var obj = { "items": [] }
}

function additem() {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let start = new Date(document.getElementById('startdate').value);
    let end = new Date(document.getElementById('enddate').value);
    obj.items.push(new Item(name, description, start, end, 'Active'));
    localStorage.setItem('todolist', JSON.stringify(obj));
    window.location.reload();
}

function printAll() {
    let table = document.getElementById('table');
    let now = new Date();
    for (let i = 0; i < obj.items.length; i++) {
        let tr = document.createElement('tr');
        if (obj.items[i].status == 'Done') {
            tr.className = 'table-info';
        }
        if (obj.items[i].status == 'Missed') {
            tr.className = 'table-danger';
        }
        tr.addEventListener('mousedown', done);
        tr.id = i;
        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.textContent = i + 1;
        let td1 = document.createElement('td');
        td1.textContent = obj.items[i].name;
        let td2 = document.createElement('td');
        td2.textContent = obj.items[i].description;
        let td3 = document.createElement('td');
        let start = obj.items[i].start;
        if (start != null) {
            start = start.replace('T', ' ');
            start = start.replace(':00.000Z', '');
            td3.textContent = start;
        }
        let td4 = document.createElement('td');
        if (obj.items[i].end != null) {
        let end = new Date(obj.items[i].end);
            let days = parseInt((end - now) / (1000 * 60 * 60 * 24));
            if (days >= 0) {
                td4.textContent = days + ' days left';
            }
            else {
                td4.textContent = days * (-1) + ' days missed';
            }
        }
        let td5 = document.createElement('td');
        td5.textContent = obj.items[i].status;
        let td6 = document.createElement('td');
        //td6.innerHTML = '<button type="button" id="editbtn" class="btn btn-outline-primary btn-sm">Edit</button>';
        td6.textContent = 'Edit';
        td6.addEventListener('mousedown', edit);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
    }
}

//  <button type="button" name="edit" class="btn btn-warning" onclick="edit()">Edit</button>

function done(event) {
        let i = event.target.parentElement.id;
        if (event.which === 1 || event.button === 0) {
            if (obj.items[i].status == 'Active' || obj.items[i].status == 'Missed') {
                obj.items[i].status = 'Done';
            }
            else {
                if (obj.items[i].status == 'Done') {
                    obj.items[i].status = 'Active';
                }
            }
        }
        if (event.which === 3 || event.button === 2) {
            let i = event.target.parentElement.id;
            obj.items.splice(i, 1);
        }
        localStorage.setItem('todolist', JSON.stringify(obj));
        window.location.reload();
}

function clearAll() {
    localStorage.clear('todoList');
    window.location.reload();
}

function edit(event) {
    event.stopPropagation();
    let i = event.target.parentElement.id;
    document.getElementById('name').value = obj.items[i].name;
    document.getElementById('description').value = obj.items[i].description;
    if (obj.items[i].start != null) {
        let start = obj.items[i].start;
        start = start.replace(':00.000Z', '');
        document.getElementById('startdate').value = start;
    }
    if (obj.items[i].end != null) {
        let end = obj.items[i].end;
        end = end.replace(':00.000Z', '');
        document.getElementById('enddate').value = end;
    }
    let btn = document.getElementById('addbutton');
    btn.textContent = 'Save';
    btn.classList.toggle('btn-info');
    btn.classList.toggle('btn-success');
    btn.setAttribute('onclick', 'save('+i+')');
    document.getElementById(i).className = 'table-dark';
}

function save(i){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let start = new Date(document.getElementById('startdate').value);
    let end = new Date(document.getElementById('enddate').value);
    obj.items[i] = new Item(name, description, start, end, 'Active');
    localStorage.setItem('todolist', JSON.stringify(obj));
    let btn = document.getElementById('addbutton');
    btn.textContent = 'Add to list';
    btn.classList.toggle('btn-info');
    btn.classList.toggle('btn-success');
    btn.setAttribute('onclick', 'additem()');
    window.location.reload();
}