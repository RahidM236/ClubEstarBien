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

// ===================================
// Lógica para el modal de servicios
// ===================================

const serviceModal = document.getElementById('service-modal');
const closeServiceModalBtn = document.getElementById('close-service-modal');
const serviceModalBody = document.getElementById('service-modal-body');


// Selecciona todos los botones de "Más detalles"
const moreButtons = document.querySelectorAll('.btn-more');

moreButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Selecciona el párrafo (hidden-info) que está después del botón
    const info = button.nextElementSibling;

    // Alterna la clase 'show' en el párrafo
    info.classList.toggle('show');
    // Alterna la clase 'active' en el botón
    button.classList.toggle('active');
  });
});
// Datos detallados para cada servicio
const serviceData = {
  'telemedicina': {
    title: 'Telemedicina 24/7',
    description: 'Con nuestro servicio de telemedicina, tienes acceso inmediato a médicos calificados a través de videollamada y chat. Recibe diagnósticos, orientación, recetas digitales y seguimiento, todo desde la comodidad y seguridad de tu hogar.',
    icon: '🏥'
  },
  'domiciliaria': {
    title: 'Asistencia Médica Domiciliaria',
    description: 'Cuando la telemedicina no es suficiente, enviamos una unidad de emergencia con médico y paramédico directamente a tu domicilio. Te brindamos una evaluación completa, estabilización de la situación y el tratamiento inicial necesario, sin que tengas que desplazarte.',
    icon: '🏠'
  },
  'ambulancia': {
    title: 'Servicio de Ambulancia',
    description: 'En caso de una emergencia crítica, nuestro servicio activa el envío de una ambulancia básica o de unidad de cuidados intensivos (UCI). Nuestro equipo profesional te trasladará de manera segura y rápida al centro hospitalario más cercano para recibir la atención que necesitas.',
    icon: '🚑'
  },
  'hogar': {
    title: 'Asistencia en el Hogar',
    description: 'Te ayudamos con las emergencias inesperadas del hogar. Nuestro equipo de expertos está disponible para resolver problemas de plomería, electricidad y cerrajería de forma rápida, eficiente y profesional, dándote tranquilidad en tu día a día.',
    icon: '🔧'
  },
  'vehicular': {
    title: 'Asistencia Vehicular',
    description: 'No dejes que una falla mecánica arruine tu día. Brindamos asistencia inmediata para problemas comunes como batería descargada, cambio de neumático, problemas eléctricos menores y otros imprevistos, directamente donde te encuentres.',
    icon: '🚗'
  }
};

// Abre el modal de servicio al hacer clic en el botón '+'
moreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const serviceId = button.dataset.service;
    const data = serviceData[serviceId];

    // Inserta el contenido en el modal
    serviceModalBody.innerHTML = `
            <div class="modal-icon">${data.icon}</div>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-description">${data.description}</p>
        `;
    serviceModal.style.display = 'flex';
  });
});

// Cierra el modal
closeServiceModalBtn.addEventListener('click', () => {
  serviceModal.style.display = 'none';
});

// Cierra el modal si el usuario hace clic fuera de él
window.addEventListener('click', (e) => {
  if (e.target === serviceModal) {
    serviceModal.style.display = 'none';
  }
});
