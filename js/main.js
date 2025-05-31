// Dados dos produtos em destaque
const featuredProducts = [
    {
        id: 1,
        name: 'Combo Família',
        description: '8 pedaços de frango, 2 porções de batata frita, 2 porções de coleslaw e 4 pães',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 2,
        name: 'Frango Frito (5 pedaços)',
        description: '5 pedaços de frango frito na nossa receita secreta',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        name: 'Sanduíche Duplo',
        description: 'Dois filés de frango empanado, queijo, alface, tomate e maionese especial',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 4,
        name: 'Batata Frita (G)',
        description: 'Porção grande de batata frita crocante',
        price: 22.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 5,
        name: 'Sorvete',
        description: 'Sorvete de creme com calda de chocolate',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

// Inicialização do Carrossel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !dotsContainer || !prevBtn || !nextBtn) {
        console.error('Elementos do carrossel não encontrados');
        return;
    }

    let currentIndex = 0;
    const itemsPerSlide = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const totalSlides = Math.ceil(featuredProducts.length / itemsPerSlide);

    // Criar itens do carrossel
    featuredProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="carousel-item-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">R$ ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        track.appendChild(item);
    });

    // Criar dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Função para atualizar o carrossel
    function updateCarousel() {
        const itemWidth = 100 / itemsPerSlide;
        const offset = currentIndex * -itemWidth;
        track.style.transform = `translateX(${offset}%)`;
        
        // Atualizar dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Função para ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event listeners para os botões
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    // Auto-play do carrossel
    let autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // Pausar auto-play quando o mouse estiver sobre o carrossel
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });

    // Função para adicionar ao carrinho
    window.addToCart = (productId) => {
        const product = featuredProducts.find(p => p.id === productId);
        if (product) {
            window.cartManager.addItem(product);
        }
    };

    // Inicializar o carrossel
    updateCarousel();
}); 