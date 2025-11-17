import { CURRENT_MODE, API_MODE, API_BASE_URL } from '../config';

const realCategoriesService = {
  getCategoryById: async (requestData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/Category/byid`, {
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
        console.error('Category fetch error:', error);
        throw new Error('Ошибка соединения с сервером');
      }
    },
  
    getCategories: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Category/all`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Ошибка при запросе товары дня');
        }
  
        const data = await response.json();
  
        return data;
      } catch (error) {
        console.error('Category fetch error:', error);
        throw new Error('Ошибка соединения с сервером');
      }
    }
}

const mockCategories = [
  {
    id: 1,
    name: 'Пельмени0'
  },
  {
    id: 2,
    name: 'Пельмени1'
  },
  {
    id: 3,
    name: 'Пельмени2'
  },
  {
    id: 4,
    name: 'Пельмени3'
  },
  {
    id: 5,
    name: 'Пельмени4'
  },
  {
    id: 6,
    name: 'Пельмени5'
  },
  {
    id: 7,
    name: 'Пельмени6'
  },
  {
    id: 8,
    name: 'Пельмени7'
  },
  {
    id: 9,
    name: 'Пельмени8'
  },
  {
    id: 10,
    name: 'Пельмени9'
  }
];

const mockCategoriesService = {
  getCategories: async () => {
    return mockCategories;
  },

  getCategoryById: async (id) => {    
    const brand = mockCategories.find(c => c.id === parseInt(id));
    if (!brand) {
      throw new Error('Категория не найдена');
    }
    
    return brand;
  }
};

export const categoriesService = CURRENT_MODE === API_MODE.MOCK 
  ? mockCategoriesService 
  : realCategoriesService;