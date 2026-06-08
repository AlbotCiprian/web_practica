/* ============================================================
   main.js – Cod comun tuturor paginilor
   - Construiește navbar-ul și footer-ul (identice peste tot)
   - Helpers pentru localStorage
   - Animație fade-in la scroll
   - Toast (notificări scurte)
   ============================================================ */

/* ---------- 1. Helpers localStorage (refolosite peste tot) ---------- */
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

/* ---------- 2. Listă de navigare (o singură sursă de adevăr) ---------- */
const LINKURI_NAV = [
  { href: "index.html",       eticheta: "Home" },
  { href: "meniu.html",       eticheta: "Meniu" },
  { href: "evenimente.html",  eticheta: "Evenimente" },
  { href: "rezervare.html",   eticheta: "Rezervare" },
  { href: "galerie.html",     eticheta: "Galerie" },
  { href: "contact.html",     eticheta: "Contact" },
];

// Întoarce numele fișierului paginii curente (ex. "meniu.html").
function paginaCurenta() {
  const cale = window.location.pathname.split("/").pop();
  return cale === "" ? "index.html" : cale;
}

/* ---------- 3. Construiește navbar-ul ---------- */
function construiesteNavbar() {
  const gazda = document.getElementById("navbar-container");
  if (!gazda) return;

  const activa = paginaCurenta();
  // Generăm linkurile, marcând-o pe cea curentă cu clasa "active"
  const linkuriHtml = LINKURI_NAV.map(function (l) {
    const clasaActiva = l.href === activa ? " active" : "";
    const aria = l.href === activa ? ' aria-current="page"' : "";
    return `<li><a class="navbar__link${clasaActiva}" href="${l.href}"${aria}>${l.eticheta}</a></li>`;
  }).join("");

  gazda.innerHTML = `
    <nav class="navbar" aria-label="Navigare principală">
      <div class="container navbar__inner">
        <a class="navbar__logo" href="index.html">LU<span>MI</span>NA</a>
        <button class="navbar__toggle" id="navToggle"
                aria-label="Deschide meniul" aria-expanded="false" aria-controls="navLinks">
          <span></span><span></span><span></span>
        </button>
        <ul class="navbar__links" id="navLinks">${linkuriHtml}</ul>
      </div>
    </nav>`;

  activeazaNavbar();
}

// Logica meniului mobil (hamburger) + umbra la scroll.
function activeazaNavbar() {
  const toggle = document.getElementById("navToggle");
  const linkuri = document.getElementById("navLinks");
  const navbar = document.querySelector(".navbar");

  // Deschide/închide meniul pe mobil
  toggle.addEventListener("click", function () {
    const deschis = linkuri.classList.toggle("deschis");
    toggle.classList.toggle("activ", deschis);
    toggle.setAttribute("aria-expanded", deschis ? "true" : "false");
    toggle.setAttribute("aria-label", deschis ? "Închide meniul" : "Deschide meniul");
    document.body.classList.toggle("fara-scroll", deschis);
  });

  // La click pe un link, închidem meniul mobil
  linkuri.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      linkuri.classList.remove("deschis");
      toggle.classList.remove("activ");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("fara-scroll");
    });
  });

  // Adaugă umbră navbar-ului după ce derulăm puțin
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });
}

/* ---------- 4. Construiește footer-ul ---------- */
function construiesteFooter() {
  const gazda = document.getElementById("footer-container");
  if (!gazda) return;

  const an = new Date().getFullYear(); // anul curent, dinamic

  gazda.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__logo">LU<span>MI</span>NA</div>
            <p>Café &amp; Reading Corner – cafea de specialitate, cărți bune și
               evenimente culturale, într-un colț cald al orașului.</p>
            <div class="footer__social">
              <a href="#" aria-label="Facebook">${ICONITE.facebook}</a>
              <a href="#" aria-label="Instagram">${ICONITE.instagram}</a>
              <a href="#" aria-label="Twitter">${ICONITE.twitter}</a>
            </div>
          </div>
          <div>
            <h4>Program</h4>
            <ul class="footer__lista">
              <li>Luni – Vineri: 08:00 – 22:00</li>
              <li>Sâmbătă: 09:00 – 23:00</li>
              <li>Duminică: 09:00 – 21:00</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul class="footer__lista">
              <li>Str. Cărții nr. 7, Centru</li>
              <li><a href="tel:+40700000000">+40 700 000 000</a></li>
              <li><a href="mailto:salut@lumina-cafe.ro">salut@lumina-cafe.ro</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__jos">
          <p>&copy; ${an} LUMINA Café &amp; Reading Corner. Toate drepturile rezervate.</p>
          <p class="footer__dev">Developed by Nelly Prijilevschi</p>
        </div>
      </div>
    </footer>`;
}

/* ---------- 5. Iconițe SVG inline (fără CDN extern) ---------- */
const ICONITE = {
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h2.7l.4-3H13V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8h3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1 11.3 11.3 0 0 0 8.1 20c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>',
};

/* ---------- 6. Animație fade-in la scroll (IntersectionObserver) ---------- */
function pornesteFadeIn() {
  const elemente = document.querySelectorAll(".fade-in");
  if (!("IntersectionObserver" in window) || elemente.length === 0) {
    // Fallback: dacă nu există suport, arătăm direct elementele
    elemente.forEach(function (el) { el.classList.add("vizibil"); });
    return;
  }
  const observator = new IntersectionObserver(function (intrari) {
    intrari.forEach(function (intrare) {
      if (intrare.isIntersecting) {
        intrare.target.classList.add("vizibil");
        observator.unobserve(intrare.target); // animăm o singură dată
      }
    });
  }, { threshold: 0.12 });

  elemente.forEach(function (el) { observator.observe(el); });
}

/* ---------- 7. Toast (notificare scurtă, refolosit de mai multe pagini) ---------- */
let toastTimeout;
function afiseazaToast(mesaj) {
  let toast = document.getElementById("toast");
  // Creăm elementul o singură dată, la nevoie
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = mesaj;
  toast.classList.add("vizibil");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function () {
    toast.classList.remove("vizibil");
  }, 2600);
}

/* ---------- 8. Inițializare la încărcarea paginii ---------- */
document.addEventListener("DOMContentLoaded", function () {
  construiesteNavbar();
  construiesteFooter();
  pornesteFadeIn();
});
