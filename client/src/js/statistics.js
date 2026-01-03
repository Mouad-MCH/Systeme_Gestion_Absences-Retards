
const ctx = document.getElementById('myChart');
const menu_btn = document.getElementById("menu-toggle");
const nav_a = document.querySelectorAll(".nav-links a");

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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



menu_btn.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("w-50")
  const isCollapsed = sidebar.classList.contains("w-15");

  if (isCollapsed) {
    menu_btn.style.rotate = "360deg";
    sidebar.classList.remove("w-15");
    menu_btn.classList.add("right-[-15px]");

    nav_a.forEach(a => a.classList.remove("txt-hid"))
    
  } else {
    menu_btn.style.rotate = "180deg";
    sidebar.classList.add("w-15");
    nav_a.forEach(a => a.innerHTML.classList.add("txt-hid"))
    menu_btn.classList.remove("right-[-15px]")
  }
});