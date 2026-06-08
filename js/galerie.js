/* ============================================================
   galerie.js – Galerie cu lightbox custom (Vanilla JS)
   - Grid de imagini locale
   - Click pe imagine → overlay full-screen
   - Navigare înainte/înapoi (săgeți + taste ← →), închidere cu X / Esc / click pe fundal
   - Blochează scroll-ul paginii cât timp lightbox-ul e deschis
   ============================================================ */

// Lista imaginilor din galerie (placeholdere locale)
const IMAGINI = [
  { src: "assets/images/galerie-1.svg", alt: "Ceașcă de cafea pe masă de lemn" },
  { src: "assets/images/galerie-2.svg", alt: "Raft cu cărți în colțul de lectură" },
  { src: "assets/images/galerie-3.svg", alt: "Desert servit la LUMINA" },
  { src: "assets/images/galerie-4.svg", alt: "Atmosferă în timpul unui concert acustic" },
  { src: "assets/images/galerie-5.svg", alt: "Latte art pregătit de barist" },
  { src: "assets/images/galerie-6.svg", alt: "Fotoliu confortabil lângă fereastră" },
  { src: "assets/images/galerie-7.svg", alt: "Brunch pe masa de la geam" },
  { src: "assets/images/galerie-8.svg", alt: "Detaliu cu plante și lumini calde" },
  { src: "assets/images/galerie-9.svg", alt: "Intrarea cafenelei LUMINA" },
];

// Indexul imaginii afișate curent în lightbox
let indexCurent = 0;

const grid = document.getElementById("galerie-grid");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-imagine");
const lbCounter = document.getElementById("lb-counter");

/* ---------- 1. Construiește grila de imagini ---------- */
function construiesteGrid() {
  grid.innerHTML = IMAGINI.map(function (img, i) {
    // Fiecare imagine e un <button> pentru accesibilitate (focus + Enter)
    return '<button class="galerie-item" data-index="' + i + '" aria-label="Deschide: ' + img.alt + '">' +
             '<img src="' + img.src + '" alt="' + img.alt + '">' +
           '</button>';
  }).join("");

  grid.querySelectorAll(".galerie-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      deschideLightbox(parseInt(btn.dataset.index, 10));
    });
  });
}

/* ---------- 2. Deschide / actualizează / închide lightbox ---------- */
function deschideLightbox(index) {
  indexCurent = index;
  actualizeazaImagine();
  lightbox.classList.add("deschis");
  document.body.classList.add("fara-scroll"); // blocăm scroll-ul în spate
  document.getElementById("lb-inchide").focus();
}

function actualizeazaImagine() {
  const img = IMAGINI[indexCurent];
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCounter.textContent = (indexCurent + 1) + " / " + IMAGINI.length;
}

function inchideLightbox() {
  lightbox.classList.remove("deschis");
  document.body.classList.remove("fara-scroll");
}

// Navigare ciclică (de la ultima trece la prima și invers)
function imagineUrmatoare() {
  indexCurent = (indexCurent + 1) % IMAGINI.length;
  actualizeazaImagine();
}
function imagineAnterioara() {
  indexCurent = (indexCurent - 1 + IMAGINI.length) % IMAGINI.length;
  actualizeazaImagine();
}

/* ---------- 3. Evenimente: butoane + tastatură + click pe fundal ---------- */
function initLightbox() {
  document.getElementById("lb-inchide").addEventListener("click", inchideLightbox);
  document.getElementById("lb-next").addEventListener("click", imagineUrmatoare);
  document.getElementById("lb-prev").addEventListener("click", imagineAnterioara);

  // Click pe fundalul întunecat (nu pe imagine/butoane) închide lightbox-ul
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) inchideLightbox();
  });

  // Navigare cu tastatura, doar când lightbox-ul e deschis
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("deschis")) return;
    if (e.key === "Escape") inchideLightbox();
    else if (e.key === "ArrowRight") imagineUrmatoare();
    else if (e.key === "ArrowLeft") imagineAnterioara();
  });
}

/* ---------- 4. Pornire ---------- */
document.addEventListener("DOMContentLoaded", function () {
  construiesteGrid();
  initLightbox();
});
