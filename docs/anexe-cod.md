# Anexă cu cod – fragmente relevante

Acest document conține fragmentele cele mai importante din codul sursă, organizate pe
secțiuni și însoțite de explicații. Codul complet se găsește în fișierele din folderele
`js/` și `css/`.

---

## 1. Helpers pentru localStorage (`js/main.js`)

**Ce face:** centralizează citirea și scrierea în `localStorage`, transformând automat
datele în/din format JSON. Sunt refolosite de toate paginile, ca să nu existe cod duplicat.

```javascript
// Citește o valoare din localStorage și o transformă din JSON.
// Dacă nu există sau e coruptă, întoarce valoarea implicită.
function citesteStocare(cheie, implicit) {
  try {
    const brut = localStorage.getItem(cheie);
    return brut ? JSON.parse(brut) : implicit;
  } catch (e) {
    return implicit;
  }
}

// Scrie o valoare în localStorage (o serializează în JSON).
function scrieStocare(cheie, valoare) {
  localStorage.setItem(cheie, JSON.stringify(valoare));
}
```

---

## 2. Generarea navbar-ului și marcarea paginii curente (`js/main.js`)

**Ce face:** construiește navbar-ul dintr-o singură listă de linkuri și marchează automat
linkul paginii curente cu clasa `active`. Astfel, navbar-ul e identic pe toate paginile și
se modifică într-un singur loc.

```javascript
const LINKURI_NAV = [
  { href: "index.html",      eticheta: "Home" },
  { href: "meniu.html",      eticheta: "Meniu" },
  { href: "evenimente.html", eticheta: "Evenimente" },
  { href: "rezervare.html",  eticheta: "Rezervare" },
  { href: "galerie.html",    eticheta: "Galerie" },
  { href: "contact.html",    eticheta: "Contact" },
];

// Numele fișierului paginii curente (ex. "meniu.html")
function paginaCurenta() {
  const cale = window.location.pathname.split("/").pop();
  return cale === "" ? "index.html" : cale;
}
```

---

## 3. Filtrare + căutare combinate (`js/meniu.js`)

**Ce face:** filtrează produsele simultan după categoria selectată **și** după textul
căutat. O singură funcție acoperă ambele condiții, iar rezultatul e mereu coerent.

```javascript
function produseFiltrate() {
  return PRODUSE.filter(function (p) {
    // Categoria: „Toate” trece tot
    const okCategorie = categorieActiva === "Toate" || p.categorie === categorieActiva;
    // Căutarea: numele conține textul (case-insensitive)
    const okCautare = p.nume.toLowerCase().indexOf(textCautare.toLowerCase()) !== -1;
    return okCategorie && okCautare;
  });
}
```

---

## 4. Calculul totalului din coș (`js/meniu.js`)

**Ce face:** parcurge produsele din coș, înmulțește prețul cu cantitatea și adună totul.
Actualizează și numărul total de produse afișat pe badge.

```javascript
let total = 0;        // suma totală
let bucatiTotale = 0; // numărul total de produse

elCosLista.innerHTML = idsuri.map(function (idStr) {
  const id = parseInt(idStr, 10);
  const produs = gasesteProdus(id);
  const cant = cos[idStr];
  const subtotal = produs.pret * cant; // preț × cantitate
  total += subtotal;
  bucatiTotale += cant;
  // ... (construiește HTML-ul liniei din coș)
}).join("");

elCosTotal.textContent = total + " lei";
elCosNumar.textContent = bucatiTotale;
```

---

## 5. Toggle favorite salvat în localStorage (`js/evenimente.js`)

**Ce face:** adaugă sau scoate un eveniment din lista de favorite și salvează imediat
schimbarea în `localStorage`, ca să persiste după reîncărcare.

```javascript
function comutaFavorit(id) {
  if (esteFavorit(id)) {
    favorite = favorite.filter(function (x) { return x !== id; });
  } else {
    favorite.push(id);
  }
  scrieStocare(CHEIE_FAV, favorite); // salvăm imediat
  randeaza();
}
```

---

## 6. Validarea formularului de rezervare (`js/rezervare.js`)

**Ce face:** verifică fiecare câmp în JavaScript (nu doar prin `required`) și afișează
mesaje de eroare clare. Exemple: email cu regex și dată care nu poate fi în trecut.

```javascript
// Email – format valid
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regexEmail.test(email)) {
  seteazaEroare("email", "err-email", "Introdu o adresă de email validă.");
  valid = false;
} else {
  curataEroare("email", "err-email");
}

// Data – obligatorie și să nu fie în trecut
const aleasa = new Date(data);
const azi = new Date(); azi.setHours(0, 0, 0, 0);
if (aleasa < azi) {
  seteazaEroare("data", "err-data", "Data nu poate fi în trecut.");
  valid = false;
}
```

Trimiterea formularului este oprită cu `preventDefault()`, pentru că nu există backend:

```javascript
formRez.addEventListener("submit", function (e) {
  e.preventDefault(); // nu există backend – oprim trimiterea reală
  if (valideazaRezervare()) {
    // ... salvare în localStorage + mesaj de succes + reset
  }
});
```

---

## 7. Lightbox custom cu navigare (`js/galerie.js`)

**Ce face:** afișează imaginea selectată într-un overlay, permite navigarea ciclică și
închiderea. Operatorul modulo (`%`) face navigarea să „treacă” de la ultima imagine la
prima și invers.

```javascript
// Navigare ciclică
function imagineUrmatoare() {
  indexCurent = (indexCurent + 1) % IMAGINI.length;
  actualizeazaImagine();
}
function imagineAnterioara() {
  indexCurent = (indexCurent - 1 + IMAGINI.length) % IMAGINI.length;
  actualizeazaImagine();
}

// Navigare cu tastatura, doar când lightbox-ul e deschis
document.addEventListener("keydown", function (e) {
  if (!lightbox.classList.contains("deschis")) return;
  if (e.key === "Escape") inchideLightbox();
  else if (e.key === "ArrowRight") imagineUrmatoare();
  else if (e.key === "ArrowLeft") imagineAnterioara();
});
```

---

## 8. Animație fade-in la scroll (`js/main.js`)

**Ce face:** folosește `IntersectionObserver` pentru a adăuga clasa `vizibil`
elementelor `.fade-in` atunci când intră în ecran. Are și un *fallback* dacă API-ul nu e
suportat.

```javascript
const observator = new IntersectionObserver(function (intrari) {
  intrari.forEach(function (intrare) {
    if (intrare.isIntersecting) {
      intrare.target.classList.add("vizibil");
      observator.unobserve(intrare.target); // animăm o singură dată
    }
  });
}, { threshold: 0.12 });
```

---

## 9. Variabile de design în CSS (`css/style.css`)

**Ce face:** definește paleta de culori, spacing-ul și fonturile o singură dată, în
`:root`. Toate componentele le refolosesc, deci designul e consecvent și ușor de modificat.

```css
:root {
  --crem: #F7F0E6;
  --caramel: #C8893F;
  --caramel-inchis: #A66E2C;
  --maro: #3B2A20;
  --masliniu: #6B7A4F;
  /* spacing pe grid de 8px */
  --sp-2: 16px;
  --sp-3: 24px;
  --radius: 16px;
  --tranzitie: 250ms ease;
}
```

---

## 10. Responsive – meniul hamburger (`css/style.css`)

**Ce face:** sub 768px, navbar-ul orizontal devine un panou lateral care alunecă din
dreapta, controlat de butonul hamburger (clasa `deschis` e adăugată din JavaScript).

```css
@media (max-width: 768px) {
  .navbar__toggle { display: flex; }
  .navbar__links {
    position: fixed;
    top: 72px; right: 0;
    flex-direction: column;
    transform: translateX(110%);   /* ascuns în afara ecranului */
    transition: transform 250ms ease;
  }
  .navbar__links.deschis { transform: translateX(0); } /* afișat */
}
```
