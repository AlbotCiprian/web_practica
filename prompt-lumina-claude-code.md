# Prompt pentru Claude Code — Proiect „LUMINA — Café & Reading Corner”

> Copiază tot conținutul de mai jos și lipește-l în Claude Code ca prompt inițial.

---

## 0. Rol și obiectiv

Acționează ca **dezvoltator frontend senior și mentor academic**. Construiește de la zero un site web complet funcțional, premium și responsive, numit **„LUMINA — Café & Reading Corner”** — o cafenea boutique combinată cu un colț de lectură și evenimente culturale mici.

Proiectul este o **lucrare de practică de anul I** la Facultatea de Matematică și Informatică, deci codul trebuie să fie:
- **curat, comentat și ușor de explicat oral** unui profesor;
- **fără biblioteci sau framework-uri externe** (vezi constrângerile de mai jos);
- **complet funcțional local**, doar prin deschiderea fișierelor `.html` în browser.

La final, livrează **tot codul + documentația academică completă** descrisă în Secțiunea 9.

---

## 1. Constrângeri tehnice (obligatorii)

- Folosește **doar HTML5, CSS3 și JavaScript Vanilla (ES6+)**.
- **Interzis**: React, Vue, Angular, jQuery, Bootstrap, Tailwind, orice CDN sau backend (Node, PHP, Python etc.).
- Persistența datelor se face exclusiv cu **`localStorage`** (fără baze de date, fără server).
- Site-ul trebuie să ruleze prin simpla deschidere a `index.html` (sau cu Live Server) — **fără pași de build**.
- **Zero erori și zero warning-uri în consola browserului.**
- Cod organizat pe fișiere separate (HTML / CSS / JS), nu totul într-un singur fișier.
- Imagini: folosește imagini placeholder locale (SVG generate sau `picsum`-style cu fișiere locale) sau forme/gradiente CSS dacă nu există imagini reale — **fără linkuri externe care pot pica**.
- Comentarii în cod **în limba română**, scurte și relevante, care explică logica fiecărei funcții importante.

---

## 2. Structura de fișiere și foldere

Generează exact această structură:

```
lumina/
├── index.html              # Home
├── meniu.html              # Meniu interactiv (filtrare, căutare, comandă demo)
├── evenimente.html         # Evenimente + favorite
├── rezervare.html          # Formular rezervare cu validări
├── galerie.html            # Galerie cu lightbox
├── contact.html            # Formular contact cu validări
├── css/
│   └── style.css           # Întregul design system + componente
├── js/
│   ├── main.js             # Navbar, helpers comune, init footer, an curent
│   ├── data.js             # Datele produse + evenimente (array-uri JS)
│   ├── meniu.js            # Filtrare, căutare, coș demo, total, localStorage
│   ├── evenimente.js       # Render evenimente + favorite în localStorage
│   ├── rezervare.js        # Validări formular rezervare
│   ├── contact.js          # Validări formular contact
│   └── galerie.js          # Lightbox
├── assets/
│   └── images/             # imagini/placeholdere locale
├── README.md
└── docs/
    ├── raport-practica.md
    ├── credits.md
    └── anexe-cod.md
```

---

## 3. Design system (cald, premium, custom — nu template banal)

### Paletă de culori (definește ca variabile CSS în `:root`)
| Variabilă | Rol | Sugestie HEX |
|---|---|---|
| `--crem` | fundal principal | `#F7F0E6` |
| `--crem-deschis` | carduri / suprafețe | `#FBF6EE` |
| `--caramel` | accent principal, butoane | `#C8893F` |
| `--caramel-inchis` | hover butoane | `#A66E2C` |
| `--maro` | text titluri / footer | `#3B2A20` |
| `--maro-mediu` | text secundar | `#6B5444` |
| `--masliniu` | accent secundar / badge-uri | `#6B7A4F` |
| `--masliniu-inchis` | hover accent secundar | `#566437` |

### Tipografie
- Titluri: font **serif elegant** (folosește un font serif de sistem stivuit, ex. `"Georgia", "Cormorant Garamond", serif` — fără import CDN; dacă vrei un import, fă-l opțional și degradabil).
- Text: font **sans-serif curat** (`"Segoe UI", system-ui, sans-serif`).
- Stabilește o scară tipografică clară (h1–h4, body, small).

### Reguli vizuale
- **Carduri premium**: colțuri rotunjite (`border-radius` ~16px), umbre fine, padding generos, hover cu ridicare ușoară (`translateY` + umbră mai mare).
- **Animații fine**: tranziții de 200–300ms pe hover, fade-in la scroll (cu `IntersectionObserver`), nimic agresiv.
- **Spacing generos și consistent** (folosește un sistem de spacing bazat pe variabile, ex. 8px grid).
- Butoane premium cu stări `hover`, `focus-visible` și `active`.
- **100% responsive**: mobile-first, breakpoint-uri clare (ex. 480px, 768px, 1024px). Testat de la 320px în sus.
- Accesibilitate de bază: contrast bun, `alt` la imagini, `aria-label` unde e nevoie, focus vizibil, navigare cu tastatura pentru lightbox și meniul mobil.

---

## 4. Componente comune (pe toate paginile)

### Navbar responsive
- Logo „LUMINA” în stânga, linkuri în dreapta (Home, Meniu, Evenimente, Rezervare, Galerie, Contact).
- Pe mobil: **hamburger menu** care deschide/închide un meniu (toggle cu JS, animat).
- Linkul paginii curente este evidențiat (`active`).
- Navbar care rămâne lizibil la scroll (poate deveni „sticky” cu o umbră fină).

### Footer (identic pe toate paginile)
- Informații de contact scurte + program + social (iconițe SVG simple, fără CDN).
- **Obligatoriu**, pe ultimul rând, text vizibil clar:
  > **Developed by Nelly Prijilevschi**
- Anul curent generat dinamic din JS (`new Date().getFullYear()`).

---

## 5. Specificații per pagină

### 5.1 `index.html` — Home
- **Hero section** cald: titlu mare, subtitlu, 1–2 butoane CTA („Vezi meniul”, „Rezervă o masă”).
- Secțiune „Despre LUMINA” (text scurt + imagine/ilustrație).
- Secțiune „De ce LUMINA” cu 3 carduri (cafea de specialitate, colț de lectură, evenimente culturale).
- Preview cu 3 produse populare (din `data.js`) și un buton spre meniu.
- Preview cu următorul eveniment.
- Animații fade-in la scroll.

### 5.2 `meniu.html` — Meniu interactiv (cea mai importantă pagină)
- Produsele provin din `data.js` (array de obiecte: `id, nume, categorie, descriere, pret, imagine`).
- **Filtrare pe categorii** (ex.: Cafea, Ceai, Deserturi, Brunch) prin butoane/tab-uri; „Toate” afișează tot.
- **Căutare live** după nume (input text care filtrează instant lista, case-insensitive).
- Filtrarea și căutarea **funcționează combinat**.
- Fiecare produs e un card premium cu buton **„Adaugă în comandă”**.
- **Comandă demo (coș)**: panou lateral sau secțiune cu produsele adăugate, cantități (`+` / `-`), ștergere produs, și **total calculat automat** (preț × cantitate, sumă totală).
- **Salvare comandă în `localStorage`**: coșul persistă la refresh; buton „Golește comanda”; mesaj de confirmare la „Trimite comanda (demo)” care salvează comanda finalizată în `localStorage` și o resetează.
- Stare goală frumoasă („Coșul tău e gol”).

### 5.3 `evenimente.html` — Evenimente
- Listă de evenimente din `data.js` (`id, titlu, data, ora, descriere, imagine`).
- Fiecare eveniment e un card cu buton **„Adaugă la favorite” / „♥ Favorit”** (toggle).
- **Favoritele se salvează în `localStorage`** și rămân marcate la refresh.
- Un filtru/sortare simplu(ă): „Toate” / „Doar favorite”.
- Eventual contor „X evenimente favorite”.

### 5.4 `rezervare.html` — Formular rezervare
Câmpuri: nume, email, telefon, data, ora, număr de persoane, mesaj (opțional).
- **Validări în JavaScript** (nu doar HTML `required`):
  - nume: minim 2 caractere;
  - email: format valid (regex);
  - telefon: doar cifre/format valid, lungime minimă;
  - data: nu poate fi în trecut;
  - număr de persoane: între 1 și 12.
- Mesaje de eroare **sub fiecare câmp**, clare, în română; câmpurile invalide marcate vizual.
- La submit valid: mesaj de succes („Rezervarea ta a fost înregistrată!”), resetare formular, opțional salvare în `localStorage`.
- `preventDefault()` pe submit (fără backend).

### 5.5 `galerie.html` — Galerie cu lightbox
- Grid responsive de imagini (placeholdere locale).
- **Lightbox custom în Vanilla JS**: click pe imagine → overlay full-screen cu imaginea mărită.
- Navigare **înainte/înapoi** (săgeți + tastele `←` `→`), închidere cu `X`, click pe fundal sau tasta `Esc`.
- Fără scroll în spate cât e deschis (blochează `body`).

### 5.6 `contact.html` — Formular contact + info
- Câmpuri: nume, email, subiect, mesaj.
- **Validări JS** similare (nume, email valid, mesaj minim ~10 caractere), mesaje de eroare per câmp.
- La submit valid: mesaj de mulțumire + reset.
- Secțiune cu informații de contact (adresă, program, telefon, hartă opțională ca imagine/placeholder — fără CDN extern).

---

## 6. Model de date (în `js/data.js`)

Creează două array-uri exportate prin variabile globale:
- `PRODUSE` — minim **12 produse** în cel puțin **4 categorii**.
- `EVENIMENTE` — minim **6 evenimente** cu date variate.

Fiecare obiect trebuie să fie comentat o dată cu structura câmpurilor.

---

## 7. Cerințe de calitate a codului

- Fără cod duplicat: pune funcțiile comune (ex. render footer, get/set localStorage) în `main.js`.
- Nume de variabile/funcții descriptive (în engleză sau română, consecvent).
- Tratează cazurile limită: `localStorage` gol, listă filtrată goală, formular incomplet.
- Verifică la final că **nu există erori în consolă** pe nicio pagină.
- Cod indentat consecvent.

---

## 8. Definition of Done (verifică tot înainte de a livra)

- [ ] Toate cele 6 pagini există și se leagă corect prin navbar.
- [ ] Navbar responsive cu hamburger funcțional pe mobil.
- [ ] Filtrare + căutare produse funcționează combinat.
- [ ] Comandă demo cu total automat + persistență în `localStorage`.
- [ ] Evenimente favorite salvate în `localStorage`.
- [ ] Formular rezervare cu validări JS complete.
- [ ] Formular contact cu validări JS complete.
- [ ] Galerie cu lightbox funcțional (mouse + tastatură).
- [ ] Design cald/premium cu paleta crem–caramel–maro–măsliniu.
- [ ] Responsive de la 320px în sus, fără overflow orizontal.
- [ ] Zero erori în consolă.
- [ ] Footer cu „**Developed by Nelly Prijilevschi**” pe toate paginile.
- [ ] Documentația completă generată (vezi Secțiunea 9).

---

## 9. Documentația academică (obligatorie)

Generează următoarele fișiere, **în limba română**, redactate îngrijit:

### 9.1 `README.md`
- Titlul și descrierea proiectului.
- Tehnologii folosite.
- Structura folderelor.
- Instrucțiuni de rulare locală (deschidere `index.html` / Live Server).
- Lista funcționalităților.
- Autor: **Nelly Prijilevschi**, Facultatea de Matematică și Informatică, anul I.

### 9.2 `docs/raport-practica.md` — Raportul de practică
Structurat exact astfel (acestea sunt cerințele universității):
1. **Introducere și prezentarea scopului aplicației** — ce este LUMINA, ce problemă/temă acoperă.
2. **Descrierea tehnologiilor utilizate** — HTML5, CSS3, JavaScript Vanilla, `localStorage`; ce face fiecare.
3. **Prezentarea structurii și funcționalităților site-ului** — descrierea fiecărei pagini și a fiecărei funcționalități.
4. **Capturi de ecran (screenshots)** — inserează **placeholdere clare** pentru fiecare pagină/funcționalitate principală, sub forma:
   `![Pagina Home](../assets/images/screenshots/home.png)` și o notă „[de înlocuit cu captura reală]”, astfel încât studentul doar să adauge pozele.
5. **Explicații pentru fiecare captură de ecran** — sub fiecare placeholder, un paragraf care explică rolul și modul de funcționare al elementelor din imagine.
6. **Concluzii** — rezultate obținute și competențe dezvoltate.
7. Trimitere la anexa cu cod.

### 9.3 `docs/credits.md`
- Resurse, inspirații, fonturi, eventuale imagini placeholder.
- Mențiune clară că autorul lucrării este **Nelly Prijilevschi**.

### 9.4 `docs/anexe-cod.md` — Anexă cu cod
- Fragmentele relevante din codul sursă, **organizate pe secțiuni și comentate** (ex.: logica de filtrare, calculul totalului, validările formularelor, lightbox-ul, lucrul cu `localStorage`).
- Fiecare fragment precedat de o scurtă explicație a ce face și de ce.

---

## 10. Mod de lucru cerut

1. Întâi propune pe scurt planul și structura, apoi creează fișierele.
2. Implementează pagină cu pagină, verificând că fiecare funcționează.
3. La final, generează documentația și parcurge checklist-ul din Secțiunea 8.
4. Anunță-mă dacă vreo cerință e ambiguă, dar fă presupuneri rezonabile pentru a livra un proiect complet.

Începe acum.
