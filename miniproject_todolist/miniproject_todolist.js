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
                obj.items[i] = { ...obj.items[b] };
                obj.items[b] = { ...temp };
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
    thisWeek();
}

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
    btn.setAttribute('onclick', 'save(' + i + ')');
    document.getElementById(i).className = 'table-dark';
}

function save(i) {
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

function thisWeek() {
    let now = new Date();
    let today = now.getDay();
    let firstday = new Date(now - ((0 + today) * 1000 * 60 * 60 * 24));
    firstday.setHours(00);
    firstday.setMinutes(01);
    let lastday = new Date(now - (-(6 - today) * 1000 * 60 * 60 * 24));
    lastday.setHours(23);
    lastday.setMinutes(59);
    for (let i = 0; i < obj.items.length; i++) {
        if (obj.items[i].start != null && obj.items[i].end != null) {
            let starti = new Date(obj.items[i].start);
            let endi = new Date(obj.items[i].end);
            if (starti >= firstday && starti <= lastday) {
                if (endi >= firstday && endi <= lastday) {
                    printGraph(starti.getDay(), endi.getDay(), obj.items[i].name, obj.items[i].status);
                }
                else {
                    printGraph(starti.getDay(), 6, obj.items[i].name, obj.items[i].status);
                }
            }
            else {
                if (endi >= firstday && endi <= lastday) {
                    printGraph(0, endi.getDay(), obj.items[i].name, obj.items[i].status);
                }
            }
            if (starti <= firstday && endi >= lastday) {
                printGraph(0, 6, obj.items[i].name, obj.items[i].status);
            }
        }
    }
}

function printGraph(a, b, c, d) {
    let weekgraph = document.getElementById('weekgraph');
    let div = document.createElement('div');
    div.className = 'progress';
    div.setAttribute('height', '30px');
    let bar1 = document.createElement('div');
    bar1.className = 'progress-bar';
    bar1.classList.toggle('bg-warning');
    bar1.setAttribute('role', 'progressbar');
    let width1 = 14.28 * a;
    bar1.style.width = width1.toFixed(2) + '%';
    let bar2 = document.createElement('div');
    bar2.className = 'progress-bar';
    if (d == 'Missed') {
        bar2.classList.toggle('bg-danger');
    }
    if (d == 'Done') {
        bar2.classList.toggle('bg-info');
    }
    if (d == 'Active') {
        bar2.classList.toggle('bg-success');
    }
    bar2.setAttribute('role', 'progressbar');
    let width2 = 14.28 * ((b - a) + 1);
    bar2.style.width = width2.toFixed(2) + '%';
    bar2.textContent = c;
    let bar3 = document.createElement('div');
    bar3.className = 'progress-bar';
    bar3.classList.toggle('bg-warning');
    bar3.setAttribute('role', 'progressbar');
    let width3 = 100 - width1 - width2;
    bar3.style.width = width3.toFixed(2) + '%';
    div.appendChild(bar1);
    div.appendChild(bar2);
    div.appendChild(bar3);
    weekgraph.appendChild(div);
}