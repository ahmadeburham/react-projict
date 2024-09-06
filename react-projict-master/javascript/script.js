document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('sign-up');
    const nextBtn = document.getElementById('next-btn');
    const inputs = form.querySelectorAll('input');
    const errorDivs = form.querySelectorAll('.error');
    const stepContents = document.querySelectorAll('.step-content');
    const prevBtn = document.getElementById('prev-btn');

    let currentStep = 1;

    nextBtn.addEventListener('click', function() {
        if (validateCurrentStep()) {
            if (currentStep < 3) {
                currentStep++;
                updateStep();
            } else {
                inputs.forEach(input => {
                    localStorage.setItem(input.name, input.value);
                });
                window.location.href = './login/index.html';
            }
        }
    });
    function updateStep() {
        const steps = document.querySelectorAll('.step');
        const lines = document.querySelectorAll('.line');
        
        steps.forEach((step, index) => {
            if (index < currentStep - 1) {
                step.classList.remove('active');
                step.classList.add('completed');
                if (lines[index]) {
                    lines[index].classList.add('completed');
                }
            } else if (index === currentStep - 1) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    
        stepContents.forEach((content, index) => {
            content.style.display = (index === currentStep - 1) ? 'block' : 'none';
        });
    
        nextBtn.textContent = (currentStep === stepContents.length) ? 'Submit' : 'Next';
    }
    
    function validateCurrentStep() {
        let isValid = true;
        inputs.forEach((input, index) => {
            if (index < currentStep * 2 && index >= (currentStep - 1) * 2) {
                const errorDiv = errorDivs[index];
                if (input.value.trim() === '') {
                    errorDiv.textContent = 'This field is required';
                    isValid = false;
                } else if (input.type === 'password' && input.name === 'confirm-password') {
                    const password = document.getElementById('password').value;
                    if (input.value !== password) {
                        errorDiv.textContent = 'Passwords do not match';
                        isValid = false;
                    } else {
                        errorDiv.textContent = '';
                    }
                } else {
                    errorDiv.textContent = '';
                }
            }
        });
        return isValid;
    }        
    updateStep();

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    });
});
