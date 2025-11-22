import { CURRENT_MODE, API_MODE, API_BASE_URL, AUTH_TOKEN_KEY } from '../config';
  
const realBasketService = {
  getBasketItemsCount: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
        
    if (!token) {
      return null;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/Basket/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе на количество товаров в корзине пользователя!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Basket fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  getBasketByUserId: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
        
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Basket/bycustomer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе на корзину пользователя!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Basket fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  addBasketProduct: async (basketRequest, customerId) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
        
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Basket/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          BasketRequest: basketRequest
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе на добавление предмета в корзину пользователя!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Basket fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  deleteBasketProduct: async (basketRequest) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
        
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Basket/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          BasketRequest: basketRequest
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при запросе на удаление предмета из корзины пользователя!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Basket fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  }
}

const mockBasketProducts = {
  products: [
    {
      id: 1,
      productName: 'Газики фембоев',
      categoryName: 'Парфюмерная вода',
      image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
      quantity: 42,
      price: 42,
      volume: 10
    },
    {
      id: 2,
      productName: 'Газики фембоев',
      categoryName: 'Парфюмерная вода',
      image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
      quantity: 42,
      price: 42,
      volume: 10
    },
    {
      id: 3,
      productName: 'Газики фембоев',
      categoryName: 'Парфюмерная вода',
      image: 'https://shikimori.one/uploads/poster/characters/79995/main_alt-f083b9fc0baf74cb7d475ef9c368ae7b.jpeg',
      quantity: 42,
      price: 42,
      volume: 10
    }
  ],
  totalPrice: 126
};

const mockBasketService = {
  getBasket: async () => {
    return mockBasketProducts;
  },

  getBasketItemsCount: async () => {
    const productsCount = mockBasketProducts.products.length;

    return productsCount;
  },

  updateBasket: async (id) => {    
    console.log('Вау молодец!',id);
  }
};

export const basketService = CURRENT_MODE === API_MODE.MOCK 
  ? mockBasketService 
  : realBasketService;