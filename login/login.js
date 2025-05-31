document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const remember = document.querySelector('input[name="remember"]').checked;

        // Basic validation
        if (!email || !password) {
            showError('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Por favor, insira um email válido.');
            return;
        }

        // Simulate login process
        simulateLogin(email, password, remember);
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            showMessage(`Login com ${provider} em desenvolvimento...`);
        });
    });
});

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Create error message element if it doesn't exist
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        document.querySelector('.login-form').insertBefore(errorElement, document.querySelector('.login-button'));
    }

    // Style the error message
    errorElement.style.color = '#e4002b';
    errorElement.style.backgroundColor = '#ffe6e6';
    errorElement.style.padding = '1rem';
    errorElement.style.borderRadius = '10px';
    errorElement.style.marginBottom = '1rem';
    errorElement.style.textAlign = 'center';
    errorElement.style.fontSize = '0.9rem';

    // Set message and show
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    // Remove after 3 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

function showMessage(message) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.info-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'info-message';
        document.querySelector('.login-form').insertBefore(messageElement, document.querySelector('.login-button'));
    }

    // Style the message
    messageElement.style.color = '#2b6cb0';
    messageElement.style.backgroundColor = '#e6f3ff';
    messageElement.style.padding = '1rem';
    messageElement.style.borderRadius = '10px';
    messageElement.style.marginBottom = '1rem';
    messageElement.style.textAlign = 'center';
    messageElement.style.fontSize = '0.9rem';

    // Set message and show
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    // Remove after 3 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

function simulateLogin(email, password, remember) {
    // Show loading state
    const loginButton = document.querySelector('.login-button');
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
    loginButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        loginButton.innerHTML = originalText;
        loginButton.disabled = false;

        // For demo purposes, show success message
        showMessage('Login realizado com sucesso! Redirecionando...');

        // Simulate redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    }, 1500);
} 