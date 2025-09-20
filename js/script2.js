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
    document.querySelectorAll('a[href^="#"], .btn[href^="#"]').forEach(anchor => {
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


document.addEventListener("DOMContentLoaded", function () {
    const scrollBtn = document.getElementById("btn-scroll-top");

    // Muestra u oculta el botón al hacer scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    // Scroll suave al hacer clic en el botón
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentItem = 0;

    function showNextItem() {
        // Esconde el ítem actual
        galleryItems[currentItem].classList.remove('active');

        // Calcula el próximo ítem
        currentItem = (currentItem + 1) % galleryItems.length;

        // Muestra el próximo ítem
        galleryItems[currentItem].classList.add('active');
    }

    // Cambia la imagen cada 4 segundos
    setInterval(showNextItem, 4000);
});


// Ejemplo básico para mostrar/ocultar el widget
// Primero, necesitas un botón que active el chat, por ejemplo:
// <button id="openChat">Abrir Asistente</button>

const chatWidget = document.querySelector(".chat-widget");
const openChatButton = document.getElementById("openChat"); // Si tienes un botón para abrirlo

// Si quieres que aparezca al cargar la página o con un retardo
// chatWidget.style.display = 'flex';

// Si quieres un botón para abrir/cerrar
/*
openChatButton.addEventListener('click', () => {
    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'flex';
    } else {
        chatWidget.style.display = 'none';
    }
});
*/

// Para la interacción de los botones (ejemplo: cambiar el mensaje)
const chatButtons = document.querySelectorAll(".chat-button");
const welcomeMessage = document.querySelector(".welcome-message p:first-child"); // Seleccionar el primer párrafo

chatButtons.forEach((button) => {
    button.addEventListener("click", () => {
        welcomeMessage.textContent = `Has seleccionado: "${button.textContent.trim()}"`;
        // Aquí podrías agregar lógica para mostrar diferentes respuestas
        // o cargar nuevo contenido en el chat.
    });
});