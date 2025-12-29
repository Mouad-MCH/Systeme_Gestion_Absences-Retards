document.addEventListener("DOMContentLoaded", () => {

  function getPresence() {
    return JSON.parse(localStorage.getItem("presence")) || [];
  }

  function calculateAbsences() {
    let raw = getPresence();
    let map = {};

    raw.forEach(day => {
      day.etudient.forEach(std => {
        if (!map[std.id]) {
          map[std.id] = { name: std.name, absences: 0 };
        }
        if (std.status === "absent") {
          map[std.id].absences++;
        }
      });
    });

    return Object.values(map);
  }

  function showTopAbsent(data = calculateAbsences()) {
    let tableAbsens = document.getElementById("tableAbsens");
    tableAbsens.innerHTML = "";

    let topThree = data.sort((a, b) => b.absences - a.absences).slice(0, 3);

    topThree.forEach((ab, id) => {
      tableAbsens.innerHTML += `
        <tr class="text-white">
          <td class="border-b border-[#020C48] px-4 py-2">${id + 1}</td>
          <td class="border-b border-[#020C48] px-4 py-2">${ab.name}</td>
          <td class="border-b border-[#020C48] px-4 py-2">${ab.absences}</td>
        </tr>
      `;
    });
  }

  showTopAbsent();



  
});
