// Dados do menu
const menuItems = [
    {
        id: 1,
        name: 'Família 8 Pedaços',
        description: '8 pedaços de frango, 2 porções de batata frita, 2 porções de coleslaw e 4 pães',
        price: 89.90,
        image: 'https://cdn.pixabay.com/photo/2022/08/31/10/18/hamburger-7422976_1280.jpg'
    },
    {
        id: 2,
        name: 'Combo 3 Pedaços',
        description: '3 pedaços de frango, batata frita, coleslaw e pão',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        name: 'Combo 5 Pedaços',
        description: '5 pedaços de frango, 2 porções de batata frita, coleslaw e 2 pães',
        price: 59.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

// Dados das promoções
const promotions = [
    {
        id: 1,
        name: 'Segunda do Frango',
        description: 'Todas as segundas-feiras, 20% de desconto em qualquer combo de frango!',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 2,
        name: 'Combo Família',
        description: 'Combo família com 30% de desconto aos domingos!',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

// Carrinho de compras
let cart = [];

// Função para criar os cards do menu
function createMenuCards() {
    const menuGrid = document.querySelector('.menu-grid');
    
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">R$ ${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Adicionar ao Carrinho</button>
        `;
        menuGrid.appendChild(card);
    });
}

// Função para criar os cards de promoções
function createPromotionCards() {
    const promotionsGrid = document.querySelector('.promotions-grid');
    
    promotions.forEach(promo => {
        const card = document.createElement('div');
        card.className = 'promotion-card';
        card.innerHTML = `
            <img src="${promo.image}" alt="${promo.name}">
            <h3>${promo.name}</h3>
            <p>${promo.description}</p>
        `;
        promotionsGrid.appendChild(card);
    });
}

// Função para adicionar item ao carrinho
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        cart.push(item);
        updateCartCount();
        showNotification('Item adicionado ao carrinho!');
    }
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Função para garantir que o vídeo seja carregado e reproduzido
function initVideo() {
    const video = document.getElementById('hero-video');
    
    if (video) {
        // Forçar o carregamento do vídeo
        video.load();
        
        // Tentar reproduzir o vídeo
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Reprodução automática iniciada com sucesso
                console.log('Vídeo iniciado com sucesso');
            })
            .catch(error => {
                // Reprodução automática falhou
                console.log('Erro ao iniciar o vídeo:', error);
                // Tentar reproduzir novamente quando o usuário interagir com a página
                document.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        }
    }
}

// Função para controlar o menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navContainer.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Função para controlar o efeito de scroll na navbar
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adicionar classe quando rolar
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createMenuCards();
    createPromotionCards();
    initVideo();
    initMobileMenu();
    initNavbarScroll();
});

// Adicionar estilos CSS para as notificações
const style = document.createElement('style');
style.textContent = `
    .menu-card, .promotion-card {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
    }

    .menu-card:hover, .promotion-card:hover {
        transform: translateY(-5px);
    }

    .menu-card img, .promotion-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
    }

    .menu-card h3, .promotion-card h3 {
        margin: 1rem 0;
        color: #333;
    }

    .menu-card .price {
        font-size: 1.2rem;
        font-weight: bold;
        color: #e4002b;
        margin: 0.5rem 0;
    }

    .menu-card button {
        width: 100%;
        padding: 0.8rem;
        background-color: #e4002b;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .menu-card button:hover {
        background-color: #c40026;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        animation: slideIn 0.3s ease;
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
`;
document.head.appendChild(style); 