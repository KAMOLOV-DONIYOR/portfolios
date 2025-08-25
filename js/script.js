const sections = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // faqat bir marta ishlash uchun
    }
  });
}, {
  threshold: 0.2 // elementning 20% qismi ko‘ringanda animatsiya boshlanadi
});

sections.forEach(section => {
  observer.observe(section);
});
