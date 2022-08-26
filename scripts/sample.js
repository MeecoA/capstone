let button = document.getElementById("increment");
let counter = document.getElementById("score");

let currentCounter = 0;
button.addEventListener("click", (e) => {
    console.log(e); //Display the target

    counter.innerText = ++currentCounter; 
})