document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const progressSteps = document.querySelectorAll(".progress-step");

    // --- FUNCIÓN DE VALIDACIÓN GENERAL Y ESPECÍFICA ---
    function validateStep(stepNumber) {
        const currentStepElement = document.getElementById("step" + stepNumber);
        const inputs = currentStepElement.querySelectorAll("input[required], select[required], input:not([type='file'])");
        let isValid = true;
        let firstErrorInput = null; // Para enfocar el primer campo con error

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

        // Validaciones específicas del Paso 2
        if (stepNumber === 2) {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                isValid = false;
                document.getElementById("confirmPassword").classList.add("input-error");
                customAlert("Las contraseñas no coinciden.");
            } else {
                document.getElementById("confirmPassword").classList.remove("input-error");
            }
        }

        // Si hay un error, enfoca el primer campo
        if (firstErrorInput) {
            firstErrorInput.focus();
        }

        return isValid;
    }

    // --- NUEVA FUNCIÓN: VALIDACIÓN ESPECÍFICA DE CAMPO ---
    function validateField(input) {
        let isFieldValid = true;
        const value = input.value.trim();
        const fieldName = input.id;

        // Limpiar estilos de error previos
        input.setCustomValidity("");

        // 1. Validación de REQUERIDO (ya implementada parcialmente)
        if (input.hasAttribute('required') && !value && input.type !== 'file') {
            input.setCustomValidity("Este campo es obligatorio.");
            return false;
        }

        switch (fieldName) {
            case 'nombre':
            case 'apellido':
                // Solo letras y espacios (mínimo 2 caracteres)
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(value)) {
                    customAlert("El " + fieldName + " solo debe contener letras y tener al menos 2 caracteres.");
                    isFieldValid = false;
                }
                break;
            case 'cedula':
                // Formato venezolano típico: [V|E|P|J] seguido de 6 a 10 dígitos.
                if (!/^[VEPJvepj]\d{6,10}$/.test(value)) {
                    customAlert("Cédula/Documento inválido. Use el formato: V12345678.");
                    isFieldValid = false;
                }
                break;
            case 'fechaNacimiento':
                // Validar que el usuario sea mayor de 18 años
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
                // Formato de teléfono venezolano: +58 4XX-XXXXXXX o 04XX-XXXXXXX
                if (!/^\+?58(4\d{9}|[0-9]{10})$/.test(value.replace(/[\s-]/g, ''))) {
                    customAlert("Teléfono inválido. Use el formato: +584XXxxxxxxx o 04XXxxxxxxx.");
                    isFieldValid = false;
                }
                break;
            case 'usuario':
                // Alfanumérico, sin espacios, mínimo 4 caracteres.
                if (!/^[a-zA-Z0-9]{4,}$/.test(value)) {
                    customAlert("El usuario debe ser alfanumérico, sin espacios y mínimo 4 caracteres.");
                    isFieldValid = false;
                }
                break;
            case 'correo':
                // Validación básica de email
                if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
                    customAlert("Por favor, ingrese un correo electrónico válido.");
                    isFieldValid = false;
                }
                break;
            case 'password':
                // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número.
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
                    customAlert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
                    isFieldValid = false;
                }
                break;
            default:
                // Si el campo tiene un 'required' pero no tiene una validación específica, se valida solo que no esté vacío.
                break;
        }

        // Si falló la validación específica, la propiedad setCustomValidity se usará si no hay un customAlert.
        if (!isFieldValid) {
            input.setCustomValidity("El valor ingresado no cumple el formato requerido.");
        }

        return isFieldValid;
    }

    // --- FUNCIONES DE NAVEGACIÓN (NO CAMBIAN) ---
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
            background-color: var(--secondary, #007bff); /* Usar un fallback */
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
          ">OK</button>
        `;
        document.body.appendChild(alertBox);
    }

    // --- EVENT LISTENERS (NO CAMBIAN) ---
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
        const fileInput = document.getElementById('documentoIdentidad');
        if (!fileInput.files.length) {
            e.preventDefault();
            customAlert("Debe cargar una foto de su documento de identidad.");
        }
        // Si hay un archivo, la validación pasa y se envía.
    });
});