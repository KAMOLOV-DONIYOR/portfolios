// ripple effekti qo'shish
document.querySelectorAll(".ripple").forEach(button => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

// ripple btn

const bar = document.getElementById("progress-bar");
bar.style.transition = "width 1.2s ease-out";
bar.style.width = "10%";
setTimeout(() => {
  bar.style.transition = "width 0.8s ease";
  bar.style.width = "40%";
}, 500);
setTimeout(() => {
  bar.style.transition = "width 0.8s ease";
  bar.style.width = "70%";
}, 800);
setTimeout(() => {
  bar.style.transition = "width 0.4s ease-in";
  bar.style.width = "100%";
}, 1200);
setTimeout(() => {
  bar.style.transition = "opacity 0.3s ease-out";
  bar.style.opacity = "0";
  setTimeout(() => {
    bar.remove();
    document.getElementById("progress-bg").remove();
  }, 300);
}, 1800);
// loading

document.querySelectorAll('.dropdown a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const offset =
      window.scrollY +
      elementRect.top -
      window.innerHeight / 2 +
      elementRect.height / 2;
      
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  });
});
// smooth scroll

const backToTopBtn = document.getElementById("backToTop");
function toggleBackToTop() {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}
window.addEventListener("scroll", toggleBackToTop);
window.addEventListener("load", toggleBackToTop);
// Click qilib tepaga qaytarish
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Scroll to Top Button
// Translate Language Switcher
let translations = {};

async function loadTranslations() {
  try {
const res = await fetch("data/lang.json");
    translations = await res.json();
    
    const savedLang = localStorage.getItem("selectedLang") || "en";
    setLanguage(savedLang);
  } catch (err) {
    console.error("Tarjima faylini yuklashda xato:", err);
  }
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  
  document.querySelectorAll("[lang]").forEach(el => {
    const key = el.getAttribute("lang");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  localStorage.setItem("selectedLang", lang);
  document.getElementById("selected-lang").textContent =
  lang === "en" ? "English" :
  lang === "ru" ? "Russian" :
  "Uzbek";
}

// Dropdown til tanlash event
document.querySelectorAll(".dropdown a[data-lang]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    setLanguage(link.getAttribute("data-lang"));
  });
});

// Sahifa yuklanganda tarjimalarni chaqirish
loadTranslations();
// Translate Language Switcher

