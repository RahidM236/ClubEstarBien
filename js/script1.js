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

// Seleccionar los botones por sus ID
const btnPaso1 = document.getElementById('btn-paso-1');
const btnPaso2 = document.getElementById('btn-paso-2');
const btnPaso3 = document.getElementById('btn-paso-3');

// Añadir un evento de clic para cada botón
btnPaso1.addEventListener('click', () => {
  // Aquí puedes redirigir al usuario a una página de planes
  alert('¡Excelente! Te redirigimos a la página de planes para que elijas el ideal para ti.');
  // Ejemplo de redirección:
  // window.location.href = '#planes';
});

btnPaso2.addEventListener('click', () => {
  // Aquí se simula la acción de afiliarse
  alert('¡Genial! A continuación, serás dirigido a nuestra página de afiliación.');
  // Ejemplo de redirección:
  // window.location.href = '#afiliacion';
});

btnPaso3.addEventListener('click', () => {
  // Aquí se muestra un mensaje de confirmación
  alert('¡Felicidades! Ya estás listo para recibir atención inmediata de nuestros profesionales.');
});


