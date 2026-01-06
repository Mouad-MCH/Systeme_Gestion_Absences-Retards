

/*--------------------\
 * DOM variable
\--------------------*/

const ctx = document.getElementById('left-chart');
const cty = document.getElementById('right-chart');
const menu_btn = document.getElementById("menu-toggle");
const nav_a = document.querySelectorAll(".nav-links a");
const out = document.querySelector('.logout')
const logo = document.getElementById("logo");

const absenc = document.querySelector(".absenc");
const rotard = document.querySelector(".rotard");
const presenc = document.querySelector(".presenc")

/*--------------------\
 *  variable
\--------------------*/

let id = "#1767623156278"

/*--------------------\
 * Charts
\--------------------*/

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absence', 'Late'],
      datasets: [{
        label: '# of Votes',
        data: [countPresence(), countAbsences(), countRetard()],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  new Chart(cty, {
    type: 'bar',
    data: {
      labels: ['week1', 'week2', 'week3', 'week4'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


/*--------------------\
 * Sidebar
\--------------------*/

menu_btn.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("w-50")
  const isCollapsed = sidebar.classList.contains("w-15");

  if (isCollapsed) {
    menu_btn.style.rotate = "360deg";
    sidebar.classList.remove("w-15");
    menu_btn.classList.add("right-[-15px]");

    nav_a.forEach(a => a.classList.remove("txt-hid"))
    out.classList.remove("txt-hid");

    logo.classList.remove("hidden");
    
  } else {
    menu_btn.style.rotate = "180deg";
    sidebar.classList.add("w-15");
    logo.classList.add("hidden");
    nav_a.forEach(a => a.classList.add("txt-hid"));

    out.classList.add("txt-hid")

    menu_btn.classList.remove("right-[-15px]");
  }
});


/*--------------------\
 * Functions
\--------------------*/



function getPresence() {
    return JSON.parse(localStorage.getItem("presence")) || [];
}

function getRetard() {
    return JSON.parse(localStorage.getItem("retard")) || [];
}



function getTotalPossible() {
    let total = 0;
    getPresence().forEach(day => {
        total += day.etudient.length;
    });
    return total;
}

function countAbsences() {
    let total = 0;
    getPresence().forEach(day => {
        day.etudient.forEach(std => {
            if (std.status === "absent" && std.id === id) total++;
        });
    });
    return total;
}

function countPresence() {
    let total = 0;
    getPresence().forEach(day => {
        day.etudient.forEach(std => {
            if (std.status === "present" && std.id === id) total++;
        });
    });
    return total;
}

function countRetard() {
  let total = 0;
  getRetard().forEach(day => {
    day.etudient.forEach(e => {
      if(e.id === id) total++
    })
  });

  return total;
}


function tauxAbsence() {
    return getTotalPossible() === 0 ? 0 : (countAbsences() / 30 * 100).toFixed(2);
}
function tauxPresence() {
    return getTotalPossible() === 0 ? 0 : (countPresence() / getTotalPossible() * 100).toFixed(2);
}
function tauxRetard() {
    return getTotalPossible() === 0 ? 0 : (countRetard() / getTotalPossible() * 100).toFixed(2);
}


absenc.querySelector('.value p').textContent = tauxAbsence() + "%";
rotard.querySelector('.value p').textContent = tauxAbsence() + "%";
presenc.querySelector('.value p').textContent = countPresence();
// absenc.querySelector('.value p').textContent = tauxAbsence() + "%";






