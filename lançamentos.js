const myModal = new bootstrap.Modal(document.getElementById("lançamentos-modal"));

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
   lançamentos: [] 
};



document.getElementById("button-logout").addEventListener("click", logout);


//lançamentos 
document.getElementById("lançamentos-forme").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    if (!data.lançamentos || !Array.isArray(data.lançamentos)) {
        data.lançamentos = [];
    }

    data.lançamentos.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    getlançamentos()  //teste
    
    alert("Lançamentos realizados com sucesso.");
});



checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getlançamentos(); //teste
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}








function getlançamentos() {
    const lançamentos = data.lançamentos;
    let lançamentoshtml = ``;

    if(lançamentos.length) {
        lançamentos.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            lançamentoshtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `
        })
    }

    document.getElementById("list-lançamentos").innerHTML = lançamentoshtml;
}












function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    
}