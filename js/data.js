/* ============================================================
   data.js – Datele aplicației (produse + evenimente)
   Sunt array-uri globale folosite de celelalte scripturi.
   Nu există backend: totul este definit aici, în JavaScript.
   Imaginile sunt fotografii reale (licență liberă Unsplash),
   descărcate local în assets/images/photos/ – fără linkuri externe.
   ============================================================ */

/*
  Structura unui PRODUS:
  {
    id        : number  – identificator unic
    nume      : string  – numele produsului
    categorie : string  – categoria (Cafea / Ceai / Deserturi / Brunch)
    descriere : string  – descriere scurtă
    pret      : number  – preț în lei
    imagine   : string  – cale către fotografia locală
  }
*/
const PRODUSE = [
  // ---- Cafea ----
  { id: 1,  nume: "Espresso Lumina",     categorie: "Cafea",     descriere: "Shot intens, note de cacao și caramel, din boabe de specialitate.", pret: 12, imagine: "assets/images/photos/prod-espresso.jpg" },
  { id: 2,  nume: "Cappuccino Cremos",   categorie: "Cafea",     descriere: "Espresso echilibrat cu spumă fină de lapte și un strop de scorțișoară.", pret: 16, imagine: "assets/images/photos/prod-cappuccino.jpg" },
  { id: 3,  nume: "Flat White",          categorie: "Cafea",     descriere: "Dublu ristretto cu lapte microfoam, pentru iubitorii de cafea catifelată.", pret: 17, imagine: "assets/images/photos/prod-flatwhite.jpg" },
  { id: 4,  nume: "Caramel Latte",       categorie: "Cafea",     descriere: "Latte cald cu sirop de caramel artizanal și un vârf de sare de mare.", pret: 19, imagine: "assets/images/photos/prod-latte.jpg" },

  // ---- Ceai ----
  { id: 5,  nume: "Ceai Earl Grey",      categorie: "Ceai",      descriere: "Negru aromat cu bergamotă, servit în ceainic mic de lut.", pret: 14, imagine: "assets/images/photos/prod-earlgrey.jpg" },
  { id: 6,  nume: "Ceai Verde Jasmine",  categorie: "Ceai",      descriere: "Frunze de ceai verde parfumate natural cu flori de iasomie.", pret: 14, imagine: "assets/images/photos/prod-greentea.jpg" },
  { id: 7,  nume: "Infuzie de Fructe",   categorie: "Ceai",      descriere: "Amestec cald de măceșe, hibiscus și fructe de pădure, fără cofeină.", pret: 13, imagine: "assets/images/photos/prod-herbal.jpg" },

  // ---- Deserturi ----
  { id: 8,  nume: "Cheesecake Vanilie",  categorie: "Deserturi", descriere: "Cremos, copt lent, cu blat de biscuiți și topping de fructe.", pret: 22, imagine: "assets/images/photos/prod-cheesecake.jpg" },
  { id: 9,  nume: "Clătite cu Fructe",   categorie: "Deserturi", descriere: "Clătite pufoase cu frișcă naturală, căpșuni și zmeură proaspătă.", pret: 21, imagine: "assets/images/photos/prod-tart.jpg" },
  { id: 10, nume: "Brownie cu Nuci",     categorie: "Deserturi", descriere: "Intens de ciocolată, miez umed, bucăți de nucă caramelizată.", pret: 18, imagine: "assets/images/photos/prod-brownie.jpg" },

  // ---- Brunch ----
  { id: 11, nume: "Avocado Toast",       categorie: "Brunch",    descriere: "Pâine cu maia, avocado, ou poșat și semințe prăjite.", pret: 28, imagine: "assets/images/photos/prod-avocado.jpg" },
  { id: 12, nume: "Croissant cu Unt",    categorie: "Brunch",    descriere: "Foietaj franțuzesc, copt în casă, crocant la exterior.", pret: 11, imagine: "assets/images/photos/prod-croissant.jpg" },
  { id: 13, nume: "Bol cu Iaurt & Fructe", categorie: "Brunch",  descriere: "Iaurt grecesc, granola crocantă, miere și fructe de sezon.", pret: 24, imagine: "assets/images/photos/prod-yogurt.jpg" },
];

/*
  Structura unui EVENIMENT:
  {
    id, titlu, data (ISO YYYY-MM-DD), ora, descriere, imagine
  }
*/
const EVENIMENTE = [
  { id: 1, titlu: "Seară de Poezie Contemporană", data: "2026-06-20", ora: "19:00", descriere: "Lecturi live din autori tineri, microfon deschis și un espresso din partea casei.", imagine: "assets/images/photos/ev-poezie.jpg" },
  { id: 2, titlu: "Atelier de Latte Art",         data: "2026-06-27", ora: "11:00", descriere: "Învață să torni inimioare și frunze în cappuccino, alături de baristul nostru.", imagine: "assets/images/photos/ev-latte.jpg" },
  { id: 3, titlu: "Club de Carte: Clasici",       data: "2026-07-04", ora: "18:30", descriere: "Discuție relaxată despre romanul lunii, în colțul de lectură LUMINA.", imagine: "assets/images/photos/ev-carte.jpg" },
  { id: 4, titlu: "Concert Acustic de Seară",     data: "2026-07-11", ora: "20:00", descriere: "Chitară și voce live, lumânări și o atmosferă caldă de vară.", imagine: "assets/images/photos/ev-concert.jpg" },
  { id: 5, titlu: "Degustare de Cafea de Origine",data: "2026-07-18", ora: "17:00", descriere: "Comparăm boabe din Etiopia, Columbia și Brazilia, ghidați de un specialist.", imagine: "assets/images/photos/ev-degustare.jpg" },
  { id: 6, titlu: "Brunch & Board Games",         data: "2026-07-25", ora: "12:00", descriere: "Duminică lejeră cu jocuri de societate, brunch și ceai pe nesfârșite.", imagine: "assets/images/photos/ev-jocuri.jpg" },
  { id: 7, titlu: "Expoziție Foto Locală",        data: "2026-08-01", ora: "16:00", descriere: "Vernisajul unei expoziții de fotografie semnată de artiști din oraș.", imagine: "assets/images/photos/ev-foto.jpg" },
];
