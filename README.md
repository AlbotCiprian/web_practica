# LUMINA – Café & Reading Corner

Site web de prezentare pentru o cafenea boutique cu colț de lectură și evenimente
culturale. Proiect realizat ca **lucrare de practică, anul I**, folosind exclusiv
tehnologii web fundamentale (HTML, CSS, JavaScript), **fără framework-uri și fără backend**.

🔗 **Demo live:** _(se completează după deploy pe Vercel)_

---

## 🧰 Tehnologii folosite

- **HTML5** – structura semantică a paginilor.
- **CSS3** – design system custom cu variabile (`:root`), Flexbox, CSS Grid,
  animații și design 100% responsive (mobile-first).
- **JavaScript Vanilla (ES6+)** – toată interactivitatea: navbar, filtrare, căutare,
  coș de comandă, favorite, validări de formulare, lightbox.
- **localStorage** – persistența datelor (coș, favorite, rezervări) direct în browser,
  fără bază de date și fără server.

> Nu sunt folosite biblioteci sau framework-uri externe (fără React, Vue, jQuery,
> Bootstrap, Tailwind) și niciun CDN. Toate imaginile sunt placeholdere SVG locale.

---

## 📁 Structura folderelor

```
.
├── index.html              # Home
├── meniu.html              # Meniu interactiv (filtrare, căutare, coș demo)
├── evenimente.html         # Evenimente + favorite
├── rezervare.html          # Formular rezervare cu validări
├── galerie.html            # Galerie cu lightbox
├── contact.html            # Formular contact cu validări
├── css/
│   └── style.css           # Întregul design system + componente
├── js/
│   ├── main.js             # Navbar, footer, helpers localStorage, fade-in, toast
│   ├── data.js             # Datele: produse + evenimente
│   ├── meniu.js            # Filtrare, căutare, coș, total, localStorage
│   ├── evenimente.js       # Render evenimente + favorite
│   ├── rezervare.js        # Validări formular rezervare
│   ├── contact.js          # Validări formular contact
│   └── galerie.js          # Lightbox
├── assets/
│   └── images/             # Imagini/placeholdere locale (SVG)
├── README.md
└── docs/
    ├── raport-practica.md
    ├── credits.md
    └── anexe-cod.md
```

---

## ▶️ Cum rulezi proiectul local

Nu există pași de build. Ai două variante:

1. **Cel mai simplu:** deschide fișierul `index.html` direct în browser
   (dublu-click pe el).
2. **Recomandat (cu Live Server):** în VS Code, instalează extensia *Live Server*,
   apoi click dreapta pe `index.html` → **Open with Live Server**.

> Recomandarea cu Live Server e utilă pentru reîncărcare automată; localStorage
> funcționează în ambele cazuri.

### Deploy pe Vercel
Fiind un site complet static cu `index.html` în rădăcină, se publică pe Vercel
fără configurare: importă repo-ul, lasă setările implicite (Framework: *Other*,
fără build command) și dă **Deploy**. Nu sunt necesare variabile de mediu, bază de
date sau servicii externe.

---

## ✨ Funcționalități

- **Navbar responsive** cu meniu hamburger animat pe mobil și link activ evidențiat.
- **Home** cu hero, secțiuni de prezentare, produse populare și următorul eveniment.
- **Meniu interactiv**: filtrare pe categorii + căutare live (combinate), coș demo
  cu cantități (`+`/`−`), ștergere, **total calculat automat** și **persistență în
  localStorage**.
- **Evenimente** cu sistem de **favorite** salvate în localStorage și filtru
  „Toate / Doar favorite”.
- **Rezervare** cu validări complete în JavaScript (nume, email, telefon, dată în
  viitor, număr de persoane între 1 și 12).
- **Galerie** cu **lightbox custom** (navigare cu mouse-ul și tastatura, închidere
  cu Esc / click pe fundal).
- **Contact** cu validări (nume, email, subiect, mesaj minim 10 caractere) și
  informații de contact.
- Animații fine de tip *fade-in* la scroll, design cald (cremă–caramel–maro–măsliniu).

---

## 👩‍💻 Autor

**Nelly Prijilevschi**
Facultatea de Matematică și Informatică – anul I
Lucrare de practică.
