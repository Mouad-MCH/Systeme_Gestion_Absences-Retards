

/*---------------------- *\
 * - DOM Variables
\* --------------------- */

let logeout = document.querySelector(".logeout");

let btn_login = document.getElementById("btn_login");
let username = document.getElementById("username");
let password = document.getElementById("password");


/*---------------------- *\
 * - Variables
\* --------------------- */

let x;

/*---------------------- *\
 * - Fetch API
\* --------------------- */




/*---------------------- *\
 * - Function
\* --------------------- */

logeout.addEventListener("click", () => {
  window.location.href = "Login.html"
})


function run(e) {
    if(username.value === "" || password.value === "") {
    x = Math.floor(Math.random(1) * 44)
    btn_login.classList.add(`translate-[${50}0%]`)
    return
  }


  e.addEventListener("click" , () => {
    window.location.href = "presence.html"
  })

} 


  function focuss() {
  btn_login.classList.toggle(`translate-[${50}0%]`)
  // document.body.style.backgroundColor = "red"
}