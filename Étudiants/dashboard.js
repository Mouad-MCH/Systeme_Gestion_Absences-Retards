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









    function getRetards() {
        return JSON.parse(localStorage.getItem("retard")) || [];
    }

    function calculateRetardCount() {
        let raw = getRetards();
        let map = {};
        raw.forEach(day => {
            day.etudient.forEach(std => {
                if (!map[std.id]) {
                    map[std.id] = { name: std.name, count: 0 };
                }
                map[std.id].count++;
            });
        });

        return Object.values(map);
    }

    function showTopRetard(data = calculateRetardCount()) {
        let table = document.getElementById("tableRetard");
        table.innerHTML = "";

        let topThree = data.sort((a, b) => b.count - a.count).slice(0, 3);

        topThree.forEach((st, id) => {
            table.innerHTML += `
        <tr class="text-white">
          <td class="border-b border-[#020C48] px-4 py-2">${id + 1}</td>
          <td class="border-b border-[#020C48] px-4 py-2">${st.name}</td>
          <td class="border-b border-[#020C48] px-4 py-2">${st.count}</td>
        </tr>
      `;
        });
    }

    showTopRetard();






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
                if (std.status === "absent") total++;
            });
        });
        return total;
    }

    function countPresence() {
        let total = 0;
        getPresence().forEach(day => {
            day.etudient.forEach(std => {
                if (std.status === "present") total++;
            });
        });
        return total;
    }

    function countRetard() {
        let total = 0;
        getRetard().forEach(day => {
            total += day.etudient.length;
        });
        return total;
    }

    function tauxAbsence() {
        return getTotalPossible() === 0 ? 0 : (countAbsences() / getTotalPossible() * 100).toFixed(2);
    }
    function tauxPresence() {
        return getTotalPossible() === 0 ? 0 : (countPresence() / getTotalPossible() * 100).toFixed(2);
    }
    function tauxRetard() {
        return getTotalPossible() === 0 ? 0 : (countRetard() / getTotalPossible() * 100).toFixed(2);
    }

    document.getElementById('absence').textContent = tauxAbsence() + '%';
    document.getElementById('presence').textContent = tauxPresence() + '%';
    document.getElementById('retard').textContent = tauxRetard() + '%';


});
