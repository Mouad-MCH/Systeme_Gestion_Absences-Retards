

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

let persone = document.querySelectorAll(".persone");
let footer_bottom = document.querySelector(".footer_bottom");

let btn_save = document.getElementById("btn_save");

let date = document.querySelector(".form-input")

/*---------------------- *\
 * - Variables
\* --------------------- */

let x;
let counter = persone.length;
let absent_present = []
let persone_status;

/*---------------------- *\
 * - Fetch API
\* --------------------- */

async function test() {
  const res = await fetch("../../all.json")
  
  let data = await res.json()
  console.log(data)
}



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


// Function checkbox --------------------------------------

function Per(presences) {

  presences.forEach((el) => {
    el.parentElement.addEventListener("click" , (e) => {

      let x = e.target.previousElementSibling;
      let parent = el.parentElement.parentElement.parentElement

      if(el.value == "retard"){
        parent.nextElementSibling.classList.toggle("hidden")
      }else {
        parent.nextElementSibling.classList.add("hidden")
      }

      x.checked = true;
      
      presences.forEach(l => { 
        const per = l.parentElement;
        per.classList.remove("bg-[#10b981]", "bg-[#ef4444]", "bg-[#f59e0b]");

        if(l.value !== x.value) {
          l.checked = false;
        }

        check(x.value , l , l.checked)
        persone_status = x.value;

      })

    })

  }) 
}

// Per(presence1);
// Per(presence2);
// Per(presence3);


function check(value,el , isTrue) {
  if(isTrue) {
        switch(value) {
        case "present" : el.parentElement.classList.add("bg-[#10b981]")
        break;
        case "absent"  : el.parentElement.classList.add("bg-[#ef4444]")
        break;
        case "retard"  : el.parentElement.classList.add("bg-[#f59e0b]")
        break;
      }

      return
  }

}

//--------------------------------------------



// Function Add Persone ---------------------------

function addElement() {
  counter++

  const div = document.createElement("div");
  div.classList.add("persone")

  div.innerHTML = `

                    <div class=" flex items-center justify-between bg-[#0a0e27] rounded-lg text-white py-2 px-5 hover:bg-[#141b3a] transition-all duration-200 hover:border-2 hover:border-[#1c339a]">

                    <div class="info flex items-center gap-4">

                      <div class="avatar bg-[#6366f1] p-2 rounded-lg">MC</div>

                      <div class="info_detail">
                        <h3 id ="name">Mouad CHARADI</h3>
                        <p class="opacity-50 text-[12px]"><span id ="groupe">Groupe 4</span> . ID: <span id="Id">#001</span></p>
                      </div>

                    </div>
                    
                    <div class="group_radio bg-[rgba(99,102,241,0.1)] sm:p-3 p-1 rounded-lg flex items-center sm:gap-4">

                      <label for="present" 
                            class="radio_option sm:px-[16px] sm:py-[8px] px-[6px] py-[4px] flex items-center 
                                   gap-[6px] rounded-[6px] cursor-pointer transition-all duration-300
                                   ">
                        <input type="checkbox" name="persone${counter}" value="present" class="hidden">
                        <span>Present</span>
                      </label>

                      <label for="absent" 
                             class="radio_option sm:px-[16px] sm:py-[8px] px-[6px] py-[4px] flex items-center 
                                   sm:gap-[6px] gap-[3px] rounded-[6px] cursor-pointer transition-all duration-300">
                      <input class="hidden" type="checkbox" name="persone${counter}" value="absent">
                      <span>Absent</span>
                      </label>

                      <label for="retard" 
                             class="radio_option sm:px-[16px] sm:py-[8px] px-[6px] py-[4px] flex items-center 
                                   gap-[6px] rounded-[6px] cursor-pointer transition-all duration-300">
                      <input class="hidden" type="checkbox" name="persone${counter}" value="retard">
                      <span>Retard</span>
                      </label>

                    </div>

                  </div>

                  <div class="retard_ditail mt-3 hidden rounded-lg p-5 bg-[#141b3a] border-l-[#f59e0b] border-l-3 text-white hover:bg-blue-950 transition-all duration-300 hover:border-2 hover:border-[#f59e0b]">
                    <h2 class="text-[#f59e0b] mb-5 ">Iformations du retard</h2>
                    <div class="retard_info flex items-center justify-between gap-3">

                      <div class="time w-[50%]">
                        <h2 class="opacity-35">HEURE D'ARRIVEE</h2>
                        <input class="bg-[#0a0e27] p-2 w-full rounded-lg mt-2" type="time">
                      </div>

                      <div class="motif w-[50%]">
                        <h2 class="opacity-35">MORIF DU RETARD</h2>
                        <input  class="bg-[#0a0e27] p-2 w-full rounded-lg mt-2" type="text">
                      </div>

                    </div>
                  </div>

  
  `
  footer_bottom.appendChild(div);

  let div_in = document.querySelectorAll(`[name = persone${counter}]`);

  Per(div_in)
}

addElement()
addElement()
addElement()

persone = document.querySelectorAll(".persone");





// Function Add Absent and Present

btn_save.onclick = () => {

  if(date.value == "") {
    alert("date chould not be empty")
    return
  }

  let dat = date.value;
  persone.forEach(el => {

      let id = el.querySelector(".info_detail #Id").textContent;
      let name = el.querySelector(".info_detail #name").textContent;
      let groupe = el.querySelector(".info_detail #groupe").textContent;
      let input = el.querySelectorAll("label");
      let status = input.forEach(l => {
        if(l.firstEChild.checked == true) {
          return l.value
        }
      })

      console.log(dat,id, name, groupe, status)

      absent_present.push({dat, id, name, groupe, status}) 
  })

  console.log(absent_present)
  saveEtudien(absent_present)
}


// Function Localstorig

    function saveEtudien(presence) {
        localStorage.setItem("presence", JSON.stringify(absent_present))
    }


// function Add_A_P() {
  
// }


