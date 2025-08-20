// js 
function showToast(message) {
  const toast = document.getElementById("Toast");
  const notif = document.getElementById("toast-notif");
  
  notif.innerText = message; // Matnni yozish
  toast.classList.add("show");
  
  // 2 soniyadan keyin yopiladi
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Hamma [toast] atributli elementlarni topamiz
document.querySelectorAll("[toast]").forEach(el => {
  el.addEventListener("click", () => {
    const message = el.getAttribute("toast-text") || "OK!";
    showToast(message);
  });
});

const copyText = document.getElementById("copyText");

copyText.addEventListener("click", () => {
  navigator.clipboard.writeText(copyText.innerText).then(() => {
  });
});

// Toast funksiyasi
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
    
    const savedLang = localStorage.getItem("selectedLang") || "SystemLang";
    setLanguage(savedLang);
  } catch (err) {
    console.error("Error data/lang.json:", err);
  }
}

function getSystemLanguage() {
  // Brauzer tilini olish
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0]; // 'en-US' -> 'en'
  
  // Mavjud tillar ro'yxati
  const supportedLangs = ['en', 'ru', 'uz'];
  
  // Agar system tili mavjud bo'lsa, uni qaytarish
  if (supportedLangs.includes(langCode)) {
    return langCode;
  }
  
  // Aks holda English qaytarish
  return 'en';
}

function setLanguage(lang) {
  let actualLang = lang;
  
  // Agar "SystemLang" tanlangan bo'lsa, system tilini aniqlash
  if (lang === "SystemLang") {
    actualLang = getSystemLanguage();
  }
  
  if (!translations[actualLang]) return;
  
  document.querySelectorAll("[lang]").forEach(el => {
    const key = el.getAttribute("lang");
    if (translations[actualLang][key]) {
      el.textContent = translations[actualLang][key];
    }
  });
  
  localStorage.setItem("selectedLang", lang); // Asl tanlangan qiymatni saqlash
  
  // Dropdown'da ko'rsatiladigan matn
  const displayText = 
  lang === "SystemLang" ? "System" :
  lang === "en" ? "English" :
  lang === "ru" ? "Russian" :
  "Uzbek";
  
  document.getElementById("selected-lang").textContent = displayText;
}

// Dropdown til tanlash event
document.querySelectorAll(".dropdown a[data-lang]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const selectedLang = link.getAttribute("data-lang");
    setLanguage(selectedLang);
  });
});

loadTranslations();
// Translate Language Switcher

