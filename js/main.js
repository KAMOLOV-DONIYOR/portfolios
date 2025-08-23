// Unified showToast function with icon support and custom duration
function showToast(message, color = "#39FF14", duration = 3000) {
  const toast = document.getElementById("Toast");
  const notif = document.getElementById("toast-notif");
  const toastIcon = toast.querySelector("svg");
  
  notif.innerText = message;
  toast.style.borderLeft = `3px solid ${color}`;
  toast.style.color = color;
  
  // Set icon based on color (red = X, green = check)
  if (color === "#FF0000") {
    toastIcon.innerHTML = `
      <path fill="currentColor" d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414L13.414 10.586l4.95-4.95z"/>
    `;
  } else {
    toastIcon.innerHTML = `
      <path fill="currentColor" d="m9.55 18l-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175 1.425 1.425z"/>
    `;
  }
  
  toast.classList.add("show");
  
  // Optional sound
  const audio = new Audio("sounds/notification.mp3");
  audio.volume = 1;
  audio.play();
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// Form validation + send message loader
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("send-mess");
const originalBtnHTML = submitBtn.innerHTML;
const originalBtnBorder = submitBtn.style.border;
const originalBtnColor = submitBtn.style.color;

const inputs = form.querySelectorAll("input, textarea");
const originalInputBorders = [];
inputs.forEach((input) => originalInputBorders.push(input.style.border || ""));

form.addEventListener("submit", function (e) {
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
    showToast("Please fill all required fields!", "#FF0000", 3000); // 3 seconds
  } else {
    submitBtn.style.border = "3px solid #39FF14";
    submitBtn.style.color = "#39FF14";
    
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
      // Show green "message sent" toast for 8 seconds
      showToast(
        "The message was sent successfully, please wait for a response in your email!",
        "#39FF14",
        10000
      );
      
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.style.border = originalBtnBorder;
      submitBtn.style.color = originalBtnColor;
      
      inputs.forEach((input, idx) => {
        input.value = "";
        input.style.border = originalInputBorders[idx];
      });
    }, 6000);
  }
});

// Optional: [toast] attribute elements
document.querySelectorAll("[toast]").forEach((el) => {
  el.addEventListener("click", () => {
    const message = el.getAttribute("toast-text") || "OK!";
    showToast(message, "#39FF14", 3000);
  });
});

// Notification and contact me !

const copyText = document.getElementById("copyText");

copyText.addEventListener("click", () => {
  navigator.clipboard.writeText(copyText.innerText).then(() => {});
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
  const langCode = browserLang.split("-")[0]; // 'en-US' -> 'en'
  
  // Mavjud tillar ro'yxati
  const supportedLangs = ["en", "ru", "uz"];
  
  // Agar system tili mavjud bo'lsa, uni qaytarish
  if (supportedLangs.includes(langCode)) {
    return langCode;
  }
  
  // Aks holda English qaytarish
  return "en";
}

function setLanguage(lang) {
  let actualLang = lang;
  
  // Agar "SystemLang" tanlangan bo'lsa, system tilini aniqlash
  if (lang === "SystemLang") {
    actualLang = getSystemLanguage();
  }
  
  if (!translations[actualLang]) return;
  
  document.querySelectorAll("[lang]").forEach((el) => {
    const key = el.getAttribute("lang");
    if (translations[actualLang][key]) {
      el.textContent = translations[actualLang][key];
    }
  });
  
  localStorage.setItem("selectedLang", lang); // Asl tanlangan qiymatni saqlash
  
  // Dropdown'da ko'rsatiladigan matn
  const displayText =
  lang === "SystemLang"
  ? "System"
  : lang === "en"
  ? "English"
  : lang === "ru"
  ? "Russian"
  : "Uzbek";
  
  document.getElementById("selected-lang").textContent = displayText;
}

setLanguage("en");

// Dropdown til tanlash event
document.querySelectorAll(".dropdown a[data-lang]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLang = link.getAttribute("data-lang");
    setLanguage(selectedLang);
  });
});

loadTranslations();
// Translate Language Switcher


document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    const target = e.target.closest(".ripple");
    if (!target) return;

    const circle = document.createElement("span");
    const rect = target.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + "px";

    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";

    target.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});
