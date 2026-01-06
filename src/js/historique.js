
/*---------------------- *\
 * - DOM Variables
\* --------------------- */



/*---------------------- *\
 * - Variables
\* --------------------- */

// let presence = [
//     {
//         date: "2025/02/01",
//         etudient: [
//             {id:1, name:"mouad", groupe: "Group 1", status: "absent",},
//             {id:2, name:"fathi", groupe: "Group 3", status: "retard",},
//             {id:3, name:"adam", groupe: "Group 2", status: "present",}
//         ]
//     }
// ];
// console.log(presence);

// let retard = [
//     {
//         date: "2025/02/01",
//         etudient: [
//             {id:2, name:"fathi", heure: "20:05", motif: "dkn,skldc"}
//         ]
//     }
// ];


let presence = JSON.parse(localStorage.getItem("presence")) || [];
let retard = JSON.parse(localStorage.getItem("retard")) || [];



/*---------------------- *\
 * - Fetch API
\* --------------------- */



/*---------------------- *\
 * - Function
\* --------------------- */

        // const attendanceData = [
        //     {
        //         id: 1,
        //         date: "Lundi 15 Décembre 2025",
        //         absents: 1,
        //         retards: 5,
        //         presents: 45,
        //         details: {
        //             absents: [
        //                 {
        //                     id: 101,
        //                     name: "Mouad CHARADI",
        //                     initials: "MC",
        //                     color: "orange",
        //                     groupe: "Groupe 4",
        //                     studentId: "#001"
        //                 }
        //             ],
        //             retards: [
        //                 {
        //                     id: 102,
        //                     name: "Mouad CHARADI",
        //                     initials: "MC",
        //                     color: "purple",
        //                     groupe: "Groupe 4",
        //                     studentId: "#001",
        //                     duration: "30 min retard"
        //                 },
        //                 {
        //                     id: 103,
        //                     name: "Fathi Iaghres",
        //                     initials: "FL",
        //                     color: "green",
        //                     groupe: "Groupe 4",
        //                     studentId: "#001",
        //                     duration: "15 min retard"
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         id: 2,
        //         date: "Mardi 16 Décembre 2025",
        //         absents: 2,
        //         retards: 3,
        //         presents: 45,
        //         details: {
        //             absents: [
        //                 {
        //                     id: 201,
        //                     name: "Ahmed MEDINA",
        //                     initials: "AM",
        //                     color: "orange",
        //                     groupe: "Groupe 2",
        //                     studentId: "#005"
        //                 },
        //                 {
        //                     id: 202,
        //                     name: "Rania SOUFI",
        //                     initials: "RS",
        //                     color: "orange",
        //                     groupe: "Groupe 3",
        //                     studentId: "#008"
        //                 }
        //             ],
        //             retards: [
        //                 {
        //                     id: 203,
        //                     name: "Sara AHMED",
        //                     initials: "SA",
        //                     color: "purple",
        //                     groupe: "Groupe 1",
        //                     studentId: "#003",
        //                     duration: "20 min retard"
        //                 },
        //                 {
        //                     id: 204,
        //                     name: "Omar KARIM",
        //                     initials: "OK",
        //                     color: "green",
        //                     groupe: "Groupe 2",
        //                     studentId: "#004",
        //                     duration: "10 min retard"
        //                 },
        //                 {
        //                     id: 205,
        //                     name: "Laila HASSAN",
        //                     initials: "LH",
        //                     color: "purple",
        //                     groupe: "Groupe 4",
        //                     studentId: "#009",
        //                     duration: "25 min retard"
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         id: 3,
        //         date: "Mercredi 17 Décembre 2025",
        //         absents: 0,
        //         retards: 2,
        //         presents: 50,
        //         details: {
        //             absents: [],
        //             retards: [
        //                 {
        //                     id: 301,
        //                     name: "Mohamed ALI",
        //                     initials: "MA",
        //                     color: "green",
        //                     groupe: "Groupe 1",
        //                     studentId: "#002",
        //                     duration: "5 min retard"
        //                 },
        //                 {
        //                     id: 302,
        //                     name: "Fatima NOUR",
        //                     initials: "FN",
        //                     color: "purple",
        //                     groupe: "Groupe 3",
        //                     studentId: "#007",
        //                     duration: "15 min retard"
        //                 }
        //             ]
        //         }
        //     }
        // ];

 
// presence[] + retard[]  ==>  attendanceData[]


function initialsFromName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorByStatus(status) {
  if (status === "absent") return "orange";
  if (status === "retard") return "purple";
  return "green";
}

function formatDateFR(dateStr) {
  return dateStr.replaceAll("/", "-");
}

function buildAttendanceData(presence = [], retard = []) {
  const retardByDateId = new Map();
  retard.forEach((rDay) => {
    const dateKey = formatDateFR(rDay.dat);
    (rDay.etudient || []).forEach((s) => {
      retardByDateId.set(`${dateKey}__${s.id}`, s);
    });
  });

  return presence.map((pDay, index) => {
    const dateKey = formatDateFR(pDay.dat);

    const absents = [];
    const retards = [];
    let presentsCount = 0;

    (pDay.etudient || []).forEach((s) => {
      const base = {
        id: s.id,
        name: s.name,
        initials: initialsFromName(s.name),
        color: colorByStatus(s.status),
        groupe: s.groupe,
        studentId: `#${String(s.id).padStart(3, "0")}`,
      };

      if (s.status === "absent") {
        absents.push(base);
      } else if (s.status === "retard") {
        const lateInfo = retardByDateId.get(`${dateKey}__${s.id}`);
        retards.push({
          ...base,
          // your old UI expects duration text; we build it from retard DB
          duration: lateInfo
            ? `${lateInfo.heure || ""}${lateInfo.motif ? " - " + lateInfo.motif : ""}`.trim()
            : "Retard",
        });
      } else if (s.status === "present") {
        presentsCount += 1;
      }
    });

    return {
      id: index + 1,
      date: dateKey, // you can format however your UI wants
      absents: absents.length,
      retards: retards.length,
      presents: presentsCount,
      details: {
        absents,
        retards,
      },
    };
  });
}

let attendanceData = buildAttendanceData(presence, retard);;



        // ============================================
        // 🎯 VARIABLES GLOBALES
        // ============================================
        let currentAttendance = null ;
        let filteredData = [...attendanceData];

        // ============================================
        // 📱 INITIALISATION
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            renderHistorique();
            setupEventListeners();
        });

        // ============================================
        // 🎨 RENDU - ÉCRAN HISTORIQUE
        // ============================================
        function renderHistorique() {
            const container = document.getElementById('cardsContainer');
            container.innerHTML = '';

            filteredData.forEach((item) => {
                const card = createCardElement(item);
                container.appendChild(card);
            });
        }

        function createCardElement(item) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="calendar-icon">📅</div>
                    <div class="card-date">${item.date}</div>
                </div>
                
                <div class="card-stats">
                    <div class="stat-item">
                        <span class="stat-label">Absents</span>
                        <span class="stat-value">${item.absents}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Retards</span>
                        <span class="stat-value">${item.retards}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Présents</span>
                        <span class="stat-value">${item.presents}</span>
                    </div>
                </div>

                <button class="btn-details">
                    <span>👁️</span>
                    Voir détails
                </button>
            `;

            card.addEventListener('click', () => showDetails(item));
            return card;
        }

        // ============================================
        // 🎨 RENDU - ÉCRAN DÉTAILS
        // ============================================
        function showDetails(item) {
            currentAttendance = item;
            
            // Mettre à jour le titre
            document.getElementById('detailsTitle').textContent = `Détails - ${item.date}`;

            // Afficher/masquer les sections
            renderAbsentSection(item.details.absents);
            renderRetardSection(item.details.retards);

            // Basculer les écrans
            toggleScreen('details');
        }

        function renderAbsentSection(absents) {
            const section = document.getElementById('absentSection');
            const list = document.getElementById('absentList');
            const count = document.getElementById('absentCount');

            count.textContent = `(${absents.length})`;

            if (absents.length === 0) {
                section.style.display = 'none';
                return;
            }

            section.style.display = 'block';
            list.innerHTML = '';

            absents.forEach(person => {
                const item = createPersonElement(person, 'absent');
                list.appendChild(item);
            });
        }

        function renderRetardSection(retards) {
            const section = document.getElementById('retardSection');
            const list = document.getElementById('retardList');
            const count = document.getElementById('retardCount');

            count.textContent = `(${retards.length})`;

            if (retards.length === 0) {
                section.style.display = 'none';
                return;
            }

            section.style.display = 'block';
            list.innerHTML = '';

            retards.forEach(person => {
                const item = createPersonElement(person, 'retard');
                list.appendChild(item);
            });
        }

        function createPersonElement(person, type) {
            const item = document.createElement('div');
            item.className = 'person-item';

            const statusText = type === 'absent' ? 'Absent' : person.duration;
            const statusClass = type === 'absent' ? 'absent' : 'retard';

            item.innerHTML = `
                <div class="avatar ${person.color}">${person.initials}</div>
                <div class="person-info">
                    <div class="person-name">${person.name}</div>
                    <div class="person-details">${person.groupe} . ID: ${person.studentId}</div>
                </div>
                <div class="status-badge ${statusClass}">${statusText}</div>
            `;

            item.addEventListener('click', () => {
                console.log(`📌 Cliqué sur: ${person.name}`);
                alert(`Informations: ${person.name}\n${person.groupe}\nID: ${person.studentId}`);
            });

            return item;
        }

        // ============================================
        // 🔍 RECHERCHE
        // ============================================
        function setupEventListeners() {
            const searchInput = document.getElementById('searchInput');
            const backButton = document.getElementById('backButton');

            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                filterCards(term);
            });

            backButton.addEventListener('click', goBack);
        }

        function filterCards(term) {
            if (term === '') {
                filteredData = [...attendanceData];
            } else {
                filteredData = attendanceData.filter(item => 
                    item.date.toLowerCase().includes(term)
                );
            }
            renderHistorique();
        }

        // ============================================
        // 🔄 NAVIGATION
        // ============================================
        function toggleScreen(screen) {
            document.getElementById('historique-screen').style.display = 
                screen === 'historique' ? 'block' : 'none';
            document.getElementById('details-screen').style.display = 
                screen === 'details' ? 'block' : 'none';
        }

        function goBack() {
            toggleScreen('historique');
            currentAttendance = null;
        }

        // ============================================
        // 📊 FONCTIONS UTILITAIRES
        // ============================================
        function getStatistics() {
            const stats = {
                totalAbsents: attendanceData.reduce((sum, item) => sum + item.absents, 0),
                totalRetards: attendanceData.reduce((sum, item) => sum + item.retards, 0),
                totalPresents: attendanceData.reduce((sum, item) => sum + item.presents, 0),
                totalDays: attendanceData.length
            };
            console.log('📊 Statistiques:', stats);
            return stats;
        }

        // Afficher les stats au démarrage
        console.log('✅ Application chargée!');
        getStatistics();