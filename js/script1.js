// ==========================================================
// Lógica para los botones de menú
// ==========================================================
// Seleccionar los botones por sus IDs.
//const btnPaso1 = document.getElementById('btn-paso-1');
const btnPaso2 = document.getElementById('btn-paso-2');
//const btnPaso3 = document.getElementById('btn-paso-3');

// Añadir un evento de clic para cada botón.
/*btnPaso1.addEventListener('click', () => {
    // Redirige al usuario a la página de planes.
    alert('¡Excelente! Te redirigimos a la página de planes para que elijas el ideal para ti.');
    // Descomenta la siguiente línea para activar la redirección.
    // window.location.href = '#planes';
});*/

/*btnPaso2.addEventListener('click', () => {
    // Simula la acción de afiliarse.
    //alert('¡Genial! A continuación, serás dirigido a nuestra página de afiliación.');
    // Descomenta la siguiente línea para activar la redirección.
    // window.location.href = '#afiliacion';
});*/

/*btnPaso3.addEventListener('click', () => {
    // Muestra un mensaje de confirmación.
    alert('¡Felicidades! Ya estás listo para recibir atención inmediata de nuestros profesionales.');
});*/

// ==========================================================
// Lógica para el carrusel de aliados
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    let currentIndex = 0;
    const totalItems = items.length;

    // Función principal para actualizar la posición del carrusel y los indicadores.
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar el estado 'active' de los indicadores.
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Event listeners para los botones de navegación del carrusel (anterior y siguiente).
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
// Lógica para el smooth scroll
// ==========================================================
    // Aplica "smooth scroll" a todos los enlaces de navegación y botones con `href` que comienzan con '#'.
    document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Previene el comportamiento de salto predeterminado.
            const targetId = this.getAttribute('href');

            // Evita desplazarse si el href es solo '#'.
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajusta la posición para dejar un espacio superior de 80px.
                    behavior: 'smooth' // Habilita la animación de desplazamiento suave.
                });
            }
        });
    });
});
