const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
document.getElementById("year").textContent = new Date().getFullYear();

function setMenu(open) {
  mainNav.classList.toggle("open", open);
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuToggle.addEventListener("click", e => { e.stopPropagation(); setMenu(!mainNav.classList.contains("open")); });
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", e => { if (!mainNav.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map(l => document.querySelector(l.getAttribute("href")));
function updateActive() {
  const y = window.scrollY + 140;
  let current = sections[0];
  sections.forEach(s => { if (s.offsetTop <= y) current = s; });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
  navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current.id));
}
window.addEventListener("scroll", updateActive, { passive: true });
updateActive();

const targets = document.querySelectorAll(".section-heading, .about-text, .skill-card, .project-card, .contact-box");
targets.forEach(el => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  targets.forEach(el => io.observe(el));
} else targets.forEach(el => el.classList.add("visible"));