const myModal = new bootstrap.Modal("#registro-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();


//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("emailcreate").value;
    const password = document.getElementById("passwordcreate").value;
    const check = document.getElementById("checkcreate").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique seu usuário ou senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique seu usuário ou senha.");
            return;
        }

        saveSession(email, check);

        window.location.href = "home.html";
    }
});





//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Escolha um email válido.");
        return;
    }

    if(password.length < 4) {
        alert("Senha mínima, 4 digitos!");
        return;
    }

    saveAccount({
        login: email,
        password: password,
       lançamentos: {}
    })

    myModal.hide();
    alert("Conta criada com sucesso.");
});


function checkLogged() {
    if(session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}


function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}