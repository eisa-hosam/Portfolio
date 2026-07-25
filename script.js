/* =========================================================
   Nav height variable (keeps hero clear of the floating navbar)
   ========================================================= */
function updateNavHeight() {
  const nav = document.querySelector("nav");
  if (nav) {
    document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px");
  }
}
updateNavHeight();
window.addEventListener("resize", updateNavHeight);
window.addEventListener("load", updateNavHeight);

/* =========================================================
   Mobile nav toggle
   ========================================================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

/* Active link highlight on scroll */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("#navLinks a");

function setActiveLink() {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", setActiveLink);

/* =========================================================
   Theme toggle (dark / light)
   ========================================================= */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  if (themeIcon) {
    themeIcon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
  }
}

const savedTheme = localStorage.getItem("eisa-theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("eisa-theme", next);
  });
}

/* =========================================================
   Typed hero line
   ========================================================= */
const typedText = "Front-End Developer | Python | AI | Arduino";
let typeIndex = 0;
const typingEl = document.getElementById("typing");

function typeChar() {
  if (!typingEl) return;
  if (typeIndex < typedText.length) {
    typingEl.innerHTML += typedText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeChar, 70);
  }
}
typeChar();

/* =========================================================
   Scroll reveal
   ========================================================= */
const revealEls = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* =========================================================
   Stat counters
   ========================================================= */
const statEls = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 40);
}

/* =========================================================
   Image modal (project screenshots)
   ========================================================= */
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-img img").forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => { modal.style.display = "none"; });
}
if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
}

/* =========================================================
   Contact form -> opens the visitor's email client (no backend)
   ========================================================= */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const subject = document.getElementById("cSubject").value.trim() || "تواصل من الموقع الشخصي";
    const message = document.getElementById("cMessage").value.trim();

    const body = `الاسم: ${name}%0Aالبريد الإلكتروني: ${email}%0A%0Aالرسالة:%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:eh1329706@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailtoLink;

    if (formNote) {
      formNote.textContent = "هيتفتح تطبيق الإيميل بتاعك عشان تبعت الرسالة.";
    }
  });
}
