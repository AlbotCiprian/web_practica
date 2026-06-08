# Raport de practică – LUMINA: Café & Reading Corner

**Autor:** Nelly Prijilevschi
**Facultatea:** Matematică și Informatică – anul I
**Tema:** Realizarea unui site web de prezentare folosind tehnologii web fundamentale

---

## 1. Introducere și prezentarea scopului aplicației

**LUMINA – Café & Reading Corner** este un site web de prezentare pentru o cafenea
boutique imaginară, care combină trei concepte: cafeaua de specialitate, un colț de
lectură și organizarea de evenimente culturale mici (seri de poezie, cluburi de carte,
concerte acustice).

Scopul aplicației este dublu:

- **Din perspectiva afacerii:** să ofere vizitatorilor o prezentare atractivă a locației,
  un meniu interactiv, o listă de evenimente și posibilitatea de a face o rezervare sau
  de a trimite un mesaj.
- **Din perspectivă academică:** să demonstreze capacitatea de a construi un site web
  complet funcțional și responsive folosind **doar HTML5, CSS3 și JavaScript Vanilla**,
  fără framework-uri, fără backend și fără bază de date.

Problema pe care o rezolvă proiectul este una tipică pentru un mic business local:
prezența online curată, ușor de folosit pe telefon și pe desktop, cu câteva
funcționalități interactive (comandă demonstrativă, favorite, formulare validate) care
îmbunătățesc experiența utilizatorului, fără costuri de infrastructură.

---

## 2. Descrierea tehnologiilor utilizate

| Tehnologie | Rol în proiect |
|---|---|
| **HTML5** | Structura semantică a celor 6 pagini (`header`, `main`, `section`, `article`, `footer`, `form`). |
| **CSS3** | Designul vizual: variabile CSS (`:root`), Flexbox și CSS Grid pentru layout, animații/tranziții, media queries pentru responsive. |
| **JavaScript Vanilla (ES6+)** | Logica interactivă: generarea navbar-ului/footer-ului, filtrare și căutare, coșul de comandă, favoritele, validările formularelor și lightbox-ul. |
| **localStorage** | Salvarea datelor în browser (coș, favorite, rezervări), astfel încât acestea să persiste la reîncărcarea paginii, fără server sau bază de date. |

### Detalii relevante

- **Variabilele CSS** (paleta de culori, spacing, fonturi) sunt definite o singură dată
  în `:root` și refolosite peste tot, ceea ce face designul consecvent și ușor de
  modificat.
- **JavaScript** este organizat pe fișiere: cod comun în `main.js`, date în `data.js`,
  iar fiecare pagină are scriptul ei. Funcțiile comune (citire/scriere localStorage,
  toast, navbar, footer) nu sunt duplicate.
- **localStorage** stochează valori sub formă de text (JSON). Folosim funcțiile
  ajutătoare `citesteStocare` și `scrieStocare` pentru a serializa/deserializa automat.

---

## 3. Prezentarea structurii și funcționalităților site-ului

Site-ul are **6 pagini**, legate între ele prin navbar:

### 3.1 Home (`index.html`)
Pagina de start: secțiune *hero* cu titlu, subtitlu și butoane de acțiune; secțiunea
„Despre LUMINA”; trei carduri „De ce LUMINA”; un preview cu trei produse populare
(generate din `data.js`); și un card cu **următorul eveniment** (calculat dinamic ca
fiind cel mai apropiat eveniment viitor). Elementele apar cu o animație *fade-in* la
scroll.

### 3.2 Meniu (`meniu.html`) – cea mai complexă pagină
- Produsele sunt încărcate din `data.js`.
- **Filtrare pe categorii** (Cafea, Ceai, Deserturi, Brunch; „Toate” afișează tot).
- **Căutare live** după nume, case-insensitive.
- Filtrarea și căutarea **funcționează combinat**.
- Fiecare produs are buton „Adaugă în comandă”.
- **Coș demo**: panou lateral cu produsele adăugate, cantități (`+`/`−`), ștergere și
  **total calculat automat** (preț × cantitate).
- **Persistență în localStorage**: coșul rămâne după reîncărcare; există buton „Golește
  comanda” și „Trimite comanda (demo)”, care salvează comanda finalizată și resetează coșul.
- **Stare goală** prietenoasă când coșul e gol sau căutarea nu găsește nimic.

### 3.3 Evenimente (`evenimente.html`)
- Listă de evenimente din `data.js`, sortate cronologic.
- Buton **„Adaugă la favorite” / „♥ Favorit”** (toggle), salvat în localStorage.
- Filtru „Toate / Doar favorite” și **contor** de favorite.

### 3.4 Rezervare (`rezervare.html`)
- Câmpuri: nume, email, telefon, dată, oră, număr de persoane, mesaj (opțional).
- **Validări în JavaScript** (nu doar `required`): nume ≥ 2 caractere, email valid
  (regex), telefon ≥ 10 cifre, dată care nu e în trecut, persoane între 1 și 12.
- Mesaje de eroare clare, **sub fiecare câmp**; câmpurile invalide sunt marcate vizual.
- La succes: mesaj de confirmare, resetare formular, salvare opțională în localStorage.

### 3.5 Galerie (`galerie.html`)
- Grid responsive de imagini.
- **Lightbox custom** în Vanilla JS: click pe imagine → overlay full-screen, navigare
  înainte/înapoi (săgeți + tastele `←` `→`), închidere cu `X`, click pe fundal sau `Esc`.
- Scroll-ul paginii este blocat cât timp lightbox-ul e deschis.

### 3.6 Contact (`contact.html`)
- Câmpuri: nume, email, subiect, mesaj.
- **Validări JS** similare (mesaj minim 10 caractere), mesaje de eroare per câmp.
- Secțiune cu informații de contact (adresă, telefon, email, program) și o hartă
  placeholder.

---

## 4. Capturi de ecran (screenshots)

> **Notă pentru autor:** înlocuiește fiecare placeholder de mai jos cu captura reală.
> Pune imaginile în folderul `assets/images/screenshots/` cu numele indicate.

### Pagina Home
![Pagina Home](../assets/images/screenshots/home.png)
*[de înlocuit cu captura reală]*

### Pagina Meniu (cu coșul)
![Pagina Meniu](../assets/images/screenshots/meniu.png)
*[de înlocuit cu captura reală]*

### Pagina Evenimente (cu favorite)
![Pagina Evenimente](../assets/images/screenshots/evenimente.png)
*[de înlocuit cu captura reală]*

### Pagina Rezervare (cu validări)
![Pagina Rezervare](../assets/images/screenshots/rezervare.png)
*[de înlocuit cu captura reală]*

### Pagina Galerie (cu lightbox)
![Pagina Galerie](../assets/images/screenshots/galerie.png)
*[de înlocuit cu captura reală]*

### Pagina Contact
![Pagina Contact](../assets/images/screenshots/contact.png)
*[de înlocuit cu captura reală]*

### Vizualizare pe mobil (navbar hamburger)
![Vizualizare mobil](../assets/images/screenshots/mobil.png)
*[de înlocuit cu captura reală]*

---

## 5. Explicații pentru fiecare captură de ecran

**Pagina Home** – Captura arată secțiunea *hero* cu mesajul principal și butoanele
„Vezi meniul” / „Rezervă o masă”. Mai jos se observă cardurile „De ce LUMINA” și
preview-ul cu produse. Aceste elemente apar treptat (efect *fade-in*) pe măsură ce
utilizatorul derulează, ceea ce dă paginii un aspect dinamic și premium.

**Pagina Meniu** – Se văd butoanele de filtrare pe categorii, câmpul de căutare live și
grila de produse. În dreapta este coșul, cu produse, butoane `+`/`−` pentru cantitate și
totalul calculat automat. Coșul se salvează în localStorage, deci rămâne completat și
după reîncărcarea paginii.

**Pagina Evenimente** – Fiecare eveniment are un buton de favorite. Captura ilustrează
diferența vizuală dintre un eveniment normal și unul marcat ca favorit (inima plină),
plus contorul de favorite din partea de sus. Starea se păstrează în localStorage.

**Pagina Rezervare** – Captura prezintă formularul cu un câmp invalid evidențiat (de
exemplu un email greșit), împreună cu mesajul de eroare afișat sub câmp. Acesta este
rezultatul validării scrise în JavaScript, care rulează la apăsarea butonului de trimitere.

**Pagina Galerie** – Se observă grila de imagini și lightbox-ul deschis peste pagină, cu
imaginea mărită, săgețile de navigare și contorul „x / y”. Lightbox-ul poate fi controlat
și de la tastatură.

**Pagina Contact** – Captura arată formularul de contact alături de coloana cu informații
(adresă, telefon, email, program) și harta placeholder. Și aici validările sunt făcute în JS.

**Vizualizare pe mobil** – Ilustrează comportamentul responsive: navbar-ul devine meniu
„hamburger”, iar conținutul se rearanjează pe o singură coloană, fără scroll orizontal.

---

## 6. Concluzii

Proiectul **LUMINA** demonstrează că se poate construi un site modern, atractiv și
funcțional folosind exclusiv tehnologiile web de bază. Pe parcursul realizării lui am
dezvoltat și consolidat următoarele competențe:

- Structurarea semantică a paginilor în **HTML5**.
- Crearea unui **design system** consecvent în **CSS3** (variabile, Grid, Flexbox,
  animații) și implementarea unui layout **complet responsive**.
- Programarea interactivității în **JavaScript Vanilla**: manipularea DOM-ului,
  evenimente, filtrare/căutare, lucrul cu array-uri și obiecte.
- Folosirea **localStorage** pentru persistarea datelor fără backend.
- Implementarea **validărilor de formulare** și a unei componente complexe (lightbox)
  de la zero.
- Organizarea codului pe fișiere, cu funcții comune refolosite și comentarii explicative.

Rezultatul este un site care rulează prin simpla deschidere a fișierelor, fără pași de
build, și care poate fi publicat gratuit pe o platformă de hosting static (ex. Vercel).

---

## 7. Anexă cu cod

Fragmentele relevante de cod, comentate și organizate pe secțiuni, se găsesc în fișierul
[`anexe-cod.md`](anexe-cod.md).
