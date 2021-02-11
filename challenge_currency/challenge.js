document.getElementById('button').addEventListener('click', convert);

addItems();

async function fetchMe(action, what) {
    try {
        let response = await fetch('http://api.currencylayer.com/' + action + '?access_key=2e56461e310049a14d6439218e8ee43f&format=1' + what);
        let data = await response.json();
        return data;
    } catch (err) {
        console.log('Request Failed', err)
    }
}

async function addItems() {
    let items = await fetchMe('list', '');
    let selFr = document.getElementById('from');
    for (let i = 0; i < Object.entries(items.currencies).length; i++) {
        let opt = document.createElement('option');
        opt.value = Object.keys(items.currencies)[i];
        opt.textContent = Object.keys(items.currencies)[i] + ' - ' + Object.values(items.currencies)[i];
        selFr.appendChild(opt);
    }
    let selTo = document.getElementById('to');
    for (let i = 0; i < Object.entries(items.currencies).length; i++) {
        let opt = document.createElement('option');
        opt.value = Object.keys(items.currencies)[i];
        opt.textContent = Object.keys(items.currencies)[i] + ' - ' + Object.values(items.currencies)[i];
        selTo.appendChild(opt);
    }
}

async function convert() {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let amount = document.getElementById('amount').value;
    if (amount > 0 && from != to) {
        let items = await fetchMe('live', '&currencies=' + from + ',' + to);
        amount *= parseFloat(Object.values(items.quotes)[1]);
        document.getElementById('result').textContent = amount.toFixed(2) + ' ' + to;
    }
    else {
        alert('Enter correct amount and currency!');
        document.getElementById('amount').value = '';
        document.getElementById('result').textContent = '';
    }
}
