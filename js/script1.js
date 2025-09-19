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