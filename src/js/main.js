

/*---------------------- *\
 * - DOM Variables
\* --------------------- */

let logeout = document.querySelector(".logeout");

let btn_login = document.getElementById("btn_login");
let username = document.getElementById("username");
let password = document.getElementById("password");

let presence1 = document.querySelectorAll("[name = persone1]");
let presence2 = document.querySelectorAll("[name = persone2]");
let presence3 = document.querySelectorAll("[name = persone3]");

let retard_ditail = document.querySelector(".retard_ditail");


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



// presence.parentElement.classList.add("bg-[#10b981]")



function Per(presences) {

  presences.forEach((el) => {
    el.parentElement.addEventListener("click" , (e) => {
      if(el.value == "retard"){
        retard_ditail.classList.toggle("hidden")
      }
    })

    if(el.hasAttribute("checked")) {
  
      switch(el.value) {
        case "present" : el.parentElement.classList.add("bg-[#10b981]")
        break;
        case "absent"  : el.parentElement.classList.add("bg-[#ef4444]")
        break;
        case "retard"  : el.parentElement.classList.add("bg-[#f59e0b]")
        break;
      }
      
    }
  }) 
}

Per(presence1);
Per(presence2);
Per(presence3);


