// Esperamos a que todo el contenido del DOM se cargue.
document.addEventListener('DOMContentLoaded', function () {
    initializeSmoothScroll();
    initializeCarousel();
    initializeAccordion();
    initializeServiceModal();
    initializeAllyModal();
});

// ==========================================================
// Lógica para los botones de menú y smooth scroll
// ==========================================================
function initializeSmoothScroll() {
    // Aplica "smooth scroll" a todos los enlaces de navegación y botones
    // con 'href' que comienzan con '#'.
    document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajustamos la posición para dejar un espacio superior de 80px.
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}