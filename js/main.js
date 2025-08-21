// js 
function showToast(message) {
  const toast = document.getElementById("Toast");
  const notif = document.getElementById("toast-notif");
  
  notif.innerText = message; // Matnni yozish
  toast.classList.add("show");

  // sound
  const audio = new Audio("../sounds/notification.wav"); // o'zingizni audio faylingiz
  audio.volume = 0.7;
  audio.play();

  // second
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// All [toast]
document.querySelectorAll("[toast]").forEach(el => {
  el.addEventListener("click", () => {
    const message = el.getAttribute("toast-text") || "OK!";
    showToast(message);
  });
});
// Show toast function with dynamic SVG
function showToast(message, color, type = "success") {
  const toast = document.getElementById("Toast");
  const notif = document.getElementById("toast-notif");

  notif.innerText = message;
  toast.style.borderLeft = `3px solid ${color}`;
  toast.style.color = color;

  // Change SVG based on type
  const svgHTML = type === "error" 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
         <path fill="currentColor" d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95z"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
         <path fill="currentColor" d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/>
       </svg>`;

  toast.innerHTML = svgHTML + `<p id="toast-notif">${message}</p>`;

  toast.classList.add("show");

  // Optional sound
  const audio = new Audio("../sounds/notification.wav");
  audio.volume = 0.7;
  audio.play();

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// Form validation + send message loader
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("send-mess");
const originalBtnHTML = submitBtn.innerHTML; 
const originalBtnBorder = submitBtn.style.border; 
const originalBtnColor = submitBtn.style.color;

// Save original border for each input
const inputs = form.querySelectorAll("input, textarea");
const originalInputBorders = [];
inputs.forEach(input => originalInputBorders.push(input.style.border || ""));

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let hasEmpty = false;

  inputs.forEach((input, idx) => {
    if (!input.value.trim()) {
      input.style.border = "3px solid #FF0000"; 
      hasEmpty = true;
    } else {
      input.style.border = "3px solid #39FF14"; 
    }
  });

  if (hasEmpty) {
    submitBtn.style.border = "3px solid #FF0000";
    submitBtn.style.color = "#FF0000";
    showToast("Please fill all required fields!", "#FF0000", "error");
  } else {
    submitBtn.style.border = "3px solid #39FF14";
    submitBtn.style.color = "#39FF14";

    // Replace button content with loading SVG
    submitBtn.innerHTML = `
      Sending
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z" opacity="0.5"/>
        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z" transform="rotate(0 12 12)">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;

    setTimeout(() => {
      showToast("Message sent!", "#39FF14", "success");

      // Restore button original
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.style.border = originalBtnBorder;
      submitBtn.style.color = originalBtnColor;

      // Clear inputs and restore original borders
      inputs.forEach((input, idx) => {
        input.value = "";
        input.style.border = originalInputBorders[idx];
      });
    }, 3000);
  }
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

