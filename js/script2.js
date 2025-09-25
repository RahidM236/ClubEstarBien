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

// ==========================================================
// Lógica para el chat widget
// ==========================================================

const chatWidget = document.getElementById('chat-widget');
const openChatBtn = document.getElementById('open-chat-btn');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');
const chatButtons = document.querySelectorAll('.chat-button');

// Función para agregar un mensaje al chat
function addMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-bubble');

    if (sender === 'user') {
        messageContainer.classList.add('user-message');
        const p = document.createElement('p');
        p.textContent = message;
        messageContainer.appendChild(p);
    } else { // Es un mensaje del bot
        messageContainer.classList.add('bot-message');
        const logoImg = document.createElement('img');
        logoImg.src = 'img/logo-solo-02.png';
        logoImg.alt = 'Logo Bot';
        logoImg.classList.add('bot-logo');
        const messageContent = document.createElement('p');
        messageContent.innerHTML = message;
        messageContainer.appendChild(logoImg);
        messageContainer.appendChild(messageContent);
    }

    chatBody.appendChild(messageContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Función para mostrar un formulario de contacto para el médico
function showContactForm() {
    const formHtml = `
        <div class="contact-form-container">
            <p>Por favor, ingresa tu número de teléfono para que un médico te llame.</p>
            <input type="tel" id="user-phone" placeholder="Tu número de teléfono" class="chat-input" />
            <button class="send-form-button">Enviar</button>
        </div>
    `;
    const formContainer = document.createElement('div');
    formContainer.innerHTML = formHtml;
    chatBody.appendChild(formContainer);
    chatBody.scrollTop = chatBody.scrollHeight;

    const sendFormButton = formContainer.querySelector('.send-form-button');
    const phoneInput = formContainer.querySelector('#user-phone');

    sendFormButton.addEventListener('click', () => {
        const phoneNumber = phoneInput.value.trim();
        if (phoneNumber) {
            addMessage('Gracias. Un médico se pondrá en contacto contigo en el número ' + phoneNumber + '.', 'bot');
            sendFormButton.disabled = true;
            phoneInput.disabled = true;
        } else {
            addMessage('Por favor, introduce un número de teléfono válido.', 'bot');
        }
    });
}

// Función para obtener la respuesta del bot según la opción seleccionada
function getBotResponse(option) {
    switch (option) {
        case 'Hablar con un médico':
            showContactForm();
            return '¡Claro! Para hablar con un médico, por favor, ingresa tus datos y un especialista te contactará en breve.';
        case 'Solicitar servicios':
            // Esta es la clave: el botón ya no agrega un mensaje, sino que redirige
            return '¡Con gusto! Redirigiendo a la sección de servicios...';
        case 'Consultar Estatus':
            return 'Para consultar el estatus de tu solicitud, por favor, introduce tu número de referencia.';
        default:
            return 'Lo siento, no entiendo tu solicitud. Por favor, selecciona una de las opciones o escribe tu pregunta.';
    }
}

// Abre el chat
openChatBtn.addEventListener('click', () => {
    chatWidget.classList.add('active');
    openChatBtn.style.display = 'none';
});

// Cierra el chat
closeChatBtn.addEventListener('click', () => {
    chatWidget.classList.remove('active');
    openChatBtn.style.display = 'block';
});

// Interacción de los botones (Lógica optimizada)
chatButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userMessage = button.textContent.trim();
        addMessage(userMessage, 'user');

        // Lógica de redirección específica para el botón de servicios
        if (userMessage === 'Solicitar servicios') {
            // Se redirige directamente sin mostrar un mensaje clicable en el chat
            window.location.href = '/ClubEstarBien/index.html#servicios';
        } else {
            const botResponse = getBotResponse(userMessage);
            setTimeout(() => {
                addMessage(botResponse, 'bot');
            }, 500);
        }
    });
});

// Lógica para enviar un mensaje con la tecla Enter o el botón de envío
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== '') {
        addMessage(message, 'user');
        chatInput.value = '';

        setTimeout(() => {
            addMessage('Gracias por tu mensaje. Actualmente, el bot solo puede responder a las opciones predefinidas. Por favor, selecciona una de las opciones.', 'bot');
        }, 500);
    }
});

// ==========================================================
// Lógica para el carrusel de imágenes
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!slide || images.length === 0) return;

    let currentIndex = 0;
    const totalImages = images.length;
    let autoPlayInterval;

    function updateCarousel() {
        const imageWidth = images[0].clientWidth;
        slide.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });

        updateDots();
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 10000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pausa al hover
    slide.parentElement.addEventListener('mouseenter', stopAutoPlay);
    slide.parentElement.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', updateCarousel);

    updateCarousel();
    startAutoPlay();
});




// ==========================================================
// Lógica para animaciones al hacer scroll
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
        threshold: 0.2
    }
    );

    // Selecciona todos los elementos que quieres que aparezcan
    const elementsToAnimate = document.querySelectorAll(
        '.hero, .about .container, .services .container, .allies-section .container, .clients-section .container, .contact-new .container, .cta .container, .service-card, .ally-item, .contact-new .card-new, .social-card, .step-button'
    );

    elementsToAnimate.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});