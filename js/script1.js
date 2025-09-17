// Esperamos a que todo el contenido del DOM se cargue.
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    // Lógica para los botones de menú y smooth scroll
    // ==========================================================
    // Aplica "smooth scroll" a todos los enlaces de navegación y botones
    // con 'href' que comienzan con '#'.
    document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ==========================================================
    // Lógica para el carrusel de aliados
    // ==========================================================
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    let currentIndex = 0;
    const totalItems = items.length;

    // Función principal para actualizar la posición del carrusel y los indicadores.
    function updateCarousel() {
        if (!carousel) return; // Aseguramos que el carrusel exista.

        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualiza el estado 'active' de los indicadores.
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Event listeners para los botones de navegación del carrusel.
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Event listeners para los indicadores (navegación directa).
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });

    // Deslizamiento automático del carrusel cada 5 segundos.
    setInterval(function() {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);

    // ==========================================================
    // Lógica para el acordeón (FAQ)
    // ==========================================================
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Cierra todos los acordeones si ya hay uno abierto.
            document.querySelectorAll('.accordion-content.show').forEach(item => {
                item.classList.remove('show');
            });
            document.querySelectorAll('.accordion-btn.active').forEach(item => {
                item.classList.remove('active');
            });

            // Abre o cierra el acordeón actual.
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('show');
            }
        });
    });
});
