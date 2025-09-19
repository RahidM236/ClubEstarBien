// Esperamos a que todo el contenido del DOM se cargue.
document.addEventListener('DOMContentLoaded', function () {
  initializeSmoothScroll();
  initializeAlliesCarousel();
  initializeScrollTop();
  initializeServiceCards();
});

// ==========================================================
// Lógica para los botones de menú y smooth scroll
// ==========================================================
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

// ==========================================================
// Lógica para el carrusel de aliados
// ==========================================================
function initializeAlliesCarousel() {
  const carousel = document.querySelector('.allies-carousel');
  const items = document.querySelectorAll('.ally-item');
  const prevBtn = document.querySelector('.allies-carousel-control.prev');
  const nextBtn = document.querySelector('.allies-carousel-control.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  
  if (!carousel || items.length === 0) return;
  
  let currentIndex = 0;
  
  function getItemsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }
  
  // Calcular número de páginas (indicadores necesarios)
  function calculatePages() {
    const itemsPerView = getItemsPerView();
    return Math.max(1, Math.ceil(items.length / itemsPerView));
  }
  
  // Crear indicadores basados en páginas, no en elementos
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    const pages = calculatePages();
    
    for (let i = 0; i < pages; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.setAttribute('data-index', i);
      indicatorsContainer.appendChild(indicator);
    }
  }
  
  const indicators = document.querySelectorAll('.indicator');
  
  function updateCarousel() {
    const itemsPerView = getItemsPerView();
    const translateValue = -currentIndex * (100 / itemsPerView) * itemsPerView;
    carousel.style.transform = `translateX(${translateValue}%)`;
    
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const itemsPerView = getItemsPerView();
      if (currentIndex < Math.ceil(items.length / itemsPerView) - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }
  
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      currentIndex = parseInt(indicator.getAttribute('data-index'));
      updateCarousel();
    });
  });
  
  window.addEventListener('resize', () => {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.ceil(items.length / itemsPerView) - 1;
    
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    // Recrear indicadores para la nueva cantidad de páginas
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      const pages = calculatePages();
      
      for (let i = 0; i < pages; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === currentIndex) indicator.classList.add('active');
        indicator.setAttribute('data-index', i);
        indicatorsContainer.appendChild(indicator);
      }
    }
    
    updateCarousel();
  });
  
  updateCarousel();
}

// Botón de scroll to top
function initializeScrollTop() {
  const scrollBtn = document.getElementById("btn-scroll-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });
}

// ==========================================================
// Lógica para las tarjetas de servicios (toggle de información)
// ==========================================================
function initializeServiceCards() {
  const moreButtons = document.querySelectorAll('.btn-more');
  
  moreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const info = button.nextElementSibling;
      info.classList.toggle('show');
      button.classList.toggle('active');
      
      // Cambiar ícono de + a - y viceversa
      const icon = button.querySelector('i');
      if (icon.classList.contains('fa-plus')) {
        icon.classList.replace('fa-plus', 'fa-minus');
      } else {
        icon.classList.replace('fa-minus', 'fa-plus');
      }
    });
  });
}