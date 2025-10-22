
const mockProducts = [
  {
    id: 1,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим0',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 5,
    sVolume: 200
  },
  {
    id: 2,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим1',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 100,
    sVolume: 500
  },
  {
    id: 3,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим2',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 200,
    sVolume: 700
  },
  {
    id: 4,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим3',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female',
    fVolume: 10,
    sVolume: 300
  },
  {
    id: 5,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим4',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 5,
    sVolume: 200
  },
  {
    id: 6,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим5',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female',
    fVolume: 300,
    sVolume: 900
  },
  {
    id: 7,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим6',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 50,
    sVolume: 350
  },
  {
    id: 8,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим7',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 100,
    sVolume: 900
  },
  {
    id: 9,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим8',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female',
    fVolume: 5,
    sVolume: 100
  },
  {
    id: 10,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим9',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 150,
    sVolume: 650
  },
  {
    id: 11,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим0',
    category: 'Кал',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'female',
    fVolume: 400,
    sVolume: 700
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

  getProductsByBrand: async (brand) => {
    const productsList = mockProducts.filter(p => p.brand === brand);

    return productsList
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