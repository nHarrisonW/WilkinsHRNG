
function saveName(name) {
    let names = JSON.parse(localStorage.getItem("names")) || [];
    names.push(name);
    localStorage.setItem("names", JSON.stringify(names));
}

// NAME BTN IS THE BUTTON TO GET A RANDOM FROM THE NEW LIST BEING CREATED
let nameBtn = document.getElementById("name-button");

nameBtn.addEventListener("click", function () {
    let names = JSON.parse(localStorage.getItem("names"));
    if (names && names.length > 0) {
        let randomIndex = Math.floor(Math.random() * names.length);
        let randomName = names[randomIndex];
        // console.log(randomName);
    } else {
        console.log("No names found.");
    }
});

export { saveName }