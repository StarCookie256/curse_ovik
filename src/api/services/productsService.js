
const mockProducts = [
  {
    id: 1,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male'
  },
  {
    id: 2,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male'
  },
  {
    id: 3,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male'
  },
  {
    id: 4,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female'
  },
  {
    id: 5,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'unisex'
  },
  {
    id: 6,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'unisex'
  },
  {
    id: 7,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'unisex'
  },
  {
    id: 8,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male'
  },
  {
    id: 9,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female'
  },
  {
    id: 10,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male'
  },
  {
    id: 11,
    name: 'Газики фембоев',
    brand: 'Femboy Production',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female'
  }
];

const mockProductsService = {
  getProducts: async () => {
    return mockProducts;
  },

  getProductById: async (id) => {    
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Товар не найден');
    }
    
    return product;
  },

  updateProduct: async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const productIndex = mockProducts.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error('Товар не найден');
    }
    
    const updatedProduct = {
      ...mockProducts[productIndex],
      ...productData
    };
    
    console.log('Обновлен товар:', updatedProduct);
    
    return updatedProduct;
  }
};

export const productService = mockProductsService;