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
    let now = Date.now();
    for (let i = 0; i < obj.items.length; i++) {
        let date = new Date(obj.items[i].end);
        if (date < now && obj.items[i].status != 'Done'){
            obj.items[i].status = 'Missed'
        }
    } 
    printAll();
}
else {
    var obj = {"items":[]}
}

function additem() {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let start = new Date(document.getElementById('startdate').value);
    let end = new Date(document.getElementById('enddate').value);
    obj.items.push(new Item(name, description, start, end, 'Active'));
    localStorage.setItem('todolist', JSON.stringify(obj));
}

function printAll() {
    let table = document.getElementById('table');
    for (let i = 0; i < obj.items.length; i++) {
        let tr = document.createElement('tr');
        if (obj.items[i].status == 'Done'){
            tr.className = 'table-info';  
        }
        if (obj.items[i].status == 'Missed'){
            tr.className = 'table-danger';  
        }
        tr.addEventListener('mousedown', done);
        // tr.addEventListener('dblclick', remove);
        tr.id = i;
        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.textContent = i + 1;
        let td1 = document.createElement('td');
        td1.textContent = obj.items[i].name;
        let td2 = document.createElement('td');
        td2.textContent = obj.items[i].description;
        let td3 = document.createElement('td');
        td3.textContent = obj.items[i].start
        let td4 = document.createElement('td');
        td4.textContent = obj.items[i].end
        let td5 = document.createElement('td');
        td5.textContent = obj.items[i].status;
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        table.appendChild(tr);
    }
}

function done(event){
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
        localStorage.setItem('todolist', JSON.stringify(obj));
        window.location.reload();
    }

    localStorage.setItem('todolist', JSON.stringify(obj));
    window.location.reload();
}

// function remove(event){
//     let i = event.target.parentElement.id;
//     obj.items.splice(i, 1);
//     localStorage.setItem('todolist', JSON.stringify(obj));
//     window.location.reload();
// }

// function print() {
//     let list = document.getElementById('list');
//     let li = document.createElement('li');
//     li.addEventListener('click', clearMe);
//     li.textContent = arr[arr.length - 1];
//     list.appendChild(li);
// }



function clearAll() {
    localStorage.clear('todoList');
}

// function clearMe(event) {
//     let toClear = event.target.textContent;
//     event.target.remove();
// }