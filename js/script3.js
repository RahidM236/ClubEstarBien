document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const progressSteps = document.querySelectorAll(".progress-step");

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

    function validateStep(stepNumber) {
        const currentStepElement = document.getElementById("step" + stepNumber);
        const inputs = currentStepElement.querySelectorAll("input[required], select[required]");
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = "red";
            } else {
                input.style.borderColor = "";
            }
        });

        if (stepNumber === 2) {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                isValid = false;
                document.getElementById("confirmPassword").style.borderColor = "red";
                customAlert("Las contraseñas no coinciden.");
            }
        }

        return isValid;
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
        background-color: var(--secondary);
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
      ">OK</button>
    `;
        document.body.appendChild(alertBox);
    }

    document.getElementById("next1").addEventListener("click", () => {
        if (validateStep(1)) {
            currentStep = 2;
            showStep(currentStep);
        }
    });

    document.getElementById("next2").addEventListener("click", () => {
        if (validateStep(2)) {
            currentStep = 3;
            showStep(currentStep);
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
});

// Mostrar/ocultar contraseñas
document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
        const targetId = icon.getAttribute("data-target");
        const input = document.getElementById(targetId);

        if (input.type === "password") {
            input.type = "text";
            icon.textContent = "🙈";
        } else {
            input.type = "password";
            icon.textContent = "👁️";
        }
    });
});
