/* ============================================================
   contact.js – Validarea formularului de contact
   Validări în JavaScript, cu mesaje de eroare sub fiecare câmp.
   ============================================================ */

const formContact = document.getElementById("form-contact");

// Marchează un câmp ca invalid + mesaj
function setEroare(idCamp, idEroare, mesaj) {
  document.getElementById(idCamp).closest(".camp").classList.add("invalid");
  document.getElementById(idEroare).textContent = mesaj;
}
// Curăță eroarea unui câmp
function clrEroare(idCamp, idEroare) {
  document.getElementById(idCamp).closest(".camp").classList.remove("invalid");
  document.getElementById(idEroare).textContent = "";
}

/* ---------- Validarea câmpurilor ---------- */
function valideazaContact() {
  let valid = true;

  const nume = document.getElementById("nume").value.trim();
  const email = document.getElementById("email").value.trim();
  const subiect = document.getElementById("subiect").value.trim();
  const mesaj = document.getElementById("mesaj").value.trim();

  // 1. Nume – minim 2 caractere
  if (nume.length < 2) {
    setEroare("nume", "err-nume", "Numele trebuie să aibă cel puțin 2 caractere.");
    valid = false;
  } else { clrEroare("nume", "err-nume"); }

  // 2. Email – format valid
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    setEroare("email", "err-email", "Introdu o adresă de email validă.");
    valid = false;
  } else { clrEroare("email", "err-email"); }

  // 3. Subiect – minim 3 caractere
  if (subiect.length < 3) {
    setEroare("subiect", "err-subiect", "Adaugă un subiect (minim 3 caractere).");
    valid = false;
  } else { clrEroare("subiect", "err-subiect"); }

  // 4. Mesaj – minim 10 caractere
  if (mesaj.length < 10) {
    setEroare("mesaj", "err-mesaj", "Mesajul trebuie să aibă cel puțin 10 caractere.");
    valid = false;
  } else { clrEroare("mesaj", "err-mesaj"); }

  return valid;
}

/* ---------- Tratarea submit-ului ---------- */
formContact.addEventListener("submit", function (e) {
  e.preventDefault(); // fără backend

  if (valideazaContact()) {
    const succes = document.getElementById("succes");
    succes.classList.add("vizibil");
    formContact.reset();
    succes.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(function () { succes.classList.remove("vizibil"); }, 5000);
  }
});
