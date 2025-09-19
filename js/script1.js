/*=====================================
      # DOM Content Loaded
    =====================================*/
    document.addEventListener('DOMContentLoaded', () => {
      initializeSmoothScroll();
      initializeAlliesCarousel();
      initializeScrollTop();
      initializeServiceCards();
      initializeModals();
      initializeServiciosModal();
      initializeAliadosModal();
    });

    /*=====================================
      # Smooth Scroll
    =====================================*/
    function initializeSmoothScroll() {
      document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
        const totalPages = Math.max(1, Math.ceil(items.length / itemsPerView));
        
        // Ensure currentIndex is within bounds
        if (currentIndex >= totalPages) {
          currentIndex = totalPages - 1;
        }

        const translateValue = -currentIndex * (100 / itemsPerView);
        carousel.style.transform = `translateX(${translateValue}%)`;

        // Update indicators
        if (indicatorsContainer) {
          const indicators = indicatorsContainer.querySelectorAll('.indicator');
          indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
          });
        }

        // Hide/show controls if at ends
        if (prevBtn) {
          prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        }
        if (nextBtn) {
          nextBtn.style.display = currentIndex === totalPages - 1 ? 'none' : 'block';
        }
      };
      
      const createIndicators = () => {
        if (indicatorsContainer) {
          indicatorsContainer.innerHTML = '';
          const totalPages = Math.max(1, Math.ceil(items.length / getItemsPerView()));
          
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
        }
      };
      
      prevBtn?.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });

      nextBtn?.addEventListener('click', () => {
        const totalPages = Math.max(1, Math.ceil(items.length / getItemsPerView()));
        if (currentIndex < totalPages - 1) {
          currentIndex++;
          updateCarousel();
        }
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
      # Servicios Modal
    =====================================*/
    function initializeServiciosModal() {
      const serviciosModal = document.getElementById('serviciosModal');
      const closeServiciosModalBtn = document.querySelector('#serviciosModal .close-btn');
      
      // Asignar eventos a los botones "Descubre cuáles son"
      const descubreButtons = document.querySelectorAll('#descuentos-card .btn, #beneficios-card .btn');
      
      descubreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          if (serviciosModal) {
            serviciosModal.classList.add('show');
          }
        });
      });
      
      // Close servicios modal
      if (closeServiciosModalBtn && serviciosModal) {
        closeServiciosModalBtn.addEventListener('click', () => {
          serviciosModal.classList.remove('show');
        });
      }
      
      // Cerrar con la tecla Escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviciosModal && serviciosModal.classList.contains('show')) {
          serviciosModal.classList.remove('show');
        }
      });
    }


    // Datos de los aliados (debes completar con los enlaces reales)
const aliadosData = {
  salud: [
    { nombre: "Corpore", imagen: "img/aliadosImg/SaludyBienestar/Corpore.png", enlace: "https://www.corporesthetic.com/" },
    { nombre: "GoldsGym", imagen: "img/aliadosImg/SaludyBienestar/GoldsGym.png", enlace: "https://www.goldsgym.com.ve/" },
    { nombre: "Laboatencion", imagen: "img/aliadosImg/SaludyBienestar/Laboatencion.png", enlace: "https://www.goldsgym.com.ve/" },
    { nombre: "Opticolor", imagen: "img/aliadosImg/SaludyBienestar/Opticolor.png", enlace: "https://www.goldsgym.com.ve/" },
    { nombre: "PhysioSport", imagen: "img/aliadosImg/SaludyBienestar/PhysioSport.png", enlace: "https://www.goldsgym.com.ve/" },
    // Agrega más aliados de salud aquí
  ],
  farmacia: [
    { nombre: "FarMarket", imagen: "img/aliadosImg/Farmacia/FarMarket.png", enlace: "https://ejemplo.com/farmacia1" },
    { nombre: "Farmatencion", imagen: "img/aliadosImg/Farmacia/Farmatencion.png", enlace: "https://ejemplo.com/farmacia2" },
    // Agrega más aliados de farmacia aquí
  ],
  servicios: [
    { nombre: "Credimport", imagen: "img/aliadosImg/Servicios/Credimport.png", enlace: "https://ejemplo.com/servicios1" },
    { nombre: "Miramall", imagen: "img/aliadosImg/Servicios/Miramall.png", enlace: "https://ejemplo.com/servicios2" },
    { nombre: "Turaser", imagen: "img/aliadosImg/Servicios/Turaser.png", enlace: "https://ejemplo.com/servicios2" },
    // Agrega más aliados de servicios aquí
  ],
  calzado: [
    { nombre: "BrandsShop", imagen: "img/aliadosImg/RopayCalzado/BrandsShop.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "Cerere", imagen: "img/aliadosImg/RopayCalzado/Cerere.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "Estivaneli", imagen: "img/aliadosImg/RopayCalzado/Estivaneli.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "Everlast", imagen: "img/aliadosImg/RopayCalzado/Everlast.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "LucyLingerie", imagen: "img/aliadosImg/RopayCalzado/LucyLingerie.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "Modas", imagen: "img/aliadosImg/RopayCalzado/Modas.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "PrimeShoes", imagen: "img/aliadosImg/RopayCalzado/PrimeShoes.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "Skechers", imagen: "img/aliadosImg/RopayCalzado/Cerere.png", enlace: "https://ejemplo.com/calzado2" },
    { nombre: "SportWay", imagen: "img/aliadosImg/RopayCalzado/SportWay.png", enlace: "https://ejemplo.com/calzado1" },
    { nombre: "TuOutlet", imagen: "img/aliadosImg/RopayCalzado/TuOutlet.png", enlace: "https://ejemplo.com/calzado2" },
    // Agrega más aliados de calzado aquí
  ],
  mascotas: [
    { nombre: "Aliado Mascotas 1", imagen: "img/aliadosImg/mascotas1.jpg", enlace: "https://ejemplo.com/mascotas1" },
    { nombre: "Aliado Mascotas 2", imagen: "img/aliadosImg/mascotas2.jpg", enlace: "https://ejemplo.com/mascotas2" },
    // Agrega más aliados de mascotas aquí
  ],
  restaurantes: [
    { nombre: "Aliado Restaurantes 1", imagen: "img/aliadosImg/restaurantes1.jpg", enlace: "https://ejemplo.com/restaurantes1" },
    { nombre: "Aliado Restaurantes 2", imagen: "img/aliadosImg/restaurantes2.jpg", enlace: "https://ejemplo.com/restaurantes2" },
    // Agrega más aliados de restaurantes aquí
  ]
};

// Función para inicializar la modal de aliados
function initializeAliadosModal() {
  const aliadosModal = document.getElementById('aliadosModal');
  const closeAliadosModalBtn = document.querySelector('#aliadosModal .close-btn');
  const aliadosGrid = document.getElementById('aliadosGrid');
  const modalTitle = document.getElementById('modalAliadosTitle');
  
  // Asignar eventos a los items del carrusel
  const allyItems = document.querySelectorAll('.ally-item');
  
  allyItems.forEach(item => {
    item.addEventListener('click', function() {
      const allyType = this.getAttribute('data-ally');
      const allyTitle = this.querySelector('h3').textContent;
      
      // Actualizar título de la modal
      modalTitle.textContent = allyTitle;
      
      // Cargar aliados correspondientes
      loadAliados(allyType);
      
      // Mostrar modal
      if (aliadosModal) {
        aliadosModal.classList.add('show');
      }
    });
  });
  
  // Close aliados modal
  if (closeAliadosModalBtn && aliadosModal) {
    closeAliadosModalBtn.addEventListener('click', () => {
      aliadosModal.classList.remove('show');
    });
  }
  
  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && aliadosModal && aliadosModal.classList.contains('show')) {
      aliadosModal.classList.remove('show');
    }
  });
  
  // Cerrar al hacer clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (aliadosModal && e.target === aliadosModal) {
      aliadosModal.classList.remove('show');
    }
  });
  
  // Función para cargar los aliados en la grid
  function loadAliados(allyType) {
    if (!aliadosGrid) return;
    
    // Limpiar grid
    aliadosGrid.innerHTML = '';
    
    // Obtener aliados del tipo seleccionado
    const aliados = aliadosData[allyType] || [];
    
    if (aliados.length === 0) {
      aliadosGrid.innerHTML = '<p class="no-aliados">Próximamente más aliados en esta categoría.</p>';
      return;
    }
    
    // Crear elementos para cada aliado
    aliados.forEach(aliado => {
      const aliadoItem = document.createElement('div');
      aliadoItem.classList.add('aliado-modal-item');
      
      aliadoItem.innerHTML = `
        <a href="${aliado.enlace}" target="_blank" class="aliado-modal-link">
          <img src="${aliado.imagen}" alt="${aliado.nombre}" class="aliado-modal-img">
          <p class="aliado-modal-name">${aliado.nombre}</p>
        </a>
      `;
      
      aliadosGrid.appendChild(aliadoItem);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
            const toggleButton = document.getElementById('info-toggle');
            const moreInfo = document.getElementById('more-info');
            const icon = toggleButton.querySelector('i');
            
            toggleButton.addEventListener('click', function() {
                moreInfo.classList.toggle('show');
                toggleButton.classList.toggle('active');
                
                if (moreInfo.classList.contains('show')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });