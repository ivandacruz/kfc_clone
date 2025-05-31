// Gerenciamento do Carrinho
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        // Inicializar contador do carrinho
        this.updateCartCount();
        
        // Adicionar evento de clique no ícone do carrinho
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                window.location.href = 'carrinho/index.html';
            });
        }
    }

    // Adicionar item ao carrinho
    addItem(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...item,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item adicionado ao carrinho!');
    }

    // Remover item do carrinho
    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
    }

    // Atualizar quantidade de um item
    updateQuantity(itemId, quantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    // Limpar carrinho
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }

    // Salvar carrinho no localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Atualizar contador do carrinho
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Adicionar animação quando o número mudar
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        }
    }

    // Mostrar notificação
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Calcular total do carrinho
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obter todos os itens do carrinho
    getItems() {
        return this.cart;
    }
}

// Criar instância global do gerenciador do carrinho
window.cartManager = new CartManager();

// Adicionar estilos para as notificações e animações
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .cart-count.bounce {
        animation: bounce 0.3s ease;
    }

    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style); 