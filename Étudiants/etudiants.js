document.addEventListener('DOMContentLoaded', () => {
    const openModel = document.getElementById('btnAddEtudiant')
    const closModel = document.getElementById('closModel')
    const model = document.getElementById('modal')
    const modalEdite = document.getElementById('modalEdite');


    openModel.addEventListener('click', () => {
        model.classList.remove('hidden')
    })

    closModel.addEventListener('click', () => {
        model.classList.add("hidden")
    })



    function saveEtudien(etudien) {
        localStorage.setItem("etudien", JSON.stringify(etudien))
    }

    function showEtudien() {
        return JSON.parse(localStorage.getItem("etudien")) || []
    }

    function addEtudien(e) {
        e.preventDefault();
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let group = document.getElementById('group').value
        let statut = document.getElementById('statut').value




        if (!name || !email || !group || !statut) {
            let nom = document.getElementById("errnom")
            nom.textContent = "Veuillez saisir les informaions correctes"
            return
        }

        let etudien = showEtudien()

        let newEtudien = {
            id: Date.now(),
            name,
            email,
            group,
            statut
        }

        etudien.push(newEtudien)
        saveEtudien(etudien)

        document.getElementById("formEtudian").reset();
        model.classList.add("hidden");
        desplayEtudien()
        totalEtudian()
        activeEtudiant()
        inactifsEtudian()
    }


    function desplayEtudien(data = showEtudien()) {
        let table = document.getElementById('tableEtidiant')
        table.innerHTML = ""

        data.forEach(et => {

            let statutClass = "";
            if (et.statut === "Actifs") {
                statutClass = "bg-lime-300 text-green-600 px-3 py-1 rounded-lg";
            } else if (et.statut === "Inactifs") {
                statutClass = "bg-red-300 text-red-700 px-3 py-1 rounded-lg";
            }

            table.innerHTML += `
        <tr data-id="${et.id}" class="text-white">
                  <td class="border-b border-[#020C48]  px-4 py-2 flex items-center gap-3">
                  <span class="bg-blue-400 w-10 h-10 text-center  text-3xl p font-bold  rounded-lg">${et.name[0]}</span>
                  ${et.name}
                  </td>
                  <td class="border-b border-[#020C48] px-4 py-2">${et.email}</td>
                  <td class="border-b border-[#020C48] px-4 py-2">${et.group}</td>
                  <td class="border-b border-[#020C48] px-4 py-2"><span class="${statutClass}">${et.statut}</span></td>
                  <td class="border-b border-[#020C48] px-4 py-2">
                    <button onclick="editRow(this)" type="hidden"  class="ml-4"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i></button>
                    <button onclick="deleteRow(this)" class="ml-4"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
                  </td>
                </tr>
        `
        });
    }


    document.getElementById("formEtudian").addEventListener('submit', addEtudien)

    desplayEtudien()






    function totalEtudian() {
        let totalEtudian = document.getElementById('totalEtudian');
        let etudiens = showEtudien();
        totalEtudian.textContent = etudiens.length;
    }
    totalEtudian()

    function activeEtudiant() {
        let activeEtudiant = document.getElementById('activeEtudiant')
        let etudien = showEtudien()
        let activeCount = etudien.filter(et => et.statut === "Actifs").length;
        activeEtudiant.textContent = activeCount;

    }
    activeEtudiant()

    function inactifsEtudian() {
        let inactifsEtudian = document.getElementById('inactifsEtudian')
        let etudien = showEtudien()
        let activeCount = etudien.filter(et => et.statut === "inactifs").length;
        inactifsEtudian.textContent = activeCount;

    }
    inactifsEtudian()


    function btnSearch() {
        let btnSearch = document.getElementById('btnSearch').value.toLowerCase()
        let etudien = showEtudien()

        let search = etudien.filter(et => et.name.toLowerCase().includes(btnSearch))

        desplayEtudien(search)
    }

    document.getElementById("btnSearch")
        .addEventListener("input", btnSearch);


    window.deleteRow = function (btn) {
        const row = btn.closest("tr");
        const id = row.dataset.id;

        let students = showEtudien();
        students = students.filter(st => st.id != id);

        saveEtudien(students);
        row.remove();

        totalEtudian();
        activeEtudiant();
        inactifsEtudian();
    };




    window.editRow = function (btn) {
        const row = btn.closest("tr");
        const id = row.dataset.id;
        let etudiens = showEtudien();
        let et = etudiens.find(e => e.id == id);

        document.getElementById("editName").value = et.name;
        document.getElementById("editEmail").value = et.email;
        document.getElementById("editGroup").value = et.group;
        document.getElementById("editStatut").value = et.statut;
        document.getElementById("editHiddenId").value = id;


        modalEdite.classList.remove("hidden");
    };

    function saveEdite(e) {
        e.preventDefault()

        let id = document.getElementById("editHiddenId").value;
        let name = document.getElementById('editName').value;
        let email = document.getElementById('editEmail').value;
        let group = document.getElementById('editGroup').value;
        let statut = document.getElementById('editStatut').value;


        if (!name || !email || !group || !statut) {
            let erredit = document.getElementById("erredit")
            erredit.textContent = "Veuillez saisir les informaions correctes"
            return
        }

        let editStudent = showEtudien()
        let editet = editStudent.findIndex(et => et.id == id);

        editStudent[editet] = { id, name, email, group, statut };
        saveEtudien(editStudent);

        modalEdite.classList.add("hidden");
        desplayEtudien();
        totalEtudian();
        activeEtudiant();
        inactifsEtudian();
    }

    document.getElementById("formEditEtudiant").addEventListener("submit", saveEdite);

    document.getElementById("closeEditModal").addEventListener("click", () => {
        modalEdite.classList.add("hidden");
    });

})