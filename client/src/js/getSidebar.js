

/*---------------------- *\
 * - Fetch API
\* --------------------- */

// -------- sidebar & navbar ----------//

async function fetch_Sidebar_navbar() {
  const res = await fetch("../../html/Sidebar.html");
  const html = await res.text();

  console.log(html)
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  let sidebar = doc.querySelector(".sidebar");
  console.log('hello')

  document.body.prepend(sidebar)

}

fetch_Sidebar_navbar()