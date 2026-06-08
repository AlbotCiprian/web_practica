/* ============================================================
   evenimente.js – Logica paginii Evenimente
   - Afișează evenimentele din data.js
   - Toggle „favorit” salvat în localStorage
   - Filtru: toate / doar favorite + contor
   ============================================================ */

const CHEIE_FAV = "lumina_favorite";

// Favoritele sunt un array de id-uri: [1, 4, 6]
let favorite = citesteStocare(CHEIE_FAV, []);

// Filtrul curent: "toate" sau "favorite"
let filtruActiv = "toate";

const elLista = document.getElementById("lista-evenimente");
const elContor = document.getElementById("contor-fav");
const elGol = document.getElementById("fara-evenimente");

/* ---------- 1. Verifică dacă un eveniment e favorit ---------- */
function esteFavorit(id) {
  return favorite.indexOf(id) !== -1;
}

/* ---------- 2. Adaugă/scoate din favorite (toggle) ---------- */
function comutaFavorit(id) {
  if (esteFavorit(id)) {
    favorite = favorite.filter(function (x) { return x !== id; });
  } else {
    favorite.push(id);
  }
  scrieStocare(CHEIE_FAV, favorite); // salvăm imediat
  randeaza();
}

/* ---------- 3. Formatează data în limba română ---------- */
function dataRo(iso) {
  return new Date(iso).toLocaleDateString("ro-RO",
    { weekday: "long", day: "numeric", month: "long" });
}

/* ---------- 4. Randează lista de evenimente ---------- */
function randeaza() {
  // Aplicăm filtrul curent
  let lista = EVENIMENTE.slice().sort(function (a, b) {
    return new Date(a.data) - new Date(b.data); // sortate cronologic
  });
  if (filtruActiv === "favorite") {
    lista = lista.filter(function (e) { return esteFavorit(e.id); });
  }

  // Stare goală (relevantă mai ales la „doar favorite”)
  elGol.style.display = lista.length === 0 ? "block" : "none";

  elLista.innerHTML = lista.map(function (e) {
    const activ = esteFavorit(e.id) ? " activ" : "";
    const etichetaFav = esteFavorit(e.id) ? "♥ Favorit" : "Adaugă la favorite";
    return '' +
      '<article class="eveniment">' +
        '<div class="eveniment__media"><img src="' + e.imagine + '" alt="' + e.titlu + '"></div>' +
        '<div class="eveniment__corp">' +
          '<span class="eveniment__data">' +
            '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>' +
            dataRo(e.data) + ', ' + e.ora +
          '</span>' +
          '<h3 class="eveniment__titlu">' + e.titlu + '</h3>' +
          '<p class="eveniment__desc">' + e.descriere + '</p>' +
          '<button class="fav-btn' + activ + '" data-fav="' + e.id + '" aria-pressed="' + esteFavorit(e.id) + '">' +
            '<svg viewBox="0 0 24 24" fill="' + (esteFavorit(e.id) ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>' +
            '<span>' + etichetaFav + '</span>' +
          '</button>' +
        '</div>' +
      '</article>';
  }).join("");

  // Atașăm evenimentele pe butoanele de favorite
  elLista.querySelectorAll("[data-fav]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      comutaFavorit(parseInt(btn.dataset.fav, 10));
    });
  });

  // Actualizăm contorul de favorite
  const n = favorite.length;
  elContor.textContent = n + (n === 1 ? " eveniment favorit" : " evenimente favorite");
}

/* ---------- 5. Inițializează filtrul ---------- */
function initFiltre() {
  document.querySelectorAll("[data-filtru]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filtruActiv = btn.dataset.filtru;
      document.querySelectorAll("[data-filtru]").forEach(function (b) {
        b.classList.toggle("activ", b === btn);
      });
      randeaza();
    });
  });
}

/* ---------- 6. Pornire ---------- */
document.addEventListener("DOMContentLoaded", function () {
  initFiltre();
  randeaza();
});
