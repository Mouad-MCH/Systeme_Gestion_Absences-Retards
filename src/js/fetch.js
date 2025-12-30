

/*---------------------- *\
 * - Fetch API
\* --------------------- */

// -------- sidebar & navbar ----------//

async function fetch_Sidebar_navbar() {
  const res = await fetch("../../index.html")
  let html = await res.text()
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  if(window.location.pathname.includes("/historique.html")){
    const li_H = doc.querySelectorAll(".sidebar .list li a")[3];
    const li_P = doc.querySelectorAll(".sidebar .list li a")[2];
    li_H.classList.add("bg-sky-800");
    li_P.classList.remove("bg-sky-800");
  }
  
  const sidbar = doc.querySelector(".sidebar");
  const navbar = doc.querySelector(".navbar")
  document.querySelector(".global").prepend(sidbar);
  document.querySelector(".content").prepend(navbar);
}

fetch_Sidebar_navbar()