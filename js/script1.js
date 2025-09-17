// Menú móvil
const toggle = document.getElementById("mobileToggle");
const menu = document.getElementById("mobileMenu");

toggle.addEventListener("click", () => {
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  toggle.setAttribute(
    "aria-expanded",
    menu.style.display === "flex" ? "true" : "false"
  );
});

// Formulario rápido
document.getElementById("quickForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("¡Gracias! Pronto nos pondremos en contacto.");
});

// Formulario contacto
document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Solicitud enviada. Te responderemos en menos de 48 horas hábiles.");
});
