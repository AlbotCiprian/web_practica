/* ============================================================
   data.js – Datele aplicației (produse + evenimente)
   Sunt array-uri globale folosite de celelalte scripturi.
   Nu există backend: totul este definit aici, în JavaScript.
   ============================================================ */

/*
  Structura unui PRODUS:
  {
    id        : number  – identificator unic
    nume      : string  – numele produsului
    categorie : string  – categoria (Cafea / Ceai / Deserturi / Brunch)
    descriere : string  – descriere scurtă
    pret      : number  – preț în lei
    imagine   : string  – cale către imaginea locală (SVG placeholder)
  }
*/
const PRODUSE = [
  // ---- Cafea ----
  { id: 1,  nume: "Espresso Lumina",     categorie: "Cafea",     descriere: "Shot intens, note de cacao și caramel, din boabe de specialitate.", pret: 12, imagine: "assets/images/produs-cafea.svg" },
  { id: 2,  nume: "Cappuccino Cremos",   categorie: "Cafea",     descriere: "Espresso echilibrat cu spumă fină de lapte și un strop de scorțișoară.", pret: 16, imagine: "assets/images/produs-cafea.svg" },
  { id: 3,  nume: "Flat White",          categorie: "Cafea",     descriere: "Dublu ristretto cu lapte microfoam, pentru iubitorii de cafea catifelată.", pret: 17, imagine: "assets/images/produs-cafea.svg" },
  { id: 4,  nume: "Caramel Latte",       categorie: "Cafea",     descriere: "Latte cald cu sirop de caramel artizanal și un vârf de sare de mare.", pret: 19, imagine: "assets/images/produs-cafea.svg" },

  // ---- Ceai ----
  { id: 5,  nume: "Ceai Earl Grey",      categorie: "Ceai",      descriere: "Negru aromat cu bergamotă, servit în ceainic mic de lut.", pret: 14, imagine: "assets/images/produs-ceai.svg" },
  { id: 6,  nume: "Ceai Verde Jasmine",  categorie: "Ceai",      descriere: "Frunze de ceai verde parfumate natural cu flori de iasomie.", pret: 14, imagine: "assets/images/produs-ceai.svg" },
  { id: 7,  nume: "Infuzie de Fructe",   categorie: "Ceai",      descriere: "Amestec cald de măceșe, hibiscus și fructe de pădure, fără cofeină.", pret: 13, imagine: "assets/images/produs-ceai.svg" },

  // ---- Deserturi ----
  { id: 8,  nume: "Cheesecake Vanilie",  categorie: "Deserturi", descriere: "Cremos, copt lent, cu blat de biscuiți și topping de fructe.", pret: 22, imagine: "assets/images/produs-desert.svg" },
  { id: 9,  nume: "Tartă cu Caramel",    categorie: "Deserturi", descriere: "Caramel sărat și ganache de ciocolată pe blat fraged de unt.", pret: 21, imagine: "assets/images/produs-desert.svg" },
  { id: 10, nume: "Brownie cu Nuci",     categorie: "Deserturi", descriere: "Intens de ciocolată, miez umed, bucăți de nucă caramelizată.", pret: 18, imagine: "assets/images/produs-desert.svg" },

  // ---- Brunch ----
  { id: 11, nume: "Avocado Toast",       categorie: "Brunch",    descriere: "Pâine cu maia, avocado, ou poșat și semințe prăjite.", pret: 28, imagine: "assets/images/produs-brunch.svg" },
  { id: 12, nume: "Croissant cu Unt",    categorie: "Brunch",    descriere: "Foietaj franțuzesc, copt în casă, crocant la exterior.", pret: 11, imagine: "assets/images/produs-brunch.svg" },
  { id: 13, nume: "Bol cu Iaurt & Fructe", categorie: "Brunch",  descriere: "Iaurt grecesc, granola crocantă, miere și fructe de sezon.", pret: 24, imagine: "assets/images/produs-brunch.svg" },
];

/*
  Structura unui EVENIMENT:
  {
    id        : number  – identificator unic
    titlu     : string  – numele evenimentului
    data      : string  – data în format ISO (YYYY-MM-DD), pentru sortare
    ora       : string  – ora de început
    descriere : string  – descriere scurtă
    imagine   : string  – cale către imaginea locală
  }
*/
const EVENIMENTE = [
  { id: 1, titlu: "Seară de Poezie Contemporană", data: "2026-06-20", ora: "19:00", descriere: "Lecturi live din autori tineri, microfon deschis și un espresso din partea casei.", imagine: "assets/images/eveniment-poezie.svg" },
  { id: 2, titlu: "Atelier de Latte Art",         data: "2026-06-27", ora: "11:00", descriere: "Învață să torni inimioare și frunze în cappuccino, alături de baristul nostru.", imagine: "assets/images/eveniment-latte.svg" },
  { id: 3, titlu: "Club de Carte: Clasici",       data: "2026-07-04", ora: "18:30", descriere: "Discuție relaxată despre romanul lunii, în colțul de lectură LUMINA.", imagine: "assets/images/eveniment-carte.svg" },
  { id: 4, titlu: "Concert Acustic de Seară",     data: "2026-07-11", ora: "20:00", descriere: "Chitară și voce live, lumânări și o atmosferă caldă de vară.", imagine: "assets/images/eveniment-concert.svg" },
  { id: 5, titlu: "Degustare de Cafea de Origine",data: "2026-07-18", ora: "17:00", descriere: "Comparăm boabe din Etiopia, Columbia și Brazilia, ghidați de un specialist.", imagine: "assets/images/eveniment-degustare.svg" },
  { id: 6, titlu: "Brunch & Board Games",         data: "2026-07-25", ora: "12:00", descriere: "Duminică lejeră cu jocuri de societate, brunch și ceai pe nesfârșite.", imagine: "assets/images/eveniment-jocuri.svg" },
  { id: 7, titlu: "Expoziție Foto Locală",        data: "2026-08-01", ora: "16:00", descriere: "Vernisajul unei expoziții de fotografie semnată de artiști din oraș.", imagine: "assets/images/eveniment-foto.svg" },
];
