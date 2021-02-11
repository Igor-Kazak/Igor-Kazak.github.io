//-------------------------CONSTRUCTOR OF ITEMS------------------------------------------

class Item {
  constructor(id, name, co2) {
    this.id = id;
    this.name = name;
    this.co2 = co2;
  }
}

//-------------------------DATABASE-----------------------------------------------------

var allcat = [];

var meat = [];
allcat.push(meat);
meat.push(new Item('101', 'Beef', 27000)); // 0
meat.push(new Item('102', 'Lamb', 39200)); // 1
meat.push(new Item('103', 'Chicken', 6900)); // 2
meat.push(new Item('104', 'Veal', 35700)); // 3
meat.push(new Item('105', 'Sausage', 8000)); // 4
meat.push(new Item('106', 'Turkey', 10900)); // 5
meat.push(new Item('107', 'Deli Meat', 8000)); // 6
meat.push(new Item('108', 'Salami', 9300)); // 7

var diary = [];
allcat.push(diary);
diary.push(new Item('201', 'Milk', 1900)); // 0
diary.push(new Item('202', 'Hard cheese', 13500)); // 1
diary.push(new Item('203', 'Butter', 23800)); // 2
diary.push(new Item('204', 'Yoghurt', 1250)); // 3
diary.push(new Item('205', 'Cottage Cheese', 1950)); // 4
diary.push(new Item('206', 'Crème fraîche', 7600)); // 5
diary.push(new Item('207', 'Margarine', 1350)); // 6
diary.push(new Item('208', 'Eggs', 1950)); // 7

var fish = [];
allcat.push(fish);
fish.push(new Item('301', 'Salmon (fresh)', 1190)); // 0
fish.push(new Item('302', 'Talpia', 10550)); // 1
fish.push(new Item('303', 'Sea Bass', 10400)); // 2
fish.push(new Item('304', 'Carp', 5300)); // 3
fish.push(new Item('305', 'Cod', 2800)); // 4
fish.push(new Item('306', 'Tuna (fresh)', 4070)); // 5
fish.push(new Item('307', 'Herring', 1300)); // 6
fish.push(new Item('308', 'Mackrei', 1100)); // 7

var fruitVeg = [];
allcat.push(fruitVeg);
fruitVeg.push(new Item('401', 'Apple', 550)); // 0
fruitVeg.push(new Item('402', 'Banana', 1370)); // 1
fruitVeg.push(new Item('403', 'Orange', 1300)); // 2
fruitVeg.push(new Item('404', 'Avocado', 2700)); // 3
fruitVeg.push(new Item('405', 'Onion', 800)); // 4
fruitVeg.push(new Item('406', 'Potatoe', 2900)); // 5
fruitVeg.push(new Item('407', 'Tomato', 1100)); // 6
fruitVeg.push(new Item('408', 'Cucumber', 140)); // 7

var cupboard = [];
allcat.push(cupboard);
cupboard.push(new Item('501', 'Sugar (refined)', 3930)); // 0
cupboard.push(new Item('502', 'Mixed Nuts', 2300)); // 1
cupboard.push(new Item('503', 'Beans', 2000)); // 2
cupboard.push(new Item('504', 'Oats', 570)); // 3
cupboard.push(new Item('505', 'Dark Chocolate', 5000)); // 4
cupboard.push(new Item('506', 'Chips', 3420)); // 5
cupboard.push(new Item('507', 'Lentils', 900)); // 6
cupboard.push(new Item('508', 'Rice', 2700)); // 7

var bakery = [];
allcat.push(bakery);
bakery.push(new Item('601', 'White Bread (Medium Slice)', 1354)); // 0
bakery.push(new Item('602', 'Brown Bread', 990)); // 1
bakery.push(new Item('603', 'Pita', 1300)); // 2
bakery.push(new Item('604', 'Wholemeal', 977)); // 3
bakery.push(new Item('605', 'Wholemeal (Medium Slice)', 990)); // 4
bakery.push(new Item('606', 'Challah', 1350)); // 5
bakery.push(new Item('607', 'Sourdough', 1350)); // 6
bakery.push(new Item('608', 'Gluten-Free Bread', 780)); // 7

var drinks = [];
allcat.push(drinks);
drinks.push(new Item('701', 'Coffee', 2500)); // 0
drinks.push(new Item('702', 'Black Tea', 1900)); // 1
drinks.push(new Item('703', 'Coca Cola', 1656)); // 2
drinks.push(new Item('704', 'Coke Zero', 1150)); // 3
drinks.push(new Item('705', 'Fanta', 1656)); // 4
drinks.push(new Item('706', 'Sprite', 1656)); // 5
drinks.push(new Item('707', 'Bottled Water', 1720)); // 6
drinks.push(new Item('708', 'Orange Juice', 1670)); // 7

var alternative = [];
allcat.push(alternative);
alternative.push(new Item('801', 'Soy Milk', 1080)); // 0
alternative.push(new Item('802', 'Almond Milk', 800)); // 1
alternative.push(new Item('803', 'Oat Milk', 900)); // 2
alternative.push(new Item('804', 'Coconut Butter', 1350)); // 3
alternative.push(new Item('805', 'Tempeh', 2000)); // 4
alternative.push(new Item('806', 'Tofu', 1900)); // 5
alternative.push(new Item('807', 'Seitan', 560)); // 6
alternative.push(new Item('808', 'Vegan Cheese', 1980)); // 7

//-------------------------FORMNIG DIAGRAM-----------------------------------------------

var selected = []; //database of items selected by user

diagram();

function diagram() {
  var labelslist = []; //names for diagram
  var datalist = []; //co2 for diagram
  var colorlist = []; //colors for diagram
  for (let i = 0; i < selected.length; i++) {
    //get data from items
    labelslist.push(selected[i].name);
    datalist.push(selected[i].co2);
    if (selected[i].co2 > 20000) {
      colorlist.push('rgb(255, 99, 132)');
    } else if (selected[i].co2 < 5000) {
      colorlist.push('green');
    } else {
      colorlist.push('yellow');
    }
  }

  //-------------------------CALCULATE TOTAL EMISSION-------------------------------------

  var amount = 0; //total co2
  for (let i = 0; i < datalist.length; i++) {
    //calc the amount of c02 form selected
    amount += datalist[i];
  }

  let totalTable = document.getElementById('calTable');
  let totalItems = document.getElementById('totalItems');
  if (amount == 0) {
    totalTable.innerHTML = `<p class="totalTable">Click on categories to select items</p>`;
  } else {
    totalTable.innerHTML = `<p class="totalTable">Total Amount of Selected Emission in CO<sub>2</sub>: ${amount}</p>`;
    totalItems.innerHTML = '';
    for (let i = 0; i < colorlist.length; i++) {
      let liItems = document.createElement('li');
      liItems.innerHTML = `<li class="itemsSelect" style="margin-right: 48px; margin-top: 12px; display: flex"><div class="box" style="background-color: ${colorlist[i]}; margin-right: 12px; border-radius: 50%"></div><p>${labelslist[i]} ${datalist[i]} CO<sub>2</sub></p></li>`;
      totalItems.appendChild(liItems);
    }
  }

  //-------------------------DIAGRAM OF EMISSION-------------------------------------

  var ctx = document.getElementById('myChart').getContext('2d'); //building a diagram
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelslist,

      datasets: [
        {
          label:
            'The Co2 emissions (in g per kg of food) that you will produce',
          backgroundColor: colorlist,
          //borderColor: 'rgb(255, 99, 132)',
          data: datalist
        }
      ]
    },
    options: {
      events: ['touchmove']
    }
  });
}

//-------------------------------CREATE ITEMS IN DOM----------------------------------

createItems(document.getElementById('collapseMeat').firstElementChild, 0);
createItems(document.getElementById('collapseDairy').firstElementChild, 1);
createItems(document.getElementById('collapseFish').firstElementChild, 2);
createItems(document.getElementById('collapseFV').firstElementChild, 3);
createItems(document.getElementById('collapseCupboard').firstElementChild, 4);
createItems(document.getElementById('collapseBakery').firstElementChild, 5);
createItems(document.getElementById('collapseDrink').firstElementChild, 6);
createItems(document.getElementById('collapseAlternative').firstElementChild, 7);

function createItems(group, num) {
  for (let i = 0; i < allcat[num].length; i++) {
    let div = document.createElement('div');
    div.classList.toggle('item');
    group.appendChild(div);
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('input', selectItem);
    input.setAttribute('id', allcat[num][i].id);
    div.appendChild(input);
    let label = document.createElement('label');
    label.setAttribute('class', 'label');
    label.textContent = allcat[num][i].name;
    div.appendChild(label);
  }
}

//-------------------------------ADD ITEM TO DIAGRAM AND DELETE IT IF UNCHECKED--------------------------

function selectItem(event) {
  if (event.target.checked) {
    //adding
    for (let i = 0; i < allcat.length; i++) {
      for (let j = 0; j < allcat[i].length; j++) {
        if (allcat[i][j].id == event.target.id) {
          selected.push(allcat[i][j]);
          break;
        }
      }
    }
  } else {
    //deleting
    let delpos = -1;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].id == event.target.id) {
        delpos = i;
        break;
      }
    }
    if (delpos >= 0) {
      selected.splice(delpos, 1);
    }
  }
  diagram();
}

//--------------------------ANIMATION FOR CATEGORIES------------------------------------
let divsanim = document.getElementsByClassName('btn-transparent');
for (let i = 0; i < divsanim.length; i++) {
  divsanim[i].addEventListener('mouseover', mouseover);
  divsanim[i].addEventListener('mouseout', mouseout);
  divsanim[i].style.opacity = '0.8';
}
function mouseover(event) {
  event.target.style.opacity = '1.0';
  event.target.style.transform = 'scale(1.1)';
}
function mouseout(event) {
  event.target.style.opacity = '0.8';
  event.target.style.transform = 'scale(1.0)';
}
//--------------------------------------------------------------------------------------
