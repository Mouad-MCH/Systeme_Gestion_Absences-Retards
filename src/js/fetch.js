

/*---------------------- *\
 * - Fetch API
\* --------------------- */

// -------- sidebar & navbar ----------//

async function fetch_Sidebar_navbar() {
  const res = await fetch("../../index.html")
  let html = await res.text()
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const sidbar = doc.querySelector(".sidebar");
  const navbar = doc.querySelector(".navbar")
  document.querySelector(".global").prepend(sidbar);
  document.querySelector(".content").prepend(navbar);
}

fetch_Sidebar_navbar()