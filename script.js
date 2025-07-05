// Theme

const themeToggle = document.getElementById("themeToggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light" || (!currentTheme && !prefersDarkScheme.matches)) {
  document.documentElement.setAttribute("data-theme", "light");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// End Theme

// Hacker Text

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function applyTextEffect(element) {
  let iteration = 0;
  const originalText = element.innerText;

  if (!element.dataset.value) {
    element.dataset.value = originalText;
  }

  const interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);

  return interval;
}

// Apply to all h2 elements
document.querySelectorAll("#hacker").forEach((h2) => {
  h2.onmouseover = (event) => {
    if (event.target.interval) {
      clearInterval(event.target.interval);
    }
    event.target.interval = applyTextEffect(event.target);
  };
});
