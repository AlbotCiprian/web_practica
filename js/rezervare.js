/* ============================================================
   rezervare.js – Validarea formularului de rezervare
   Validările sunt făcute în JavaScript (nu doar prin atributul HTML
   „required”), cu mesaje de eroare clare, sub fiecare câmp.
   ============================================================ */

const formRez = document.getElementById("form-rezervare");

/* ---------- Funcții ajutătoare pentru afișarea erorilor ---------- */
// Marchează un câmp ca invalid și afișează mesajul de eroare
function seteazaEroare(idCamp, idEroare, mesaj) {
  document.getElementById(idCamp).closest(".camp").classList.add("invalid");
  document.getElementById(idEroare).textContent = mesaj;
}
// Curăță eroarea unui câmp
function curataEroare(idCamp, idEroare) {
  document.getElementById(idCamp).closest(".camp").classList.remove("invalid");
  document.getElementById(idEroare).textContent = "";
}

/* ---------- Validarea propriu-zisă ---------- */
function valideazaRezervare() {
  let valid = true;

  const nume = document.getElementById("nume").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const persoane = document.getElementById("persoane").value.trim();
  const data = document.getElementById("data").value;
  const ora = document.getElementById("ora").value;

  // 1. Nume – minim 2 caractere
  if (nume.length < 2) {
    seteazaEroare("nume", "err-nume", "Numele trebuie să aibă cel puțin 2 caractere.");
    valid = false;
  } else {
    curataEroare("nume", "err-nume");
  }

  // 2. Email – format valid (regex simplu, dar corect)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    seteazaEroare("email", "err-email", "Introdu o adresă de email validă.");
    valid = false;
  } else {
    curataEroare("email", "err-email");
  }

  // 3. Telefon – doar cifre/spații/+, minim 10 cifre
  const doarCifre = telefon.replace(/[\s\-+()]/g, "");
  if (!/^\d+$/.test(doarCifre) || doarCifre.length < 10) {
    seteazaEroare("telefon", "err-telefon", "Introdu un număr de telefon valid (minim 10 cifre).");
    valid = false;
  } else {
    curataEroare("telefon", "err-telefon");
  }

  // 4. Număr de persoane – între 1 și 12
  const nrPers = parseInt(persoane, 10);
  if (isNaN(nrPers) || nrPers < 1 || nrPers > 12) {
    seteazaEroare("persoane", "err-persoane", "Numărul de persoane trebuie să fie între 1 și 12.");
    valid = false;
  } else {
    curataEroare("persoane", "err-persoane");
  }

  // 5. Data – obligatorie și să nu fie în trecut
  if (!data) {
    seteazaEroare("data", "err-data", "Alege o dată pentru rezervare.");
    valid = false;
  } else {
    const aleasa = new Date(data);
    const azi = new Date(); azi.setHours(0, 0, 0, 0);
    if (aleasa < azi) {
      seteazaEroare("data", "err-data", "Data nu poate fi în trecut.");
      valid = false;
    } else {
      curataEroare("data", "err-data");
    }
  }

  // 6. Ora – obligatorie
  if (!ora) {
    seteazaEroare("ora", "err-ora", "Alege o oră.");
    valid = false;
  } else {
    curataEroare("ora", "err-ora");
  }

  return valid;
}

/* ---------- Tratarea submit-ului ---------- */
formRez.addEventListener("submit", function (e) {
  e.preventDefault(); // nu există backend – oprim trimiterea reală

  if (valideazaRezervare()) {
    // Opțional: salvăm rezervarea în localStorage (istoric demo)
    const rezervare = {
      nume: document.getElementById("nume").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefon: document.getElementById("telefon").value.trim(),
      persoane: document.getElementById("persoane").value.trim(),
      data: document.getElementById("data").value,
      ora: document.getElementById("ora").value,
      mesaj: document.getElementById("mesaj").value.trim(),
    };
    const rezervari = citesteStocare("lumina_rezervari", []);
    rezervari.push(rezervare);
    scrieStocare("lumina_rezervari", rezervari);

    // Afișăm mesajul de succes și resetăm formularul
    const succes = document.getElementById("succes");
    succes.classList.add("vizibil");
    formRez.reset();
    succes.scrollIntoView({ behavior: "smooth", block: "center" });

    // Ascundem mesajul după câteva secunde
    setTimeout(function () { succes.classList.remove("vizibil"); }, 5000);
  }
});

/* ---------- Setări inițiale utile ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // Nu permitem selectarea unei date din trecut nici din interfață
  const azi = new Date().toISOString().split("T")[0];
  document.getElementById("data").setAttribute("min", azi);
});
