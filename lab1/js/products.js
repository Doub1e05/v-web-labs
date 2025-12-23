// Product Data
const products = [
    {
        id: 1,
        name: "Худи с принтом",
        category: "hoodies",
        price: 999,
        originalPrice: 1199,
        image: "hoodie.jpg",
        description: "Удобное худи с принтом, 100% хлопок",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 2,
        name: "Широкие шорты",
        category: "shorts",
        price: 999,
        originalPrice: 1199,
        image: "shorts.jpg",
        description: "Стильные широкие шорты для лета",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 3,
        name: "Широкие шорты (синие)",
        category: "shorts",
        price: 899,
        originalPrice: 1099,
        image: "shorts-blue.jpg",
        description: "Синие широкие шорты из денима",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 4,
        name: "Худи оверсайз",
        category: "hoodies",
        price: 1299,
        originalPrice: 1599,
        image: "hoodie-oversize.jpg",
        description: "Свободное худи оверсайз размера",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 5,
        name: "Шорты спортивные",
        category: "shorts",
        price: 799,
        originalPrice: 999,
        image: "shorts-sport.jpg",
        description: "Спортивные шорты для тренировок",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 6,
        name: "Футболка с принтом",
        category: "t-shirts",
        price: 599,
        originalPrice: 799,
        image: "t-shirt.jpg",
        description: "Хлопковая футболка с принтом",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 7,
        name: "Худи с капюшоном",
        category: "hoodies",
        price: 1399,
        originalPrice: 1699,
        image: "hoodie-hood.jpg",
        description: "Теплое худи с капюшоном",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    },
    {
        id: 8,
        name: "Шорты летние",
        category: "shorts",
        price: 699,
        originalPrice: 899,
        image: "shorts-summer.jpg",
        description: "Легкие летние шорты",
        inCart: false,
        inFavorites: false,
        cartQuantity: 0
    }
];

// Product functions
function getProductById(id) {
    return products.find(product => product.id === id);
}

function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

function searchProducts(query) {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

function updateProductCartStatus(productId, inCart, quantity = 0) {
    const product = getProductById(productId);
    if (product) {
        product.inCart = inCart;
        product.cartQuantity = quantity;
    }
}

function getCategoryCounts() {
    return {
        all: products.length,
        hoodies: products.filter(p => p.category === 'hoodies').length,
        shorts: products.filter(p => p.category === 'shorts').length,
        't-shirts': products.filter(p => p.category === 't-shirts').length
    };
}