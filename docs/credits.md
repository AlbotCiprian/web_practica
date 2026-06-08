# Credite și resurse

Acest document listează resursele, inspirațiile și deciziile de design folosite în
proiectul **LUMINA – Café & Reading Corner**.

## Autor

Întreaga lucrare (cod, design și documentație) a fost realizată de
**Nelly Prijilevschi**, Facultatea de Matematică și Informatică, anul I, ca lucrare
de practică.

## Tehnologii și resurse

- **HTML5, CSS3, JavaScript Vanilla (ES6+)** – tehnologii standard, fără biblioteci
  externe.
- **Fonturi:** se folosesc fonturi de sistem stivuite, fără import din CDN:
  - Titluri: `"Cormorant Garamond", "Georgia", "Times New Roman", serif`
    (dacă fontul Cormorant nu e instalat, browserul folosește automat Georgia/serif).
  - Text: `"Segoe UI", system-ui, -apple-system, sans-serif`.
- **Iconițe:** desenate ca SVG inline, direct în cod (fără bibliotecă de iconițe și
  fără CDN).
- **Imagini:** toate imaginile sunt **placeholdere SVG generate local** (gradiente din
  paleta proiectului, cu forme și etichete), aflate în `assets/images/`. Nu există
  linkuri către imagini externe care ar putea pica. Ele pot fi înlocuite oricând cu
  fotografii reale, păstrând aceleași nume de fișier.

## Paleta de culori

Inspirată din ambianța caldă a unei cafenele (tonuri de cremă, caramel, maro și verde
măsliniu). Valorile exacte sunt definite ca variabile CSS în `css/style.css`, în
blocul `:root`.

## Inspirație de design

Aspectul „premium” (carduri cu colțuri rotunjite, umbre fine, spacing generos,
animații discrete la hover și la scroll) este o interpretare proprie a tendințelor
moderne de web design pentru localuri boutique. Nu a fost folosit niciun template gata
făcut.

## Notă privind datele

Produsele, evenimentele, prețurile, adresa și datele de contact sunt **fictive**,
create exclusiv în scop demonstrativ pentru această lucrare de practică.
