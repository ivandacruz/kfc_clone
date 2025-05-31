// Dados do cardápio
const menuData = {
    combos: [
        {
            id: 1,
            name: 'Combo Família',
            description: '8 pedaços de frango, 2 porções de batata frita, 2 porções de coleslaw e 4 pães',
            price: 89.90,
            image: 'https://cdn.pixabay.com/photo/2022/05/17/05/15/chiken-bucket-7201681_1280.jpg'
            // image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 2,
            name: 'Combo Duplo',
            description: '4 pedaços de frango, 2 porções de batata frita, coleslaw e 2 pães',
            price: 59.90,
            image: 'https://cdn.pixabay.com/photo/2022/08/31/10/18/hamburger-7422976_1280.jpg'
            // image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 3,
            name: 'Combo Kids',
            description: '2 pedaços de frango, batata frita pequena, refrigerante e brinde surpresa',
            price: 29.90,
            image: 'https://cdn.pixabay.com/photo/2014/01/16/01/48/chicken-nuggets-246180_1280.jpg'
        }
    ],
    frangos: [
        {
            id: 4,
            name: 'Frango Frito (3 pedaços)',
            description: '3 pedaços de frango frito na nossa receita secreta',
            price: 29.90,
            image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 5,
            name: 'Frango Frito (5 pedaços)',
            description: '5 pedaços de frango frito na nossa receita secreta',
            price: 39.90,
            image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ],
    sanduiches: [
        {
            id: 6,
            name: 'Sanduíche de Frango',
            description: 'Filé de frango empanado, alface, tomate e maionese especial',
            price: 19.90,
            image: 'https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_1280.jpg'
        },
        {
            id: 7,
            name: 'Sanduíche Duplo',
            description: 'Dois filés de frango empanado, queijo, alface, tomate e maionese especial',
            price: 24.90,
            image: 'https://cdn.pixabay.com/photo/2022/08/31/10/17/burger-7422970_1280.jpg'
        }
    ],
    batatas: [
        {
            id: 8,
            name: 'Batata Frita (P)',
            description: 'Porção pequena de batata frita crocante',
            price: 12.90,
            image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 9,
            name: 'Batata Frita (M)',
            description: 'Porção média de batata frita crocante',
            price: 16.90,
            image: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 10,
            name: 'Batata Frita (G)',
            description: 'Porção grande de batata frita crocante',
            price: 22.90,
            image: 'https://cdn.pixabay.com/photo/2015/03/02/16/31/fish-and-chips-656223_1280.jpg'
        }
    ],
    acompanhamentos: [
        {
            id: 11,
            name: 'Coleslaw',
            description: 'Salada de repolho com maionese especial',
            price: 8.90,
            image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 12,
            name: 'Arroz',
            description: 'Porção de arroz soltinho',
            price: 6.90,
            image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 13,
            name: 'Feijão',
            description: 'Porção de feijão carioca',
            price: 6.90,
            image: 'https://images.unsplash.com/photo-1626082927389-6cd4f504b4cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ],
    bebidas: [
        {
            id: 14,
            name: 'Refrigerante',
            description: 'Refrigerante lata 350ml',
            price: 6.90,
            image: 'https://images.pexels.com/photos/3686790/pexels-photo-3686790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 15,
            name: 'Suco Natural',
            description: 'Suco natural 300ml',
            price: 8.90,
            image: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ],
    sobremesas: [
        {
            id: 16,
            name: 'Sorvete',
            description: 'Sorvete de creme com calda de chocolate',
            price: 12.90,
            image: 'https://images.pexels.com/photos/3631/summer-dessert-sweet-ice-cream.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 17,
            name: 'Torta de Maçã',
            description: 'Torta de maçã com sorvete de creme',
            price: 15.90,
            image: 'https://cdn.pixabay.com/photo/2015/08/25/06/44/pie-906272_1280.jpg'
        }
    ]
};

// Função para criar os cards do menu
function createMenuCards(category) {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = ''; // Limpa o grid

    const items = menuData[category];
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <p class="menu-item-price">R$ ${item.price.toFixed(2)}</p>
                <button class="menu-item-button" onclick="addToCart(${item.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Função para trocar de categoria
function changeCategory(category) {
    // Atualiza os botões
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });

    // Atualiza os itens
    createMenuCards(category);
}

// Função para adicionar item ao carrinho
function addToCart(itemId) {
    // Procura o item em todas as categorias
    let item = null;
    for (const category in menuData) {
        const foundItem = menuData[category].find(item => item.id === itemId);
        if (foundItem) {
            item = foundItem;
            break;
        }
    }

    if (item) {
        window.cartManager.addItem(item);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carrega a primeira categoria
    createMenuCards('combos');

    // Adiciona eventos aos botões de categoria
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            changeCategory(tab.dataset.category);
        });
    });
}); 