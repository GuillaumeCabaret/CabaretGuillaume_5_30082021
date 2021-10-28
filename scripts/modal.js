export function modalSetUp() {
    const modal = document.querySelector(".modal");
    const contactButton = document.querySelector(".button--contact");
    const closeButton = document.querySelector(".modal__close");

    contactButton.addEventListener("click", () => {
        modal.style.display = "block";
        document.getElementById("prenom").focus();
    })
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        contactButton.focus();
    })
}

const firstName = document.getElementById("prenom");
const lastName = document.getElementById("nom");
const email = document.getElementById("mail");
const messsage = document.getElementById("message");
const form = document.querySelector('.modal__form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    lastName.style.border = "none";
    firstName.style.border = "none";
    messsage.style.border = "none";
    email.style.border = "none";
    if (textValidation()) {
        alert("Message envoyé.");
        console.log(`
        Prenom: ${firstName.value}
        Nom: ${lastName.value}
        Email: ${email.value}
        Message: ${messsage.value}
        `);
        document.querySelector(".modal").style.display = "none";
        lastName.value = "";
        firstName.value = "";
        email.value = "";
        messsage.value = "";
    }

})

function textValidation() {
    let validation = 0;
    if (lastName.value.length < 2 || /^[a-zA-Z]+$/.test(lastName.value) == false) {
        lastName.style.border = "2px solid red";
        validation += 1;
    }
    if (firstName.value.length < 2 || /^[a-zA-Z]+$/.test(firstName.value) == false) {
        firstName.style.border = "2px solid red";
        validation += 1;
    }
    if (messsage.value.length < 2 || /^[a-zA-Z]+$/.test(messsage.value) == false) {
        messsage.style.border = "2px solid red";
        validation += 1;
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email.value) == false) {
        email.style.border = "2px solid red";
        validation += 1;
    }
    if (validation != 0) {
        return false;
    }
    return true
}