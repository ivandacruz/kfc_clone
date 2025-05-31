document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const produtosLista = document.getElementById('produtosLista');
    const carrinhoVazio = document.getElementById('carrinhoVazio');
    const subtotalElement = document.getElementById('subtotal');
    const taxaEntregaElement = document.getElementById('taxaEntrega');
    const totalElement = document.getElementById('total');
    const cupomInput = document.getElementById('cupomInput');
    const aplicarCupomBtn = document.getElementById('aplicarCupom');
    const finalizarPedidoBtn = document.getElementById('finalizarPedido');

    // Constantes
    const TAXA_ENTREGA = 5.00;
    const CUPONS = {
        'FC10': 0.10, // 10% de desconto
        'FC20': 0.20, // 20% de desconto
        'FC30': 0.30  // 30% de desconto
    };

    let cupomAplicado = null;

    // Funções auxiliares
    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function atualizarCarrinho() {
        const carrinho = window.cartManager.getItems();
        
        // Atualizar lista de produtos
        if (carrinho.length === 0) {
            produtosLista.style.display = 'none';
            carrinhoVazio.style.display = 'block';
            finalizarPedidoBtn.disabled = true;
        } else {
            produtosLista.style.display = 'block';
            carrinhoVazio.style.display = 'none';
            finalizarPedidoBtn.disabled = false;
            renderizarProdutos(carrinho);
        }

        // Atualizar valores
        const subtotal = window.cartManager.getTotal();
        const desconto = cupomAplicado ? subtotal * CUPONS[cupomAplicado] : 0;
        const total = subtotal - desconto + TAXA_ENTREGA;

        subtotalElement.textContent = formatarPreco(subtotal);
        taxaEntregaElement.textContent = formatarPreco(TAXA_ENTREGA);
        totalElement.textContent = formatarPreco(total);
    }

    function renderizarProdutos(carrinho) {
        produtosLista.innerHTML = carrinho.map((item) => `
            <div class="produto-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="produto-imagem">
                <div class="produto-info">
                    <h3 class="produto-nome">${item.name}</h3>
                    <p class="produto-descricao">${item.description}</p>
                    <span class="produto-preco">${formatarPreco(item.price)}</span>
                </div>
                <div class="produto-controles">
                    <div class="quantidade-controle">
                        <button class="quantidade-btn diminuir" onclick="diminuirQuantidade(${item.id})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantidade-valor">${item.quantity}</span>
                        <button class="quantidade-btn aumentar" onclick="aumentarQuantidade(${item.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remover-produto" onclick="removerProduto(${item.id})">
                        <i class="fas fa-trash"></i>
                        Remover
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Funções globais para manipulação do carrinho
    window.aumentarQuantidade = (itemId) => {
        const item = window.cartManager.getItems().find(item => item.id === itemId);
        if (item) {
            window.cartManager.updateQuantity(itemId, item.quantity + 1);
            atualizarCarrinho();
        }
    };

    window.diminuirQuantidade = (itemId) => {
        const item = window.cartManager.getItems().find(item => item.id === itemId);
        if (item) {
            window.cartManager.updateQuantity(itemId, item.quantity - 1);
            atualizarCarrinho();
        }
    };

    window.removerProduto = (itemId) => {
        window.cartManager.removeItem(itemId);
        atualizarCarrinho();
    };

    // Event Listeners
    aplicarCupomBtn.addEventListener('click', () => {
        const codigo = cupomInput.value.toUpperCase();
        if (CUPONS[codigo]) {
            cupomAplicado = codigo;
            showMessage(`Cupom ${codigo} aplicado com sucesso!`);
            atualizarCarrinho();
        } else {
            showError('Cupom inválido!');
        }
    });

    finalizarPedidoBtn.addEventListener('click', () => {
        const carrinho = window.cartManager.getItems();
        if (carrinho.length === 0) {
            showError('Adicione produtos ao carrinho para finalizar o pedido.');
            return;
        }

        // Simular processamento do pedido
        finalizarPedidoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        finalizarPedidoBtn.disabled = true;

        setTimeout(() => {
            // Limpar carrinho
            window.cartManager.clearCart();
            cupomAplicado = null;
            cupomInput.value = '';

            // Mostrar mensagem de sucesso
            showMessage('Pedido realizado com sucesso! Redirecionando...');

            // Redirecionar para página de confirmação
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }, 1500);
    });

    // Funções de mensagem
    function showMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message success';
        messageElement.textContent = message;
        document.querySelector('.carrinho-container').insertBefore(
            messageElement,
            document.querySelector('.carrinho-content')
        );

        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'message error';
        errorElement.textContent = message;
        document.querySelector('.carrinho-container').insertBefore(
            errorElement,
            document.querySelector('.carrinho-content')
        );

        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }

    // Inicializar carrinho
    atualizarCarrinho();
}); 