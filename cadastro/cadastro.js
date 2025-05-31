document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.parentElement.querySelector('input');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = button.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // CPF Mask
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        }
    });

    // Phone Mask
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            e.target.value = value;
        }
    });

    // CEP Mask
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
            e.target.value = value;
        }
    });

    // CEP Auto-fill
    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    });

    // Form submission
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(cadastroForm);
        const data = Object.fromEntries(formData.entries());

        // Validate passwords match
        if (data.senha !== data.confirmarSenha) {
            showError('As senhas não coincidem.');
            return;
        }

        // Validate password strength
        if (!isValidPassword(data.senha)) {
            showError('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
            return;
        }

        // Validate CPF
        if (!isValidCPF(data.cpf)) {
            showError('CPF inválido.');
            return;
        }

        // Validate age (must be 18 or older)
        if (!isValidAge(data.dataNascimento)) {
            showError('Você deve ter 18 anos ou mais para se cadastrar.');
            return;
        }

        // Simulate registration process
        simulateRegistration(data);
    });
});

// Helper functions
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = 11 - (sum % 11);
    let digit1 = rest > 9 ? 0 : rest;
    if (digit1 !== parseInt(cpf.charAt(9))) return false;
    
    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    let digit2 = rest > 9 ? 0 : rest;
    if (digit2 !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function isValidAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age >= 18;
}

function showError(message) {
    // Create error message element if it doesn't exist
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        document.querySelector('.cadastro-form').insertBefore(errorElement, document.querySelector('.cadastro-button'));
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
        document.querySelector('.cadastro-form').insertBefore(messageElement, document.querySelector('.cadastro-button'));
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

function simulateRegistration(data) {
    // Show loading state
    const cadastroButton = document.querySelector('.cadastro-button');
    const originalText = cadastroButton.innerHTML;
    cadastroButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando conta...';
    cadastroButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        cadastroButton.innerHTML = originalText;
        cadastroButton.disabled = false;

        // For demo purposes, show success message
        showMessage('Conta criada com sucesso! Redirecionando para o login...');

        // Simulate redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '../login/index.html';
        }, 2000);
    }, 1500);
} 