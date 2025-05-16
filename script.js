/**
 * AR Distribuidora - JavaScript
 * Main script file for interactive functionality
 */

// Global Variables
let currentProductData = null;
let currentArticleData = null;
let isMenuOpen = false;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadPageSpecificFunctions();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Set current year in footer if exists
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize modals
    initializeModals();
    
    // Initialize product filters if on products page
    if (window.location.pathname.includes('produtos')) {
        initializeProductFilters();
    }
    
    // Initialize content filters if on content page
    if (window.location.pathname.includes('conteudo')) {
        initializeContentFilters();
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Initialize mobile menu
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navigation = document.querySelector('.navigation');
    
    if (!mobileMenuBtn || !navigation) return;
    
    // Clone navigation for mobile
    const mobileNav = navigation.cloneNode(true);
    mobileNav.classList.add('mobile-navigation');
    mobileNav.style.display = 'none';
    
    // Insert mobile navigation after header
    const header = document.querySelector('.header');
    if (header) {
        header.appendChild(mobileNav);
    }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const mobileNav = document.querySelector('.mobile-navigation');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (!mobileNav || !mobileMenuBtn) return;
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileNav.style.display = 'flex';
        mobileNav.style.flexDirection = 'column';
        mobileNav.style.position = 'absolute';
        mobileNav.style.top = '100%';
        mobileNav.style.left = '0';
        mobileNav.style.right = '0';
        mobileNav.style.backgroundColor = 'white';
        mobileNav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        mobileNav.style.padding = '1rem';
        mobileNav.style.zIndex = '999';
        
        // Add active class to menu button
        mobileMenuBtn.classList.add('active');
    } else {
        mobileNav.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
    }
}

/**
 * Initialize modals
 */
function initializeModals() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });
}

/**
 * Close all modals
 */
function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('show');
    });
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}

/**
 * Close specific modal
 */
function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

/**
 * Open modal
 */
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Load page-specific functions
 */
function loadPageSpecificFunctions() {
    const path = window.location.pathname;
    
    if (path.includes('produtos')) {
        loadProductPageFunctions();
    } else if (path.includes('conteudo')) {
        loadContentPageFunctions();
    } else if (path.includes('instaladores')) {
        loadInstallersPageFunctions();
    } else if (path.includes('contato')) {
        loadContactPageFunctions();
    }
}

/**
 * Product page functions
 */
function loadProductPageFunctions() {
    // Initialize product data
    initializeProductData();
    
    // Add to favorites functionality
    window.addToFavorites = function(productId) {
        // Get existing favorites
        let favorites = JSON.parse(localStorage.getItem('ar_favorites') || '[]');
        
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            localStorage.setItem('ar_favorites', JSON.stringify(favorites));
            
            // Update UI
            const btn = document.querySelector(`[onclick="addToFavorites('${productId}')"]`);
            if (btn) {
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                btn.style.color = '#ff4444';
            }
            
            showNotification('Produto adicionado aos favoritos!');
        } else {
            showNotification('Produto já está nos favoritos!');
        }
    };
}

/**
 * Initialize product data
 */
function initializeProductData() {
    // Sample product data - in a real app, this would come from an API
    window.productData = {
        'kit-4-cameras': {
            name: 'Kit 4 Câmeras HD + DVR 4 Canais',
            shopeeUrl: 'https://shopee.com.br/kit-4-cameras-ar-distribuidora',
            description: 'Kit completo para residências pequenas e comércios...',
            features: ['Full HD 1080p', 'App Grátis', 'Fácil Instalação', '3 Anos Garantia'],
            price: 399.90,
            oldPrice: 599.90,
            images: ['images/kit-4-cameras.jpg'],
            specifications: {
                'Câmeras': '4x HD 1080p',
                'DVR': '4 canais, H.264',
                'Armazenamento': 'HD 1TB incluído',
                'Acesso Remoto': 'App gratuito',
                'Garantia': '3 anos'
            }
        },
        'kit-8-cameras': {
            name: 'Kit 8 Câmeras HD + DVR 8 Canais',
            shopeeUrl: 'https://shopee.com.br/kit-8-cameras-ar-distribuidora',
            description: 'Kit profissional para propriedades maiores...',
            features: ['Full HD 1080p', 'Visão Noturna', 'Backup Nuvem', 'IA Integrada'],
            price: 699.90,
            images: ['images/kit-8-cameras.jpg'],
            specifications: {
                'Câmeras': '8x HD 1080p',
                'DVR': '8 canais com IA',
                'Armazenamento': 'HD 2TB incluído',
                'Recursos': 'Detecção inteligente',
                'Garantia': '3 anos'
            }
        },
        'kit-16-cameras': {
            name: 'Kit 16 Câmeras HD + DVR 16 Canais',
            shopeeUrl: 'https://shopee.com.br/kit-16-cameras-ar-distribuidora',
            description: 'Sistema profissional para empresas e condomínios...',
            features: ['Ultra HD 4K', 'Reconhecimento Facial', 'Alertas Inteligentes', 'Monitoramento 24/7'],
            price: 1299.90,
            images: ['images/kit-16-cameras.jpg'],
            specifications: {
                'Câmeras': '16x Ultra HD 4K',
                'DVR': '16 canais profissional',
                'Recursos': 'IA avançada',
                'Reconhecimento': 'Facial e objetos',
                'Garantia': '3 anos'
            }
        },
        'camera-individual': {
            name: 'Câmera HD Individual',
            shopeeUrl: 'https://shopee.com.br/camera-individual-ar-distribuidora',
            description: 'Câmera HD para expansão ou reposição...',
            features: ['Full HD 1080p', 'Visão Noturna', 'IP66', 'Fácil Instalação'],
            price: 89.90,
            images: ['images/camera-individual.jpg'],
            specifications: {
                'Resolução': 'Full HD 1080p',
                'Visão Noturna': 'Até 30m',
                'Proteção': 'IP66',
                'Instalação': 'Plug & Play',
                'Garantia': '2 anos'
            }
        },
        'dvr-4-canais': {
            name: 'DVR 4 Canais Full HD',
            shopeeUrl: 'https://shopee.com.br/dvr-4-canais-ar-distribuidora',
            description: 'Gravador digital para 4 câmeras...',
            features: ['HD 1TB Incluso', 'Acesso Remoto', 'Backup Automático', 'Plug & Play'],
            price: 199.90,
            images: ['images/dvr-4-canais.jpg'],
            specifications: {
                'Canais': '4 canais HD',
                'Armazenamento': 'HD 1TB incluso',
                'Compressão': 'H.264',
                'Acesso': 'App + Web',
                'Garantia': '2 anos'
            }
        },
        'dvr-8-canais': {
            name: 'DVR 8 Canais com IA',
            shopeeUrl: 'https://shopee.com.br/dvr-8-canais-ar-distribuidora',
            description: 'DVR avançado com inteligência artificial...',
            features: ['HD 2TB Incluso', 'IA Integrada', 'Backup Nuvem', 'Alertas SMS'],
            price: 349.90,
            images: ['images/dvr-8-canais.jpg'],
            specifications: {
                'Canais': '8 canais HD + IA',
                'Armazenamento': 'HD 2TB incluso',
                'IA': 'Detecção de movimento',
                'Backup': 'Local + Nuvem',
                'Garantia': '3 anos'
            }
        },
        'kit-cabos': {
            name: 'Kit de Cabos 20m',
            shopeeUrl: 'https://shopee.com.br/kit-cabos-ar-distribuidora',
            description: 'Kit com 4 cabos coaxiais...',
            features: ['4 Cabos 20m', 'Conectores BNC', 'Adaptadores Força', 'Fácil Instalação'],
            price: 45.90,
            images: ['images/kit-cabos.jpg'],
            specifications: {
                'Quantidade': '4 cabos',
                'Comprimento': '20m cada',
                'Conectores': 'BNC + Força',
                'Material': 'Cobre + Malha',
                'Garantia': '1 ano'
            }
        },
        'fonte-alimentacao': {
            name: 'Fonte de Alimentação 12V 5A',
            shopeeUrl: 'https://shopee.com.br/fonte-ar-distribuidora',
            description: 'Fonte chaveada para alimentação...',
            features: ['12V 5A', 'Proteção', 'Anatel', 'Eficiência A+'],
            price: 29.90,
            images: ['images/fonte-alimentacao.jpg'],
            specifications: {
                'Voltagem': '12V DC',
                'Amperagem': '5A',
                'Certificação': 'Anatel',
                'Proteções': 'Sobrecarga + Curto',
                'Garantia': '1 ano'
            }
        }
    };
}

/**
 * Initialize product filters
 */
function initializeProductFilters() {
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersGrid = document.getElementById('filtersGrid');
    
    if (filtersToggle) {
        filtersToggle.addEventListener('click', function() {
            filtersGrid.classList.toggle('show');
            
            const icon = this.querySelector('i');
            if (filtersGrid.classList.contains('show')) {
                icon.classList.replace('fa-filter', 'fa-times');
                this.textContent = 'Fechar Filtros';
                this.prepend(icon);
            } else {
                icon.classList.replace('fa-times', 'fa-filter');
                this.textContent = 'Filtros';
                this.prepend(icon);
            }
        });
    }
}

/**
 * Apply product filters
 */
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const camerasFilter = document.getElementById('camerasFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    const products = document.querySelectorAll('.product-card');
    let filteredProducts = Array.from(products);
    
    // Apply filters
    filteredProducts = filteredProducts.filter(product => {
        // Category filter
        if (categoryFilter !== 'all') {
            const category = product.dataset.category;
            if (!category.includes(categoryFilter)) return false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            const price = parseFloat(product.dataset.price);
            if (!filterByPrice(price, priceFilter)) return false;
        }
        
        // Cameras filter
        if (camerasFilter !== 'all') {
            const cameras = product.dataset.cameras;
            if (cameras !== camerasFilter && cameras !== 'all') return false;
        }
        
        return true;
    });
    
    // Hide all products first
    products.forEach(product => {
        product.style.display = 'none';
    });
    
    // Show filtered products
    filteredProducts.forEach(product => {
        product.style.display = 'block';
    });
    
    // Apply sorting
    sortProducts(filteredProducts, sortFilter);
    
    // Show message if no products found
    const productsGrid = document.getElementById('productsGrid');
    if (filteredProducts.length === 0) {
        showNoResultsMessage(productsGrid);
    } else {
        removeNoResultsMessage(productsGrid);
    }
    
    // Scroll to products
    if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Filter by price range
 */
function filterByPrice(price, range) {
    switch (range) {
        case '0-100': return price <= 100;
        case '100-300': return price > 100 && price <= 300;
        case '300-500': return price > 300 && price <= 500;
        case '500-1000': return price > 500 && price <= 1000;
        case '1000+': return price > 1000;
        default: return true;
    }
}

/**
 * Sort products
 */
function sortProducts(products, sortBy) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    // Convert NodeList to Array and sort
    const sortedProducts = products.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            case 'price-high':
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            case 'newest':
                // For now, just reverse the order
                return -1;
            default:
                return 0;
        }
    });
    
    // Reorder DOM elements
    sortedProducts.forEach(product => {
        grid.appendChild(product);
    });
}

/**
 * Show no results message
 */
function showNoResultsMessage(container) {
    removeNoResultsMessage(container);
    
    const message = document.createElement('div');
    message.className = 'no-results';
    message.innerHTML = `
        <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
            <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
            <h3 style="color: #666; margin-bottom: 0.5rem;">Nenhum produto encontrado</h3>
            <p style="color: #999;">Tente ajustar os filtros para encontrar produtos.</p>
        </div>
    `;
    container.appendChild(message);
}

/**
 * Remove no results message
 */
function removeNoResultsMessage(container) {
    const existing = container.querySelector('.no-results');
    if (existing) {
        existing.remove();
    }
}

/**
 * Open quick view modal
 */
function openQuickView(productId) {
    const modal = document.getElementById('quickViewModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    const shopeeBtn = document.getElementById('modalShopeeBtn');
    
    if (!modal || !window.productData[productId]) return;
    
    const product = window.productData[productId];
    currentProductData = product;
    
    title.textContent = product.name;
    
    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
            <img src="${product.images[0]}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
            <div>
                <div style="margin-bottom: 1rem;">
                    ${product.features.map(feature => 
                        `<span style="background: #f0f8ff; color: #2196f3; padding: 4px 12px; border-radius: 20px; 
                         display: inline-block; margin: 2px; font-size: 0.875rem;">${feature}</span>`
                    ).join('')}
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; color: #1a237e; margin-bottom: 1rem;">
                    ${product.oldPrice ? `<span style="text-decoration: line-through; color: #999; 
                     font-size: 1rem; margin-right: 0.5rem;">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                    R$ ${product.price.toFixed(2)}
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #1a237e; margin-bottom: 1rem;">Descrição</h4>
            <p style="color: #666; line-height: 1.6;">${product.description}</p>
        </div>
        
        <div>
            <h4 style="color: #1a237e; margin-bottom: 1rem;">Especificações</h4>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                ${Object.entries(product.specifications).map(([key, value]) => 
                    `<div style="display: flex; justify-content: space-between; padding: 0.5rem 0; 
                     border-bottom: 1px solid #e1e1e1;">
                        <span style="font-weight: 600; color: #333;">${key}:</span>
                        <span style="color: #666;">${value}</span>
                    </div>`
                ).join('')}
            </div>
        </div>
    `;
    
    shopeeBtn.onclick = () => redirectToShopee(productId);
    
    openModal(modal);
}

/**
 * Close quick view modal
 */
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) closeModal(modal);
}

/**
 * Redirect to Shopee
 */
function redirectToShopee(productId) {
    if (window.productData && window.productData[productId]) {
        window.open(window.productData[productId].shopeeUrl, '_blank');
    } else {
        // Fallback to general Shopee page
        window.open('https://shopee.com.br/search?keyword=AR%20Distribuidora', '_blank');
    }
}

/**
 * Load more products
 */
function loadMoreProducts() {
    // Simulate loading more products
    showNotification('Carregando mais produtos...');
    
    setTimeout(() => {
        showNotification('Todos os produtos foram carregados!');
    }, 1000);
}

/**
 * Content page functions
 */
function loadContentPageFunctions() {
    // Initialize content data
    initializeContentData();
}

/**
 * Initialize content data
 */
function initializeContentData() {
    window.contentData = {
        'guia-completo-kit-cftv': {
            title: 'Guia Completo: Como Escolher o Kit CFTV Ideal',
            category: 'Guia de Compra',
            readTime: '10 min',
            content: `
                <h2>Introdução</h2>
                <p>Escolher o kit CFTV ideal para sua residência ou empresa pode parecer complexo, mas com as informações certas, torna-se uma tarefa simples e eficiente.</p>
                
                <h3>1. Avalie suas necessidades</h3>
                <p>Antes de escolher um kit, considere:</p>
                <ul>
                    <li>Tamanho da área a ser monitorada</li>
                    <li>Número de pontos críticos</li>
                    <li>Orçamento disponível</li>
                    <li>Necessidade de visão noturna</li>
                </ul>
                
                <h3>2. Tipos de câmeras</h3>
                <p>Existem diferentes tipos de câmeras para diferentes necessidades:</p>
                <ul>
                    <li><strong>Câmeras Dome:</strong> Discretas e versáteis</li>
                    <li><strong>Câmeras Bullet:</strong> Ideais para áreas externas</li>
                    <li><strong>Câmeras PTZ:</strong> Com movimento e zoom</li>
                </ul>
                
                <h3>3. Resolução das câmeras</h3>
                <p>A resolução determina a qualidade das imagens:</p>
                <ul>
                    <li><strong>HD (720p):</strong> Boa para uso básico</li>
                    <li><strong>Full HD (1080p):</strong> Padrão atual recomendado</li>
                    <li><strong>4K:</strong> Máxima qualidade para aplicações críticas</li>
                </ul>
                
                <h3>4. Capacidade de armazenamento</h3>
                <p>O DVR precisa ter capacidade adequada:</p>
                <ul>
                    <li>1TB: Suficiente para 4 câmeras Full HD por 30 dias</li>
                    <li>2TB: Ideal para 8 câmeras ou gravação por mais tempo</li>
                    <li>4TB+: Para sistemas profissionais</li>
                </ul>
                
                <h3>5. Recursos adicionais</h3>
                <p>Considere recursos que podem ser úteis:</p>
                <ul>
                    <li>Acesso remoto via app</li>
                    <li>Visão noturna infravermelha</li>
                    <li>Detecção de movimento</li>
                    <li>Gravação em nuvem</li>
                    <li>Inteligência artificial</li>
                </ul>
                
                <h3>Conclusão</h3>
                <p>A escolha do kit CFTV ideal depende de suas necessidades específicas, orçamento e recursos desejados. Na AR Distribuidora, oferecemos kits completos para todas as necessidades, desde residências pequenas até empresas de grande porte.</p>
                
                <p><strong>Dica:</strong> Se ainda tiver dúvidas, entre em contato conosco. Nossa equipe técnica está pronta para ajudar na escolha do sistema perfeito para você!</p>
            `
        },
        'instalacao-passo-a-passo': {
            title: 'Instalação de Câmeras CFTV: Passo a Passo',
            category: 'Guias',
            readTime: '8 min',
            content: `
                <h2>Instalação Simplificada</h2>
                <p>Instalar seu sistema de câmeras AR Distribuidora é mais fácil do que você imagina. Siga este guia passo a passo!</p>
                
                <h3>Antes de começar</h3>
                <p>Ferramentas necessárias:</p>
                <ul>
                    <li>Furadeira</li>
                    <li>Chaves de fenda e Phillips</li>
                    <li>Escada</li>
                    <li>Nível</li>
                    <li>Fita isolante</li>
                </ul>
                
                <h3>Passo 1: Planejamento</h3>
                <p>- Defina os pontos de instalação das câmeras<br>
                - Verifique a passagem dos cabos<br>
                - Escolha o local do DVR</p>
                
                <h3>Passo 2: Instalação das câmeras</h3>
                <p>- Fixe o suporte na parede<br>
                - Conecte a câmera ao suporte<br>
                - Ajuste o ângulo de visão</p>
                
                <h3>Passo 3: Passagem de cabos</h3>
                <p>- Use os cabos incluídos no kit<br>
                - Proteja as emendas com fita isolante<br>
                - Evite dobrar excessivamente os cabos</p>
                
                <h3>Passo 4: Conexão ao DVR</h3>
                <p>- Conecte cada câmera a uma entrada do DVR<br>
                - Ligue a fonte de alimentação<br>
                - Conecte o monitor HDMI</p>
                
                <h3>Passo 5: Configuração inicial</h3>
                <p>- Ligue o sistema<br>
                - Ajuste data e hora<br>
                - Configure a gravação<br>
                - Teste todas as câmeras</p>
                
                <h3>Passo 6: App móvel</h3>
                <p>- Baixe o app AR Security<br>
                - Configure o acesso remoto<br>
                - Teste a visualização no celular</p>
                
                <h3>Dicas importantes</h3>
                <ul>
                    <li>Posicione câmeras longe do alcance de estranhos</li>
                    <li>Evite apontar para o sol diretamente</li>
                    <li>Mantenha lentes limpas</li>
                    <li>Faça backup das configurações</li>
                </ul>
            `
        },
        'cameras-hd-vs-4k': {
            title: 'Câmeras HD vs 4K: Qual Escolher em 2025?',
            category: 'Comparativos',
            readTime: '6 min',
            content: `
                <h2>HD vs 4K: A Comparação Definitiva</h2>
                <p>Com a evolução da tecnologia, surge a dúvida: vale a pena investir em câmeras 4K ou as Full HD ainda atendem bem?</p>
                
                <h3>Câmeras Full HD (1080p)</h3>
                <h4>Vantagens:</h4>
                <ul>
                    <li>Custo menor</li>
                    <li>Menor uso de armazenamento</li>
                    <li>Compatibilidade ampla</li>
                    <li>Boa qualidade para uso residencial</li>
                </ul>
                
                <h4>Desvantagens:</h4>
                <ul>
                    <li>Menor detalhamento em zoom</li>
                    <li>Qualidade inferior em áreas grandes</li>
                </ul>
                
                <h3>Câmeras 4K (Ultra HD)</h3>
                <h4>Vantagens:</h4>
                <ul>
                    <li>Máxima qualidade de imagem</li>
                    <li>Excelente para zoom digital</li>
                    <li>Ideal para áreas amplas</li>
                    <li>Futuro-proof</li>
                </ul>
                
                <h4>Desvantagens:</h4>
                <ul>
                    <li>Custo mais elevado</li>
                    <li>Maior uso de armazenamento</li>
                    <li>Necessita internet mais rápida</li>
                </ul>
                
                <h3>Comparação de Armazenamento</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 0.75rem; border: 1px solid #ddd;">Resolução</th>
                        <th style="padding: 0.75rem; border: 1px solid #ddd;">Espaço/Hora</th>
                        <th style="padding: 0.75rem; border: 1px solid #ddd;">30 Dias (4 câmeras)</th>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; border: 1px solid #ddd;">Full HD</td>
                        <td style="padding: 0.75rem; border: 1px solid #ddd;">2GB</td>
                        <td style="padding: 0.75rem; border: 1px solid #ddd;">1.4TB</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 0.75rem; border: 1px solid #ddd;">4K</td>
                        <td style="padding: 0.75rem; border: 1px solid #ddd;">8GB</td>
                        <td style="padding: 0.75rem; border: 1px solid #ddd;">5.6TB</td>
                    </tr>
                </table>
                
                <h3>Quando escolher Full HD</h3>
                <ul>
                    <li>Orçamento limitado</li>
                    <li>Residências pequenas</li>
                    <li>Uso básico de segurança</li>
                    <li>Internet limitada</li>
                </ul>
                
                <h3>Quando escolher 4K</h3>
                <ul>
                    <li>Empresas e comércios</li>
                    <li>Áreas extensas</li>
                    <li>Necessidade de zoom</li>
                    <li>Orçamento flexível</li>
                </ul>
                
                <h3>Nossa Recomendação</h3>
                <p>Para 2025, recomendamos:</p>
                <ul>
                    <li><strong>Residencial:</strong> Full HD ainda é excelente</li>
                    <li><strong>Comercial:</strong> 4K oferece vantagens significativas</li>
                    <li><strong>Híbrido:</strong> Câmeras 4K em pontos críticos + Full HD em áreas secundárias</li>
                </ul>
            `
        }
    };
    
    window.videoData = {
        'configuracao-app': {
            title: 'Como Configurar o App de Monitoramento',
            duration: '12 min',
            videoUrl: 'https://example.com/video-configuracao-app.mp4'
        },
        'instalacao-60-segundos': {
            title: 'Instalação de Câmera em 60 Segundos',
            duration: '1 min',
            videoUrl: 'https://example.com/video-instalacao-rapida.mp4'
        }
    };
}

/**
 * Initialize content filters
 */
function initializeContentFilters() {
    // Content filtering is handled by the filterContent function
}

/**
 * Filter content by category
 */
function filterContent(category) {
    const contentCards = document.querySelectorAll('.content-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Update active button
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter content
    contentCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Check if no results
    const visibleCards = document.querySelectorAll('.content-card[style*="block"], .content-card:not([style])');
    const contentGrid = document.getElementById('contentGrid');
    
    if (visibleCards.length === 0) {
        showNoResultsMessage(contentGrid);
    } else {
        removeNoResultsMessage(contentGrid);
    }
}

/**
 * Search content
 */
function searchContent() {
    const searchTerm = document.getElementById('contentSearch').value.toLowerCase();
    const contentCards = document.querySelectorAll('.content-card');
    let hasResults = false;
    
    contentCards.forEach(card => {
        const title = card.querySelector('.content-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.content-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    const contentGrid = document.getElementById('contentGrid');
    if (!hasResults) {
        showNoResultsMessage(contentGrid);
    } else {
        removeNoResultsMessage(contentGrid);
    }
}

/**
 * Open article modal
 */
function openArticle(articleId) {
    const modal = document.getElementById('articleModal');
    const title = document.getElementById('articleTitle');
    const content = document.getElementById('articleContent');
    
    if (!modal || !window.contentData[articleId]) return;
    
    const article = window.contentData[articleId];
    currentArticleData = article;
    
    title.textContent = article.title;
    content.innerHTML = article.content;
    
    openModal(modal);
}

/**
 * Close article modal
 */
function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) closeModal(modal);
}

/**
 * Open video modal
 */
function openVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const title = document.getElementById('videoTitle');
    const content = document.getElementById('videoContent');
    
    if (!modal || !window.videoData[videoId]) return;
    
    const video = window.videoData[videoId];
    
    title.textContent = video.title;
    content.innerHTML = `
        <video controls class="video-player" poster="images/${videoId}.jpg">
            <source src="${video.videoUrl}" type="video/mp4">
            Seu navegador não suporta o elemento de vídeo.
        </video>
    `;
    
    openModal(modal);
}

/**
 * Close video modal
 */
function closeVideo() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        // Stop video when closing
        const video = modal.querySelector('video');
        if (video) video.pause();
        closeModal(modal);
    }
}

/**
 * Share article
 */
function shareArticle() {
    if (!currentArticleData) return;
    
    if (navigator.share) {
        navigator.share({
            title: currentArticleData.title,
            text: `Leia este artigo da AR Distribuidora: ${currentArticleData.title}`,
            url: window.location.href
        });
    } else {
        // Fallback - copy link to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Link copiado para a área de transferência!');
    }
}

/**
 * Print article
 */
function printArticle() {
    if (!currentArticleData) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>${currentArticleData.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1, h2, h3 { color: #1a237e; }
                    h1 { border-bottom: 2px solid #2196f3; padding-bottom: 10px; }
                    ul { padding-left: 20px; }
                    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
                    th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
                    th { background-color: #f8f9fa; }
                </style>
            </head>
            <body>
                <h1>${currentArticleData.title}</h1>
                ${currentArticleData.content}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

/**
 * Load more content
 */
function loadMoreContent() {
    showNotification('Carregando mais conteúdo...');
    
    setTimeout(() => {
        showNotification('Todo o conteúdo foi carregado!');
    }, 1000);
}

/**
 * Subscribe to newsletter
 */
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailNewsletter').value;
    
    if (!email) {
        showNotification('Por favor, insira um email válido!', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Inscrevendo...');
    
    setTimeout(() => {
        showNotification('Inscrição realizada com sucesso!', 'success');
        document.getElementById('emailNewsletter').value = '';
    }, 1000);
}

/**
 * Installers page functions
 */
function loadInstallersPageFunctions() {
    // FAQ functionality
    window.toggleFaq = function(index) {
        const question = document.querySelector(`#faq-${index}`).parentElement.querySelector('.faq-question');
        const answer = document.querySelector(`#faq-${index}`);
        
        question.classList.toggle('active');
        answer.classList.toggle('show');
    };
    
    // Select tier functionality
    window.selectTier = function(tier) {
        // Update UI to show selected tier
        document.querySelectorAll('.tier-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelector(`[onclick="selectTier('${tier}')"]`).closest('.tier-card').classList.add('selected');
        
        // Pre-fill partnership form with tier
        const tierSelect = document.getElementById('tier');
        if (tierSelect) {
            tierSelect.value = tier;
        }
        
        // Open partnership form
        openPartnershipForm();
    };
    
    // Scroll to section functionality
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

/**
 * Open partnership form modal
 */
function openPartnershipForm() {
    const modal = document.getElementById('partnershipModal');
    if (modal) openModal(modal);
}

/**
 * Close partnership form modal
 */
function closePartnershipForm() {
    const modal = document.getElementById('partnershipModal');
    if (modal) closeModal(modal);
}

/**
 * Submit partnership form
 */
function submitPartnershipForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.companyName || !data.cnpj) {
        showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Enviando solicitação...');
    
    setTimeout(() => {
        showNotification('Solicitação enviada com sucesso! Entraremos em contato em até 24 horas.', 'success');
        closePartnershipForm();
        form.reset();
    }, 2000);
}

/**
 * Contact page functions
 */
function loadContactPageFunctions() {
    // Contact form submission
    window.submitContactForm = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message || !data.privacy) {
            showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, insira um email válido!', 'error');
            return;
        }
        
        // Simulate API call
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            form.reset();
        }, 2000);
    };
    
    // Add FAQ toggle functionality
    window.toggleFaq = function(index) {
        const question = document.querySelector(`#faq-${index}`).parentElement.querySelector('.faq-question');
        const answer = document.querySelector(`#faq-${index}`);
        
        question.classList.toggle('active');
        answer.classList.toggle('show');
    };
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    if (message) {
        message.classList.add('show');
    }
}

/**
 * Close success message
 */
function closeSuccessMessage() {
    const message = document.getElementById('successMessage');
    if (message) {
        message.classList.remove('show');
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: transparent;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
            ">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Add slide-in animation for notifications
 */
const style = document.createElement('style');
style.textContent = `
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

/**
 * Handle window resize
 */
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

/**
 * Handle scroll events
 */
window.addEventListener('scroll', function() {
    // Add/remove header shadow on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    }
});

/**
 * Initialize favorites (load from localStorage)
 */
function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('ar_favorites') || '[]');
    
    favorites.forEach(productId => {
        const btn = document.querySelector(`[onclick="addToFavorites('${productId}')"]`);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            btn.style.color = '#ff4444';
        }
    });
}

// Initialize favorites when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFavorites);

/**
 * Utility functions
 */
const utils = {
    // Debounce function for search
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format currency
    formatCurrency: function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    // Validate email
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Format phone number
    formatPhone: function(phone) {
        return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
};

// Export utils for global use
window.utils = utils;