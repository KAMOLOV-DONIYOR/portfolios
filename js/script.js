(function () {
  emailjs.init("0ODlPGUEoV2ppfTK-"); // Initialize EmailJS
})();

// DOM elements
const clForm = document.querySelector(".cl-form");
const clName = document.querySelector(".cl-name");
const clEmail = document.querySelector(".cl-email");
const clMessage = document.querySelector(".cl-message");
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("send-mess");

// Save original button style
const originalBtnHTML = submitBtn.innerHTML;
const originalBtnBorder = submitBtn.style.border;
const originalBtnColor = submitBtn.style.color;

// Save original input borders
const inputs = form.querySelectorAll("input, textarea");
const originalInputBorders = [];
inputs.forEach(input => originalInputBorders.push(input.style.border || ""));

// Form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check empty fields
  let hasEmpty = false;
  inputs.forEach((input, idx) => {
    if (!input.value.trim()) {
      input.style.border = "2px solid #FF0000";
      hasEmpty = true;
    } else {
      input.style.border = "2px solid #39FF14";
    }
  });

  // Language fallback
  let lang = localStorage.getItem("selectedLang") || getSystemLanguage();
  if (!translations[lang]) lang = "uz";

  if (hasEmpty) {
    submitBtn.style.border = "2px solid #FF0000";
    submitBtn.style.color = "#FF0000";
    showToast(translations[lang]["Plsfilltoast"], "#FF0000", 3000);
    return;
  }

  // Sending state
  submitBtn.innerHTML = `
    <p class="send-mes-p">${translations[lang]["SendingMes"]}</p>
    <svg class="svg-toas" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z" opacity="0.5"/>
      <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z" transform="rotate(0 12 12)">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
      </path>
    </svg>
  `;
  submitBtn.style.border = "2px solid #39FF14";
  submitBtn.style.color = "#39FF14";

  const clname = clName.value.trim();
  const clemail = clEmail.value.trim();
  const clmessage = clMessage.value.trim();

  // Send message to yourself
  emailjs.send("service_3i4c2v6", "template_sseaibl", {
    to_email: "kdoniyor213@gmail.com",
    message: `Isim: ${clname}\nEmail: ${clemail}\nXabar: ${clmessage}`
  })
  .then(function () {
    showToast(translations[lang]["SendingToast"], "#39FF14", 5000);

    // Reset button and inputs
    submitBtn.innerHTML = `
      <p class="send-mes-p">${translations[lang]["contactsendmessage"]}</p>
      <svg class="svg-toass" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M470.3 271.15L43.16 447.31a7.83 7.83 0 0 1-11.16-7V327a8 8 0 0 1 6.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 0 1-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 0 1 0 29.39"/>
      </svg>
    `;
    submitBtn.style.border = originalBtnBorder;
    submitBtn.style.color = originalBtnColor;

    inputs.forEach((input, idx) => {
      input.value = "";
      input.style.border = originalInputBorders[idx];
    });
  })
  .catch(function (error) {
    showToast(translations[lang]["erSendingToast"], "#FF0000", 5000);
    submitBtn.style.border = "2px solid #FF0000";
    submitBtn.style.color = "#FF0000";
    console.error(error);
  });
});
// Toast notification function