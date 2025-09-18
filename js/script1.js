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

// ==========================================================
// Lógica para el carrusel de aliados
// ==========================================================
function initializeCarousel() {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');

  if (!carousel || items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;

  // Función principal para actualizar la posición del carrusel y los indicadores.
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualiza el estado 'active' de los indicadores.
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  // Event listeners para los botones de navegación del carrusel.
  prevBtn.addEventListener('click', function () {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', function () {
    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Event listeners para los indicadores (navegación directa).
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function () {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateCarousel();
    });
  });

  // Deslizamiento automático del carrusel cada 5 segundos.
  setInterval(function () {
    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  }, 5000);
}

// ==========================================================
// Lógica para el acordeón (FAQ)
// ==========================================================
function initializeAccordion() {
  const accordionBtns = document.querySelectorAll('.accordion-btn');

  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function () {
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
}

// ===================================
// Lógica para el modal de servicios
// ===================================
function initializeServiceModal() {
  const serviceModal = document.getElementById('service-modal');
  const closeServiceModalBtn = document.getElementById('close-service-modal');
  const serviceModalBody = document.getElementById('service-modal-body');

  // Selecciona todos los botones de "Más detalles"
  const moreButtons = document.querySelectorAll('.btn-more');

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

  // Event listeners para botones "Más detalles"
  moreButtons.forEach(button => {
    // Toggle para mostrar/ocultar información
    button.addEventListener('click', () => {
      const info = button.nextElementSibling;
      info.classList.toggle('show');
      button.classList.toggle('active');
    });

    // Abre el modal de servicio al hacer clic en el botón '+'
    button.addEventListener('click', (e) => {
      // Prevenimos que el evento se propague para evitar conflictos
      e.stopPropagation();

      const serviceId = button.dataset.service;
      const data = serviceData[serviceId];

      if (data) {
        // Inserta el contenido en el modal
        serviceModalBody.innerHTML = `
                    <div class="modal-icon">${data.icon}</div>
                    <h3 class="modal-title">${data.title}</h3>
                    <p class="modal-description">${data.description}</p>
                `;
        serviceModal.style.display = 'flex';
      }
    });
  });

  // Cierra el modal
  closeServiceModalBtn.addEventListener('click', () => {
    serviceModal.style.display = 'none';
  });

  // Cierra el modal si el usuario hace clic fuera de él
  window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      serviceModal.style.display = 'none';
    }
  });
}

// ===================================
// Lógica para el modal de aliados con carrusel
// ===================================
function initializeAllyModal() {
  const allyModal = document.getElementById('ally-modal');
  const closeAllyModal = document.querySelector('.close-modal');
  const modalSlides = document.querySelectorAll('.modal-slide');
  const modalIndicators = document.querySelectorAll('.modal-indicator');
  const modalPrevBtn = document.querySelector('.modal-prev');
  const modalNextBtn = document.querySelector('.modal-next');

  if (!allyModal || modalSlides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = modalSlides.length;
  let carouselInterval;

  // Función para mostrar un slide específico
  function showSlide(index) {
    // Oculta todos los slides
    modalSlides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Muestra el slide seleccionado
    modalSlides[index].classList.add('active');

    // Actualiza los indicadores
    modalIndicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    modalIndicators[index].classList.add('active');

    currentSlide = index;
  }

  // Iniciar carrusel automático
  function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= totalSlides) newIndex = 0;
      showSlide(newIndex);
    }, 5000);
  }

  // Detener carrusel automático
  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  // Event listeners para los controles del carrusel
  modalPrevBtn.addEventListener('click', function () {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = totalSlides - 1;
    showSlide(newIndex);
    startCarousel(); // Reinicia el intervalo al interactuar manualmente
  });

  modalNextBtn.addEventListener('click', function () {
    let newIndex = currentSlide + 1;
    if (newIndex >= totalSlides) newIndex = 0;
    showSlide(newIndex);
    startCarousel(); // Reinicia el intervalo al interactuar manualmente
  });

  // Event listeners para los indicadores
  modalIndicators.forEach(indicator => {
    indicator.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      showSlide(index);
      startCarousel(); // Reinicia el intervalo al interactuar manualmente
    });
  });

  // Abrir modal al hacer clic en un aliado
  const allyItems = document.querySelectorAll('.ally-item');
  allyItems.forEach(item => {
    item.addEventListener('click', function () {
      const allyType = this.getAttribute('data-ally');

      // Mapear el tipo de aliado al índice del slide
      const allyIndexMap = {
        'telemedicina': 0,
        'salud': 1,
        'farmacia': 2,
        'servicios': 3,
        'calzado': 4,
        'mascotas': 5,
        'restaurantes': 6
      };

      const slideIndex = allyIndexMap[allyType];
      if (slideIndex !== undefined) {
        showSlide(slideIndex);
        allyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        startCarousel();
      }
    });
  });

  // Cerrar modal
  closeAllyModal.addEventListener('click', function () {
    allyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    stopCarousel();
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function (event) {
    if (event.target === allyModal) {
      allyModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      stopCarousel();
    }
  });

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && allyModal.style.display === 'block') {
      allyModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      stopCarousel();
    }

    // Navegación con teclado
    if (allyModal.style.display === 'block') {
      if (event.key === 'ArrowLeft') {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = totalSlides - 1;
        showSlide(newIndex);
        startCarousel();
      } else if (event.key === 'ArrowRight') {
        let newIndex = currentSlide + 1;
        if (newIndex >= totalSlides) newIndex = 0;
        showSlide(newIndex);
        startCarousel();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("btn-scroll-top");

  // Muestra u oculta el botón al hacer scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) { // El número 200 es la distancia en pixeles que se debe desplazar para que el botón aparezca
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const openModalBtn = document.querySelector('.open-modal-btn');
  const modal = document.getElementById('about-modal');
  const closeModalBtn = document.querySelector('.close-modal');

  // Abre el modal al hacer clic en el botón
  openModalBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Previene el comportamiento por defecto del enlace
    modal.style.display = 'block';
  });

  // Cierra el modal al hacer clic en el botón de cierre (X)
  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Cierra el modal si el usuario hace clic fuera del contenido
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});