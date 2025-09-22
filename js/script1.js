/*=====================================
      # DOM Content Loaded
    =====================================*/
document.addEventListener('DOMContentLoaded', () => {
  initializeSmoothScroll();
  initializeAlliesCarousel();
  initializeScrollTop();
  initializeServiceCards();
  initializeModals();
  initializeBeneficiosModal();
  initializeAllyModal();
  initializeDescuentosModal();
});

/*=====================================
  # Smooth Scroll
=====================================*/
function initializeSmoothScroll() {
  document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

/*=====================================
  # Allies Carousel
=====================================*/
function initializeAlliesCarousel() {
  const carousel = document.querySelector('.allies-carousel');
  const items = document.querySelectorAll('.ally-item');
  const prevBtn = document.querySelector('.allies-carousel-control.prev');
  const nextBtn = document.querySelector('.allies-carousel-control.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!carousel || items.length === 0) return;

  let currentIndex = 0;

  const getItemsPerView = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  };

  const updateCarousel = () => {
    const itemsPerView = getItemsPerView();
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(carousel).gap || 0);
    const totalPages = Math.ceil(items.length / itemsPerView);

    // Limita currentIndex
    if (currentIndex >= totalPages) currentIndex = totalPages - 1;

    const translateX = currentIndex * itemsPerView * itemWidth;
    carousel.style.transform = `translateX(-${translateX}px)`;

    // Actualiza indicadores
    if (indicatorsContainer) {
      const indicators = indicatorsContainer.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    // Controles
    if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = currentIndex === totalPages - 1 ? 'none' : 'block';
  };

  const createIndicators = () => {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = '';
    const totalPages = Math.ceil(items.length / getItemsPerView());
    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === currentIndex) indicator.classList.add('active');
      indicator.setAttribute('data-index', i);
      indicator.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(indicator);
    }
  };

  prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateCarousel();
  });

  nextBtn?.addEventListener('click', () => {
    const totalPages = Math.ceil(items.length / getItemsPerView());
    if (currentIndex < totalPages - 1) currentIndex++;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    createIndicators();
    updateCarousel();
  });

  createIndicators();
  updateCarousel();
}

/*=====================================
  # Scroll to Top Button
=====================================*/
function initializeScrollTop() {
  const scrollBtn = document.getElementById("btn-scroll-top");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 200);
  });

  // Add click event to scroll to top
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/*=====================================
  # Service Cards (Toggle)
=====================================*/
function initializeServiceCards() {
  const moreButtons = document.querySelectorAll('.btn-more');

  moreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const info = button.nextElementSibling;
      const icon = button.querySelector('i');

      if (info && icon) {
        info.classList.toggle('show');
        button.classList.toggle('active');
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
      }
    });
  });
}

/*=====================================
  # Modals
=====================================*/
function initializeModals() {
  // About modal
  const aboutModal = document.getElementById('about-modal');
  const openAboutModalBtn = document.getElementById('open-about-modal');
  const closeAboutModalBtn = document.querySelector('#about-modal .close-modal');

  // Plans modal
  const plansModal = document.getElementById('planesModal');
  const openPlansModalBtn = document.getElementById('open-plans-modal');
  const closePlansModalBtn = document.querySelector('#planesModal .close-btn');

  // Open about modal
  if (openAboutModalBtn && aboutModal) {
    openAboutModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      aboutModal.classList.add('show');
    });
  }

  // Close about modal
  if (closeAboutModalBtn && aboutModal) {
    closeAboutModalBtn.addEventListener('click', () => {
      aboutModal.classList.remove('show');
    });
  }

  // Open plans modal
  if (openPlansModalBtn && plansModal) {
    openPlansModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      plansModal.classList.add('show');
    });
  }

  // Close plans modal
  if (closePlansModalBtn && plansModal) {
    closePlansModalBtn.addEventListener('click', () => {
      plansModal.classList.remove('show');
    });
  }

  // Close modals by clicking outside
  window.addEventListener('click', (e) => {
    if (aboutModal && e.target === aboutModal) {
      aboutModal.classList.remove('show');
    }
    if (plansModal && e.target === plansModal) {
      plansModal.classList.remove('show');
    }
    // Agregar la nueva modal
    const serviciosModal = document.getElementById('serviciosModal');
    if (serviciosModal && e.target === serviciosModal) {
      serviciosModal.classList.remove('show');
    }
  });
}


/*=====================================
  # Beneficios Modal (SOLO para Beneficios)
=====================================*/
function initializeBeneficiosModal() {
  const serviciosModal = document.getElementById('serviciosModal');
  const closeServiciosModalBtn = document.querySelector('#serviciosModal .close-btn');

  // Asignar evento SOLO al botón de beneficios
  const descubreBeneficiosBtn = document.getElementById('open-beneficios-modal');

  if (descubreBeneficiosBtn && serviciosModal) {
    descubreBeneficiosBtn.addEventListener('click', function (e) {
      e.preventDefault();
      serviciosModal.classList.add('show');
    });
  }

  // Close servicios modal
  if (closeServiciosModalBtn && serviciosModal) {
    closeServiciosModalBtn.addEventListener('click', () => {
      serviciosModal.classList.remove('show');
    });
  }

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && serviciosModal && serviciosModal.classList.contains('show')) {
      serviciosModal.classList.remove('show');
    }
  });
}


// Datos de los aliados (debes completar con los enlaces reales)
const aliadosData = {
  salud: [
    { nombre: "AlterGold", imagen: "img/aliadosImg/SaludyBienestar/altergold.png", enlace: "http://intranetaltergold.sigmadental.net/" },
    { nombre: "Buena Vida", imagen: "img/aliadosImg/SaludyBienestar/buenaVida1.png", enlace: "https://www.instagram.com/centroclinicobuenavida/?hl=en" },
    { nombre: "Centro Medico Castillito", imagen: "img/aliadosImg/SaludyBienestar/centroMedicoCastillito.png", enlace: "https://www.instagram.com/cmcastillitopzo/?hl=en" },
    { nombre: "Laboatención", imagen: "img/aliadosImg/SaludyBienestar/laboatencion.png", enlace: "https://www.instagram.com/laboatencion/" },
    { nombre: "Opticolor", imagen: "img/aliadosImg/SaludyBienestar/opticolor.png", enlace: "https://opticolor.com.ve/" },
    { nombre: "Optica Caroni", imagen: "img/aliadosImg/SaludyBienestar/opticaCaroni.png", enlace: "https://opticacaroni.com/" },
    { nombre: "SonoLife", imagen: "img/aliadosImg/SaludyBienestar/sonolife.png", enlace: "https://www.instagram.com/sonolife.ve/?hl=en" },
    { nombre: "RehabPlus", imagen: "img/aliadosImg/SaludyBienestar/rehabplus.png", enlace: "https://www.facebook.com/100066210745136/about/?locale=es_ES&_rdr" },
    // Agrega más aliados de salud aquí
  ],
  farmacia: [
    { nombre: "Farmacia Carmencita", imagen: "img/aliadosImg/Farmacia/farmaciaCarmencita.png", enlace: "https://www.facebook.com/farmacia.carmencitacpno/" },
    { nombre: "Farmacia Doctoral", imagen: "img/aliadosImg/Farmacia/farmaciaDoctoral.jpeg", enlace: "https://www.instagram.com/farmaciadoctoral/reels/" },
    { nombre: "Farmacia Las Flores", imagen: "img/aliadosImg/Farmacia/farmaciaLasFlores.png", enlace: "https://www.instagram.com/farmacia_lasflores/reels/" },
    { nombre: "Grupo de Farmacias Girasol", imagen: "img/aliadosImg/Farmacia/farmaciasGirasol.png", enlace: "https://farmagirasol.com/" },
    { nombre: "Farmacia Yari", imagen: "img/aliadosImg/Farmacia/farmaciaYari.png", enlace: "https://ejemplo.com/farmacia2" },
    { nombre: "FarmaDaily", imagen: "img/aliadosImg/Farmacia/farmaDaily.jpeg", enlace: "https://ejemplo.com/farmacia2" },
    { nombre: "FarmaOferta", imagen: "img/aliadosImg/Farmacia/farmaOferta.png", enlace: "https://ejemplo.com/farmacia2" },
    { nombre: "Farmaser", imagen: "img/aliadosImg/Farmacia/farmaser.png", enlace: "https://ejemplo.com/farmacia2" },
    { nombre: "Farmatención", imagen: "img/aliadosImg/Farmacia/farmatension.png", enlace: "https://ejemplo.com/farmacia2" },
    { nombre: "Farmapaz", imagen: "img/aliadosImg/Farmacia/farmapaz.png", enlace: "https://ejemplo.com/farmacia2" },
    // Agrega más aliados de farmacia aquí
  ],
  servicios: [
    { nombre: "Credimport", imagen: "img/aliadosImg/Servicios/credimport.png", enlace: "https://ejemplo.com/servicios1" },
    { nombre: "Concepto50", imagen: "img/aliadosImg/Servicios/concepto50.png", enlace: "https://ejemplo.com/servicios2" },
    { nombre: "Gama", imagen: "img/aliadosImg/Servicios/gama.png", enlace: "https://ejemplo.com/servicios2" },
    { nombre: "Full Motors", imagen: "img/aliadosImg/Servicios/fullmotors.png", enlace: "https://ejemplo.com/servicios2" },
    { nombre: "Turaser", imagen: "img/aliadosImg/Servicios/turaser.png", enlace: "https://ejemplo.com/servicios2" },
    { nombre: "Valeo", imagen: "img/aliadosImg/Servicios/valeo.png", enlace: "https://ejemplo.com/servicios2" },
    { nombre: "Wonderland", imagen: "img/aliadosImg/Servicios/wonderland.png", enlace: "https://ejemplo.com/servicios2" },
    // Agrega más aliados de servicios aquí
  ],
  calzado: [
    { nombre: "Converse", imagen: "img/aliadosImg/RopayCalzado/converse.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "Cerere", imagen: "img/aliadosImg/RopayCalzado/Cerere.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "Everlast", imagen: "img/aliadosImg/RopayCalzado/Everlast.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "Havaianas", imagen: "img/aliadosImg/RopayCalzado/havaianas.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "LucyLingerie", imagen: "img/aliadosImg/RopayCalzado/LucyLingerie.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "Modas", imagen: "img/aliadosImg/RopayCalzado/Modas.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "TuOutlet", imagen: "img/aliadosImg/RopayCalzado/tuoutlet1.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "SportWay", imagen: "img/aliadosImg/RopayCalzado/SportWay.png", enlace: "https://ejemplo.com/calzado1" },
    // Agrega más aliados de calzado aquí
  ],
  mascotas: [
    { nombre: "Club Ev", imagen: "img/aliadosImg/Mascotas/clubev.png", enlace: "https://ejemplo.com/mascotas1" },
    { nombre: "Egoavil Sardiñas Veterinarios", imagen: "img/aliadosImg/Mascotas/egoavilsardiñas.png", enlace: "https://ejemplo.com/mascotas2" },
    // Agrega más aliados de mascotas aquí
  ],
  restaurantes: [
    { nombre: "La Grand Plaz", imagen: "img/aliadosImg/Restaurantes/lagrandplaz.png", enlace: "https://ejemplo.com/restaurantes1" },
    { nombre: "Sotano 7", imagen: "img/aliadosImg/Restaurantes/sotano7.png", enlace: "https://ejemplo.com/restaurantes2" },
    { nombre: "Vecchio Caminetto", imagen: "img/aliadosImg/Restaurantes/vecchioCaminetto.png", enlace: "https://ejemplo.com/restaurantes2" },
    // Agrega más aliados de restaurantes aquí
  ],
  TelemedicinaMascotas: [
    { nombre: "Telemedicina1", imagen: "img/aliadosImg/restaurantes1.jpg", enlace: "https://ejemplo.com/restaurantes1" },
    { nombre: "Telemedicina2", imagen: "img/aliadosImg/restaurantes2.jpg", enlace: "https://ejemplo.com/restaurantes2" },
    // Agrega más aliados de restaurantes aquí
  ]
};

/*=====================================
  # Aliados Modal con Carrusel (Función unificada)
=====================================*/
function initializeAllyModal() {
  const allyItems = document.querySelectorAll('.ally-item');
  const aliadosModal = document.getElementById('aliadosModal');

  if (!allyItems.length || !aliadosModal) return;

  const modalTitle = document.getElementById('modalAliadosTitle');
  const closeModalBtn = aliadosModal.querySelector('.close-btn');

  // Datos completos de aliados (usando el objeto que ya tenías definido arriba)
  // NOTA: Eliminé el objeto duplicado que estaba dentro de esta función

  // Eventos para abrir el modal
  allyItems.forEach(item => {
    item.addEventListener('click', () => {
      const allyType = item.getAttribute('data-ally');
      const allyTitle = item.querySelector('h3').textContent;
      openAllyModal(allyType, allyTitle);
    });
  });

  function openAllyModal(allyType, allyTitle) {
    // Establecer el título del modal
    modalTitle.textContent = allyTitle;

    // Limpiar el carrusel existente
    const modalCarousel = document.querySelector('.modal-carousel');
    const modalIndicators = document.querySelector('.modal-carousel-indicators');

    if (modalCarousel) modalCarousel.innerHTML = '';
    if (modalIndicators) modalIndicators.innerHTML = '';

    // Obtener aliados para esta categoría
    const aliados = aliadosData[allyType] || [];

    if (aliados.length === 0) {
      // Mostrar mensaje si no hay aliados
      if (modalCarousel) {
        modalCarousel.innerHTML = '<p class="no-aliados">Próximamente más aliados en esta categoría.</p>';
      }
    } else {
      // Crear elementos del carrusel
      aliados.forEach((aliado, index) => {
        const allyElement = document.createElement('div');
        allyElement.className = 'modal-carousel-item';
        allyElement.innerHTML = `
          <a href="${aliado.enlace}" target="_blank" class="aliado-modal-link">
            <div class="modal-ally-image">
              <img src="${aliado.imagen}" alt="${aliado.nombre}">
            </div>
            <div class="modal-ally-content">
              <h3>${aliado.nombre}</h3>
              <p>${aliado.descripcion || 'Aliado de Club Estar Bien'}</p>
            </div>
          </a>
        `;
        if (modalCarousel) modalCarousel.appendChild(allyElement);

        // Crear indicadores
        if (modalIndicators) {
          const indicator = document.createElement('div');
          indicator.className = 'indicator';
          indicator.dataset.index = index;
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => {
            goToSlide(index);
          });
          modalIndicators.appendChild(indicator);
        }
      });

      // Inicializar el carrusel del modal
      initModalCarousel();
    }

    // Mostrar el modal
    aliadosModal.classList.add('show');
  }

  // Variables para el control del carrusel
  let currentIndex = 0;
  let itemsPerView = 3;

  function initModalCarousel() {
    const carousel = document.querySelector('.modal-carousel');
    const items = document.querySelectorAll('.modal-carousel-item');
    const prevBtn = document.querySelector('.modal-carousel-control.prev');
    const nextBtn = document.querySelector('.modal-carousel-control.next');

    if (!carousel || !items.length) return;

    // Calcular items por vista según el tamaño de pantalla
    updateItemsPerView();

    // Event listeners para controles
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }

    // Inicializar
    updateCarousel();

    // Redimensionamiento de ventana
    window.addEventListener('resize', () => {
      updateItemsPerView();
      updateCarousel();
    });
  }

  function updateItemsPerView() {
    if (window.innerWidth <= 768) {
      itemsPerView = 1;
    } else if (window.innerWidth <= 992) {
      itemsPerView = 2;
    } else {
      itemsPerView = 3;
    }
  }

  function updateCarousel() {
    const carousel = document.querySelector('.modal-carousel');
    const items = document.querySelectorAll('.modal-carousel-item');
    const indicators = document.querySelectorAll('.modal-carousel-indicators .indicator');

    if (!carousel || !items.length) return;

    const itemWidth = items[0].offsetWidth + 20; // width + gap
    const translateX = -currentIndex * itemWidth * itemsPerView;
    carousel.style.transform = `translateX(${translateX}px)`;

    // Actualizar indicadores
    if (indicators.length) {
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
      });
    }

    // Mostrar/ocultar controles según la posición
    const prevBtn = document.querySelector('.modal-carousel-control.prev');
    const nextBtn = document.querySelector('.modal-carousel-control.next');
    const totalItems = items.length;

    if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = currentIndex >= Math.ceil(totalItems / itemsPerView) - 1 ? 'none' : 'block';
  }

  function nextSlide() {
    const items = document.querySelectorAll('.modal-carousel-item');
    if (currentIndex < Math.ceil(items.length / itemsPerView) - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Cerrar modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      aliadosModal.classList.remove('show');
    });
  }

  // Cerrar modal al hacer clic fuera del contenido
  aliadosModal.addEventListener('click', (e) => {
    if (e.target === aliadosModal) {
      aliadosModal.classList.remove('show');
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aliadosModal.classList.contains('show')) {
      aliadosModal.classList.remove('show');
    }
  });
}

function initializeDescuentosModal() {
  const descuentosModal = document.getElementById('descuentosModal');
  const openDescuentosModalBtn = document.getElementById('open-descuentos-modal');
  const closeDescuentosModalBtn = descuentosModal?.querySelector('.close-btn');

  // Abrir modal de descuentos
  if (openDescuentosModalBtn && descuentosModal) {
    openDescuentosModalBtn.addEventListener('click', function (e) {
      e.preventDefault();
      descuentosModal.classList.add('show');
    });
  }

  // Cerrar modal de descuentos
  if (closeDescuentosModalBtn && descuentosModal) {
    closeDescuentosModalBtn.addEventListener('click', function () {
      descuentosModal.classList.remove('show');
    });
  }

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function (e) {
    if (descuentosModal && e.target === descuentosModal) {
      descuentosModal.classList.remove('show');
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && descuentosModal && descuentosModal.classList.contains('show')) {
      descuentosModal.classList.remove('show');
    }
  });
}

// Datos de los planes
const plansData = {
  basico: {
    title: "Plan Básico",
    price: "$2",
    coverages: [
      { service: "Telemedicina 24/7", coverage: "Ilimitado", limit: "-" },
      { service: "Atención médica domiciliaria", coverage: "Para la persona", limit: "1 evento" },
      { service: "Traslado en ambulancia", coverage: "Urgencia-Emergencia", limit: "1 evento" },
      { service: "Servicio de Plomeria, Cerrajeria u Electricidad", coverage: "Para el hogar", limit: "1 evento (Hasta 40$ de Cobertura)" },
      { service: "Reparacion In Situ (Cambios de neumatico y falla de Bateria)", coverage: "Para el Vehiculo", limit: "1 evento" },
    ],
    benefits: [
      "Acceso a descuentos en farmacias aliadas",
      "Soporte técnico 24/7",
      "App móvil incluida",
      "Vigencia Mensual, Servicios no Acumulativos"
    ]
  },
  estandar: {
    title: "Plan Estándar",
    price: "$15",
    coverages: [
      { service: "Telemedicina 24/7", coverage: "Ilimitado", limit: "-" },
      { service: "Atención médica domiciliaria", coverage: "Para la persona", limit: "3 eventos" },
      { service: "Traslado en ambulancia", coverage: "Urgencia-Emergencia", limit: "3 eventos" },
      { service: "Asistencia en el hogar", coverage: "Plomería, electricidad, cerrajería", limit: "2 eventos" }
    ],
    benefits: [
      "Todos los beneficios del Plan Básico",
      "Descuentos ampliados en más aliados",
      "Prioridad en la atención",
      "Recordatorios personalizados",
      "Informes mensuales de uso"
    ]
  },
  premium: {
    title: "Plan Premium",
    price: "$25",
    coverages: [
      { service: "Telemedicina 24/7", coverage: "Ilimitado", limit: "-" },
      { service: "Atención médica domiciliaria", coverage: "Para la persona", limit: "5 eventos" },
      { service: "Traslado en ambulancia", coverage: "Urgencia-Emergencia", limit: "5 eventos" },
      { service: "Asistencia en el hogar", coverage: "Plomería, electricidad, cerrajería", limit: "5 eventos" },
      { service: "Asistencia vehicular", coverage: "Batería, neumáticos, problemas eléctricos", limit: "3 eventos" }
    ],
    benefits: [
      "Todos los beneficios del Plan Estándar",
      "Descuentos premium en todos los aliados",
      "Atención prioritaria 24/7",
      "Asistencia personalizada",
      "Informes detallados mensuales",
      "Acceso a eventos exclusivos"
    ]
  }
};

// Elementos del DOM
const planesModal = document.getElementById('planesModal');
const planDetailsModal = document.getElementById('planDetailsModal');
const openPlansModalBtn = document.getElementById('open-plans-modal');
const closePlansModalBtn = document.querySelector('#planesModal .close-btn');
const closePlanDetailsBtn = document.getElementById('close-plan-details');
const closeDetailsBtn = document.getElementById('closeDetailsBtn');
const planDetailsTitle = document.getElementById('planDetailsTitle');
const planDetailsPrice = document.getElementById('planDetailsPrice');
const coverageTableBody = document.getElementById('coverageTableBody');
const planBenefits = document.getElementById('planBenefits');
const planCards = document.querySelectorAll('.plan-card');

// Abrir modal de planes
openPlansModalBtn.addEventListener('click', () => {
  planesModal.classList.add('show');
});

// Cerrar modal de planes
closePlansModalBtn.addEventListener('click', () => {
  planesModal.classList.remove('show');
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === planesModal) {
    planesModal.classList.remove('show');
  }
  if (e.target === planDetailsModal) {
    planDetailsModal.classList.remove('show');
  }
});

// Abrir detalles del plan
planCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Evitar que se active si se hace clic en el botón
    if (e.target.classList.contains('plan-button') || e.target.closest('.plan-button')) {
      return;
    }

    const planType = card.getAttribute('data-plan');
    openPlanDetails(planType);
  });

  // También permitir abrir detalles con el botón
  const button = card.querySelector('.plan-button');
  button.addEventListener('click', () => {
    const planType = card.getAttribute('data-plan');
    openPlanDetails(planType);
  });
});

// Función para abrir los detalles del plan
function openPlanDetails(planType) {
  const plan = plansData[planType];

  if (!plan) return;

  // Actualizar título y precio
  planDetailsTitle.textContent = plan.title;
  planDetailsPrice.textContent = plan.price;

  // Limpiar y llenar la tabla de coberturas
  coverageTableBody.innerHTML = '';
  plan.coverages.forEach(coverage => {
    const row = document.createElement('tr');
    row.innerHTML = `
                    <td>${coverage.service}</td>
                    <td>${coverage.coverage}</td>
                    <td class="coverage-limit">${coverage.limit}</td>
                `;
    coverageTableBody.appendChild(row);
  });

  // Limpiar y llenar los beneficios
  planBenefits.innerHTML = '';
  plan.benefits.forEach(benefit => {
    const benefitItem = document.createElement('div');
    benefitItem.className = 'benefit-item';
    benefitItem.innerHTML = `
                    <div class="benefit-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="benefit-text">${benefit}</div>
                `;
    planBenefits.appendChild(benefitItem);
  });

  // Mostrar el modal de detalles
  planDetailsModal.classList.add('show');
}

// Cerrar modal de detalles
closePlanDetailsBtn.addEventListener('click', () => {
  planDetailsModal.classList.remove('show');
});

closeDetailsBtn.addEventListener('click', () => {
  planDetailsModal.classList.remove('show');
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    planesModal.classList.remove('show');
    planDetailsModal.classList.remove('show');
  }
});