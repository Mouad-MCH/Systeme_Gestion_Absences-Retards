

/*---------------------- *\
 * - DOM Variables
\* --------------------- */

let logeout = document.querySelector(".logeout");

let btn_login = document.getElementById("btn_login");
let username = document.getElementById("username");
let password = document.getElementById("password");
let isCorrect = document.getElementById("incorrect");


/*---------------------- *\
 * - Variables
\* --------------------- */

let x;


/*---------------------- *\
 * - Admin
\* --------------------- */

const user = "mouad";
const pass = "1234"


/*---------------------- *\
 * - Function
\* --------------------- */


//--------------- login ---------------//



// logeout.addEventListener("click", () => {
//    window.location.href = "Login.html"
// })


function out() {
  if(window.location.pathname.includes("/etudiants.html") || window.location.pathname.includes("/dashboard.html")){ 
    window.location.href = "../Login.html";
    return
  }
  
  window.location.href = "Login.html"
}


function run(e) {
    if(username.value === "" || password.value === "") {
    x = Math.floor(Math.random(1) * 44)
    btn_login.classList.add(`translate-[${50}0%]`)
    return
  }


  e.addEventListener("click" , () => {
    if(username.value !== user || password.value !== pass) {
        isCorrect.classList.toggle("hidden")
        return
    }

    localStorage.setItem("username", username.value);
    window.location.href = "presence.html"
  })

} 


function focuss() {
  btn_login.classList.toggle(`translate-[${50}0%]`)
  // document.body.style.backgroundColor = "red"
}




