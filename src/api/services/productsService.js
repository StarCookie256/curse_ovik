import { CURRENT_MODE, API_MODE, API_BASE_URL } from '../config';

const realProductsService = {
  getProductsSearch: async (filters, pagination) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filters: filters,
          pagination: pagination
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе на поиск');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Products search error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  getProductsByBrand: async (requestData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/bybrand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе на поиск');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Products fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  getProductsOfDay: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Product/ofday`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          // Если нужна авторизация:
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе товары дня');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Products fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  }
}

const mockProducts = [
  {
    id: 1,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим0',
    category: 'Пельмени0',
    image: '/no_photo.png',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 5,
    sVolume: 200,
    country: "РА-СИ-Я",
    manufactureYear: 2010,
    expirationDate: "36 месяцев с момента апробирования"
  },
  {
    id: 2,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим1',
    category: 'Пельмени1',
    image: '',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 100,
    sVolume: 500,
    country: "РА-СИ-Я",
    manufactureYear: 2010,
    expirationDate: "36 месяцев с момента апробирования"
  },
  {
    id: 3,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим2',
    category: 'Пельмени2',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Великолепные газики астольфо',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 200,
    sVolume: 700,
    country: "РА-СИ-Я",
    manufactureYear: 2010,
    expirationDate: "36 месяцев с момента апробирования"
  },
  {
    id: 4,
    name: 'Газики фембоев',
    brand: 'Брбр Патапим3',
    category: 'Пельмени3',
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
    category: 'Пельмени5',
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
    category: 'Пельмени6',
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
    category: 'Пельмени4',
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
    category: 'Пельмени9',
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
    category: 'Пельмени8',
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
    category: 'Пельмени7',
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
  },
  {
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
  }
];

const mockProductsService = {
  getProducts: async () => {
    return mockProducts;
  },

  getProductsByPage: async (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = mockProducts.slice(startIndex, endIndex);
    
    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(mockProducts.length / limit),
      totalProducts: mockProducts.length,
      hasNext: page < Math.ceil(mockProducts.length / limit),
      hasPrev: page > 1
    };
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

export const productService = CURRENT_MODE === API_MODE.MOCK 
  ? mockProductsService 
  : realProductsService;