/* ============================================================
   meniu.js – Logica paginii Meniu
   - Afișează produsele din data.js
   - Filtrare pe categorii + căutare live (combinate)
   - Coș demo cu cantități, total automat și persistență în localStorage
   ============================================================ */

// Cheia sub care salvăm coșul în localStorage
const CHEIE_COS = "lumina_cos";

// Starea curentă a filtrelor (categoria selectată + textul căutat)
let categorieActiva = "Toate";
let textCautare = "";

// Coșul este un obiect: { idProdus: cantitate, ... }
let cos = citesteStocare(CHEIE_COS, {});

// Referințe către elementele din pagină
const elLista = document.getElementById("lista-produse");
const elFiltre = document.getElementById("filtre");
const elCautare = document.getElementById("cautare");
const elFaraRez = document.getElementById("fara-rezultate");
const elCosLista = document.getElementById("cos-lista");
const elCosTotal = document.getElementById("cos-total");
const elCosNumar = document.getElementById("cos-numar");

/* ---------- 1. Construiește butoanele de filtrare ---------- */
function construiesteFiltre() {
  // Extragem categoriile unice din produse și adăugăm „Toate” la început
  const categorii = ["Toate"];
  PRODUSE.forEach(function (p) {
    if (categorii.indexOf(p.categorie) === -1) categorii.push(p.categorie);
  });

  elFiltre.innerHTML = categorii.map(function (cat) {
    const activ = cat === categorieActiva ? " activ" : "";
    return '<button class="filtru-btn' + activ + '" data-cat="' + cat + '">' + cat + '</button>';
  }).join("");

  // La click pe un filtru, actualizăm categoria activă și redesenăm
  elFiltre.querySelectorAll(".filtru-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      categorieActiva = btn.dataset.cat;
      // Marcăm vizual butonul activ
      elFiltre.querySelectorAll(".filtru-btn").forEach(function (b) {
        b.classList.toggle("activ", b === btn);
      });
      randeazaProduse();
    });
  });
}

/* ---------- 2. Filtrare + căutare combinate ---------- */
function produseFiltrate() {
  return PRODUSE.filter(function (p) {
    // Condiția de categorie: „Toate” trece tot
    const okCategorie = categorieActiva === "Toate" || p.categorie === categorieActiva;
    // Condiția de căutare: numele conține textul (case-insensitive)
    const okCautare = p.nume.toLowerCase().indexOf(textCautare.toLowerCase()) !== -1;
    return okCategorie && okCautare;
  });
}

/* ---------- 3. Randează lista de produse ---------- */
function randeazaProduse() {
  const lista = produseFiltrate();

  // Stare goală: niciun rezultat
  elFaraRez.style.display = lista.length === 0 ? "block" : "none";

  elLista.innerHTML = lista.map(function (p) {
    return '' +
      '<article class="produs">' +
        '<div class="produs__media"><img src="' + p.imagine + '" alt="' + p.nume + '" loading="lazy"></div>' +
        '<div class="produs__corp">' +
          '<span class="badge">' + p.categorie + '</span>' +
          '<div class="produs__cap">' +
            '<h3 class="produs__nume">' + p.nume + '</h3>' +
            '<span class="produs__pret">' + p.pret + ' lei</span>' +
          '</div>' +
          '<p class="produs__desc">' + p.descriere + '</p>' +
          '<button class="btn btn--principal btn--mic" data-add="' + p.id + '">Adaugă în comandă</button>' +
        '</div>' +
      '</article>';
  }).join("");

  // Atașăm evenimentele pe butoanele „Adaugă în comandă”
  elLista.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      adaugaInCos(parseInt(btn.dataset.add, 10));
    });
  });
}

/* ---------- 4. Operații pe coș ---------- */
// Găsește un produs după id
function gasesteProdus(id) {
  return PRODUSE.find(function (p) { return p.id === id; });
}

function adaugaInCos(id) {
  cos[id] = (cos[id] || 0) + 1;
  salveazaSiRandeaza();
  afiseazaToast(gasesteProdus(id).nume + " adăugat în comandă");
}

function modificaCantitate(id, delta) {
  cos[id] = (cos[id] || 0) + delta;
  if (cos[id] <= 0) delete cos[id]; // scoatem produsul dacă ajunge la 0
  salveazaSiRandeaza();
}

function stergeDinCos(id) {
  delete cos[id];
  salveazaSiRandeaza();
}

// Golește complet coșul
function goleșteCos() {
  cos = {};
  salveazaSiRandeaza();
}

/* ---------- 5. Randează coșul + calculează totalul ---------- */
function randeazaCos() {
  const idsuri = Object.keys(cos);

  // Stare goală frumoasă
  if (idsuri.length === 0) {
    elCosLista.innerHTML =
      '<div class="stare-goala">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12.5a2 2 0 0 0 2 1.5h7a2 2 0 0 0 2-1.5L21 7H6"/></svg>' +
        '<p>Coșul tău e gol.<br>Adaugă câteva bunătăți din meniu.</p>' +
      '</div>';
    elCosTotal.textContent = "0 lei";
    elCosNumar.textContent = "0";
    return;
  }

  let total = 0;        // suma totală
  let bucatiTotale = 0; // numărul total de produse

  elCosLista.innerHTML = idsuri.map(function (idStr) {
    const id = parseInt(idStr, 10);
    const produs = gasesteProdus(id);
    const cant = cos[idStr];
    const subtotal = produs.pret * cant; // preț × cantitate
    total += subtotal;
    bucatiTotale += cant;

    return '' +
      '<div class="cos-item">' +
        '<div>' +
          '<div class="cos-item__nume">' + produs.nume + '</div>' +
          '<button class="cos-item__sterge" data-sterge="' + id + '">șterge</button>' +
        '</div>' +
        '<div style="text-align:right;">' +
          '<div class="cos-item__controale">' +
            '<button class="cantitate-btn" data-minus="' + id + '" aria-label="Scade cantitatea">−</button>' +
            '<span class="cos-item__cant">' + cant + '</span>' +
            '<button class="cantitate-btn" data-plus="' + id + '" aria-label="Crește cantitatea">+</button>' +
          '</div>' +
          '<div class="cos-item__pret">' + subtotal + ' lei</div>' +
        '</div>' +
      '</div>';
  }).join("");

  elCosTotal.textContent = total + " lei";
  elCosNumar.textContent = bucatiTotale;

  // Atașăm evenimentele pe butoanele din coș
  elCosLista.querySelectorAll("[data-plus]").forEach(function (b) {
    b.addEventListener("click", function () { modificaCantitate(parseInt(b.dataset.plus, 10), 1); });
  });
  elCosLista.querySelectorAll("[data-minus]").forEach(function (b) {
    b.addEventListener("click", function () { modificaCantitate(parseInt(b.dataset.minus, 10), -1); });
  });
  elCosLista.querySelectorAll("[data-sterge]").forEach(function (b) {
    b.addEventListener("click", function () { stergeDinCos(parseInt(b.dataset.sterge, 10)); });
  });
}

/* ---------- 6. Salvează în localStorage + redesenează coșul ---------- */
function salveazaSiRandeaza() {
  scrieStocare(CHEIE_COS, cos);
  randeazaCos();
}

/* ---------- 7. Acțiuni globale: trimite / golește ---------- */
function initActiuniCos() {
  // „Trimite comanda (demo)”: salvează comanda finalizată și resetează coșul
  document.getElementById("btn-trimite").addEventListener("click", function () {
    if (Object.keys(cos).length === 0) {
      afiseazaToast("Coșul e gol – adaugă întâi produse.");
      return;
    }
    // Construim un obiect-comandă cu detalii și total
    let total = 0;
    const produseComanda = Object.keys(cos).map(function (idStr) {
      const p = gasesteProdus(parseInt(idStr, 10));
      const cant = cos[idStr];
      total += p.pret * cant;
      return { nume: p.nume, cantitate: cant, pret: p.pret };
    });
    const comanda = { data: new Date().toISOString(), produse: produseComanda, total: total };

    // Salvăm comanda finalizată separat (istoricul demo)
    const comenzi = citesteStocare("lumina_comenzi", []);
    comenzi.push(comanda);
    scrieStocare("lumina_comenzi", comenzi);

    // Resetăm coșul
    cos = {};
    salveazaSiRandeaza();
    afiseazaToast("Comanda a fost trimisă! Total: " + total + " lei. Mulțumim!");
  });

  // „Golește comanda”
  document.getElementById("btn-goleste").addEventListener("click", function () {
    if (Object.keys(cos).length === 0) return;
    goleșteCos();
    afiseazaToast("Comanda a fost golită.");
  });
}

/* ---------- 8. Pornire ---------- */
document.addEventListener("DOMContentLoaded", function () {
  construiesteFiltre();
  randeazaProduse();
  randeazaCos();
  initActiuniCos();

  // Căutare live: la fiecare tastă, refiltrăm lista
  elCautare.addEventListener("input", function () {
    textCautare = elCautare.value.trim();
    randeazaProduse();
  });
});
