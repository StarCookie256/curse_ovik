import { CURRENT_MODE, API_MODE, API_BASE_URL } from '../config';

const realProductsService = {
  getProductPageInfo: async (productId) => {
    try {

      const response = await fetch(`${API_BASE_URL}/Product/pageinfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: productId
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

  getProductsSearch: async (filters,pagination) => {
    try {

      const response = await fetch(`${API_BASE_URL}/Product/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ProductFilters: filters,
          Pagination: pagination
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
      const response = await fetch(`${API_BASE_URL}/Product/bybrand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData
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
    name: 'Пример товара 1',
    brand: 'Брбр Патапим0',
    category: 'Пельмени0',
    image: '/no_photo.png',
    desc: 'Пример описания 1',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 5,
    sVolume: 200,
    country: "Соединенные Штаты Америки",
    manufactureYear: 2010,
    expirationDate: "36 месяцев с момента апробирования"
  },
  {
    id: 2,
    name: 'Пример товара 2',
    brand: 'Брбр Патапим1',
    category: 'Пельмени1',
    image: '',
    desc: 'Пример описания 2',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 100,
    sVolume: 500,
    country: "Россия",
    manufactureYear: 2010,
    expirationDate: "36 месяцев с момента апробирования"
  },
  {
    id: 3,
    name: 'Пример товара 3',
    brand: 'Брбр Патапим2',
    category: 'Пельмени2',
    image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
    desc: 'Пример описания 3',
    fPrice: 1999,
    sPrice: 20999,
    gender: 'male',
    fVolume: 200,
    sVolume: 700,
    country: "Россия",
    manufactureYear: 2010,
    expirationDate: "36 месяцев с момента апробирования"
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