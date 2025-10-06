document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const progressSteps = document.querySelectorAll(".progress-step");

    // Configura el listener de la subida del archivo al inicio
    setupFileUploadListener();

    // --- FUNCIÓN DE VALIDACIÓN GENERAL Y ESPECÍFICA ---
    function validateStep(stepNumber) {
        const currentStepElement = document.getElementById("step" + stepNumber);
        const inputs = currentStepElement.querySelectorAll("input[required], select[required], textarea[required], input:not([type='file'])");
        let isValid = true;
        let firstErrorInput = null;

        // 1. Validar campos individuales
        inputs.forEach(input => {
            const isFieldValid = validateField(input);

            if (!isFieldValid) {
                isValid = false;
                input.classList.add("input-error");
                if (!firstErrorInput) {
                    firstErrorInput = input;
                }
            } else {
                input.classList.remove("input-error");
            }
        });

        // 2. Validaciones específicas del Paso 2 (Contraseñas)
        if (stepNumber === 2) {
            const passwordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirmPassword");
            const password = passwordInput ? passwordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

            if (password && confirmPassword && isValid) {
                if (password !== confirmPassword) {
                    isValid = false;
                    confirmPasswordInput.classList.add("input-error");
                    customAlert("⚠️ Las contraseñas NO COINCIDEN.");
                    if (!firstErrorInput) {
                        firstErrorInput = confirmPasswordInput;
                    }
                } else {
                    confirmPasswordInput.classList.remove("input-error");
                }
            }
        }

        // 3. Validación de carga de archivo (Paso 3)
        // Si el input tiene el atributo 'required', esta lógica lo comprueba
        if (stepNumber === 3) {
            const fileInput = document.getElementById('documentoIdentidad');
            if (fileInput.hasAttribute('required') && !fileInput.files.length) {
                isValid = false;
                customAlert("Debe cargar una foto de su documento de identidad.");
                if (!firstErrorInput) {
                    firstErrorInput = fileInput;
                }
            }
        }

        // Si hay un error, enfoca el primer campo
        if (firstErrorInput) {
            firstErrorInput.focus();
        }

        return isValid;
    }

    // --- FUNCIÓN: Lógica para mostrar nombre y previsualizar la foto ---
    function setupFileUploadListener() {
        const fileInput = document.getElementById('documentoIdentidad');
        const fileNameDisplay = document.getElementById('fileNameDisplay');
        const filePreview = document.getElementById('filePreview');

        if (!fileInput) return; // Salir si el elemento no existe

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];

            if (file) {
                // 1. Mostrar nombre del archivo
                fileNameDisplay.textContent = `Archivo cargado: ${file.name}`;

                // 2. Mostrar previsualización de la imagen
                const reader = new FileReader();
                reader.onload = function (e) {
                    filePreview.src = e.target.result;
                    filePreview.style.display = 'block'; // Mostrar la imagen
                };
                reader.readAsDataURL(file); // Leer el archivo como URL de datos
            } else {
                // Si se cancela o se borra la selección
                fileNameDisplay.textContent = '';
                filePreview.src = '';
                filePreview.style.display = 'none'; // Ocultar la imagen
            }
        });
    }

    // --- FUNCIÓN: VALIDACIÓN ESPECÍFICA DE CAMPO (Sin cambios en formato de contraseña) ---
    function validateField(input) {
        let isFieldValid = true;
        const value = input.value.trim();
        const fieldName = input.id;

        input.setCustomValidity("");

        // 1. Validación de REQUERIDO (Ignora el file input aquí ya que se valida aparte)
        if (input.hasAttribute('required') && !value && input.type !== 'file') {
            input.setCustomValidity("Este campo es obligatorio.");
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        switch (fieldName) {
            case 'nombre':
            case 'apellido':
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(value)) {
                    customAlert("El " + fieldName + " solo debe contener letras y tener al menos 2 caracteres.");
                    isFieldValid = false;
                }
                break;
            case 'cedula':
                if (!/^[VEPJvepj]\d{6,10}$/.test(value)) {
                    customAlert("Cédula/Documento inválido. Use el formato: V12345678.");
                    isFieldValid = false;
                }
                break;
            case 'fechaNacimiento':
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    customAlert("Debe ser mayor de 18 años para afiliarse.");
                    isFieldValid = false;
                }
                break;
            case 'telefono':
                if (!/^\+?58(4\d{9}|[0-9]{10})$/.test(value.replace(/[\s-]/g, ''))) {
                    customAlert("Teléfono inválido. Use el formato: +584XXxxxxxxx o 04XXxxxxxxx.");
                    isFieldValid = false;
                }
                break;
            case 'usuario':
                if (!/^[a-zA-Z0-9]{4,}$/.test(value)) {
                    customAlert("El usuario debe ser alfanumérico, sin espacios y mínimo 4 caracteres.");
                    isFieldValid = false;
                }
                break;
            case 'correo':
                if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
                    customAlert("Por favor, ingrese un correo electrónico válido.");
                    isFieldValid = false;
                }
                break;
            case 'password':
                if (value && !passwordRegex.test(value)) {
                    customAlert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
                    isFieldValid = false;
                }
                break;
            case 'confirmPassword':
                if (value && !passwordRegex.test(value)) {
                    isFieldValid = false;
                }
                break;
            default:
                break;
        }

        if (!isFieldValid) {
            input.setCustomValidity("El valor ingresado no cumple el formato requerido.");
        }

        return isFieldValid;
    }

    // --- FUNCIONES DE NAVEGACIÓN Y ALERTA (Sin cambios) ---
    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove("active"));
        document.getElementById("step" + stepNumber).classList.add("active");
        updateProgressBar(stepNumber);
    }

    function updateProgressBar(stepNumber) {
        progressSteps.forEach((step, index) => {
            step.classList.remove("active", "completed");
            if (index + 1 < stepNumber) {
                step.classList.add("completed");
            } else if (index + 1 === stepNumber) {
                step.classList.add("active");
            }
        });
    }

    function customAlert(message) {
        const alertBox = document.createElement("div");
        alertBox.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 1000;
          text-align: center;
          font-family: 'Inter', sans-serif;
        `;
        alertBox.innerHTML = `
          <p>${message}</p>
          <button onclick="this.parentElement.remove();" style="
            background-color: var(--secondary, #007bff); 
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
          ">OK</button>
        `;
        document.body.appendChild(alertBox);
    }

    // --- EVENT LISTENERS (Modificado el submit y añadido validación de Step 3) ---
    document.getElementById("next1").addEventListener("click", () => {
        if (validateStep(1)) {
            currentStep = 2;
            showStep(currentStep);
        } else {
            customAlert("Por favor, complete todos los campos requeridos y corrija los errores.");
        }
    });

    document.getElementById("next2").addEventListener("click", () => {
        if (validateStep(2)) {
            currentStep = 3;
            showStep(currentStep);
        } else {
            customAlert("Por favor, complete todos los campos requeridos y corrija los errores.");
        }
    });

    document.getElementById("prev2").addEventListener("click", () => {
        currentStep = 1;
        showStep(currentStep);
    });

    document.getElementById("prev3").addEventListener("click", () => {
        currentStep = 2;
        showStep(currentStep);
    });

    // Validar carga de archivo al hacer submit (Paso 3)
    document.getElementById("afiliacionForm").addEventListener('submit', (e) => {
        if (!validateStep(3)) {
            e.preventDefault();
            // El mensaje de error lo muestra validateStep(3)
        } else {
            // Si todo es válido, podrías enviar el formulario o hacer algo más
            // customAlert("¡Formulario enviado con éxito!"); 
            // e.preventDefault(); // Descomenta esta línea para evitar el envío real y solo mostrar el alert
        }
    });
});


function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}