let button = document.getElementById("increment");
let counter = document.getElementById("score");

let currentCounter = 0;
button.addEventListener("click", (e) => {
    console.log(e); //Display the target

    counter.innerText = ++currentCounter; 
})


//factory function. 
const user = (name) => {
    // const sayName = ()=> {
    //     console.log(name);
    // }
    return {name}
} 


//module pattern.
const create = (()=>{
    let users = []
    const userName  = document.querySelector("#name"); 
    // let lastName = document.querySelector("#lastName");   
    const meeco = user(userName); 
    const qrcode = new QRCode(document.querySelector("#qrcode"));
    const render = () => {
        generateQr();       
    function generateQr () {
        console.log(meeco.userName)
        qrcode.makeCode(userName.value)
    }
    }
    return {render}
})();

// create.render()
