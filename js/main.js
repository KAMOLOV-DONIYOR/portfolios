const bar = document.getElementById("progress-bar");

// Step 1: Animate to 40% slowly (ease-out)
bar.style.transition = "width 1.2s ease-out";
bar.style.width = "40%";

// Step 2: Wait, then animate to 70% slowly
setTimeout(() => {
  bar.style.transition = "width 0.8s ease";
  bar.style.width = "70%";
}, 1200);

// Step 3: Wait again, then jump to 100% fast
setTimeout(() => {
  bar.style.transition = "width 0.4s ease-in";
  bar.style.width = "100%";
}, 1200);

// Step 4: Remove the bar after short delay
setTimeout(() => {
  bar.style.transition = "opacity 0.3s ease-out";
  bar.style.opacity = "0";
  setTimeout(() => {
    bar.remove();
    document.getElementById("progress-bg").remove();
  }, 300);
}, 2500);
