

let nameButton = document.getElementById('name-button');
let nameOutput = document.getElementById('name-out');

let nameOne = document.getElementById('name-one');
let nameTwo = document.getElementById('name-two');
let nameThree = document.getElementById('name-three');
let nameFour = document.getElementById('name-four');
let nameFive = document.getElementById('name-five');
let nameSix = document.getElementById('name-six');

let randomNumber;
let prev = document.getElementById('prev');

let names = [];
let prevNames = [];

nameButton.addEventListener('click', function () {
    if (prevNames.length < 5) {
        prev.classList.remove('hiding');
        prevNames.push(nameOne.textContent);
    } else {
        prevNames.shift();
        prevNames.push(nameOne.textContent);
    }
    GetName();
})

function GetName() {
    fetch('./data/data.json').then(response => response.json())
    .then(data => {
        names = data.allNames[Math.floor(Math.random() * 35)].firstName;
        nameOne.textContent = names;
        console.log(names);
        nameTwo.textContent = prevNames[4];
        nameThree.textContent = prevNames[3];
        nameFour.textContent = prevNames[2];
        nameFive.textContent = prevNames[1];
        nameSix.textContent = prevNames[0];
    })
}


