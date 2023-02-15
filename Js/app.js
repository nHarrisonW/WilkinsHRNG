

import { saveName } from "./localStorage.js";

let newNameBtn = document.getElementById("newNameBtn");
newNameBtn.addEventListener("click", function() {
  let newName = document.getElementById("newNameInp").value.trim();
  if (newName !== "") {
    saveName(newName);
    console.log(newName);
    // alert("Name added successfully!");
    document.getElementById("newNameInp").value = ""; // clear input field
  } else {
    alert("Please enter a valid name.");
  }
});



// outputting a random name
let nameBtn = document.getElementById("name-button");
let nameOne = document.getElementById("name-one");
let namePrev = document.getElementById("namePrev");
let nameMore = document.getElementById("nameMore");
let prev = document.getElementById("prev");
let more = document.getElementById("more");
let names = JSON.parse(localStorage.getItem("names")) || [];
let prevNames = [];

// Outputting a random name from list
nameBtn.addEventListener("click", function() {
  if (names.length > 0) {
    let randomIndex = Math.floor(Math.random() * names.length);
    let randomName = names[randomIndex];
    prevNames.push(randomName);
    namePrev.textContent = prevNames.join(", ");
    prev.classList.remove("hiding");
    if (prevNames.length > 1) {
      more.classList.remove("hiding");
    }
    names.splice(randomIndex, 1);
    nameOne.textContent = randomName;
  } else {
    alert('Add a name, then refresh the page...')
    console.log("No names found.");
  }
});
// creating element for groups to be output below random names
more.addEventListener("click", function() {
  let randomIndex = Math.floor(Math.random() * prevNames.length);
  let randomName = prevNames[randomIndex];
  let nameDiv = document.createElement("div");
  nameDiv.textContent = randomName;
  nameMore.appendChild(nameDiv);
});


let clearBtn = document.getElementById("clear-button");
// Button to clear all names from the local storage and start anew
clearBtn.addEventListener("click", function() {
  localStorage.removeItem("names");
  names = [];
  prevNames = [];
  nameOne.textContent = "";
  namePrev.textContent = "";
  nameMore.innerHTML = "";
  prev.classList.add("hiding");
  more.classList.add("hiding");
  nameBtn.disabled = false;
});


let groupInp = document.getElementById("groupInp");
let groupBtn = document.getElementById("groupBtn");
// function to shuffle the array
function shuffleArray(arr) {
    let shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
// Button to gather random groups by desired amounts
groupBtn.addEventListener("click", function() {
    let groupSize = parseInt(groupInp.value);
    let shuffledNames = shuffleArray(names);
    let groups = [];
    let prevGroup = [];
  
    for (let i = 0; i < shuffledNames.length; i += groupSize) {
      let group = shuffledNames.slice(i, i + groupSize);
      if (group.length === 1) {
        prevGroup.push(group[0]);
      } else {
        if (prevGroup.length === 1) {
          group.unshift(prevGroup[0]);
          prevGroup = [];
        }
        groups.push(group);
      }
    }
    
    if (prevGroup.length === 1) {
      groups[0].unshift(prevGroup[0]);
    }
  
    let groupOutput = "";
  
    for (let i = 0; i < groups.length; i++) {
      groupOutput += "<p>Group " + (i + 1) + ": " + groups[i].join(", ") + "</p>";
    }
  
    nameMore.innerHTML = groupOutput;
    more.classList.remove("hiding");
  });
  
