import { CURRENT_MODE, API_MODE, API_BASE_URL } from '../config';

const realBrandsService = {
  getBrandByName: async (requestData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Brand/byname`, {
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
      console.error('Brand fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  getBrands: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Brand/all`, {
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
      console.error('Brands fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  },

  getBrandById: async (requestData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Brand/byid`, {
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
      console.error('Brand fetch error:', error);
      throw new Error('Ошибка соединения с сервером');
    }
  }
}

const mockBrands = [
  {
    id: 1,
    name: 'Брбр Патапим0'
  },
  {
    id: 2,
    name: 'Брбр Патапим1'
  },
  {
    id: 3,
    name: 'Брбр Патапим2'
  },
  {
    id: 4,
    name: 'Брбр Патапим3'
  },
  {
    id: 5,
    name: 'Брбр Патапим4'
  },
  {
    id: 6,
    name: 'Брбр Патапим5'
  },
  {
    id: 7,
    name: 'Брбр Патапим6'
  },
  {
    id: 8,
    name: 'Брбр Патапим7'
  },
  {
    id: 9,
    name: 'Брбр Патапим8'
  },
  {
    id: 10,
    name: 'Брбр Патапим9'
  },
  {
    id: 11,
    name: '42 братуха'
  },
  {
    id: 12,
    name: 'Мяуу'
  }
];

const mockBrandsService = {
  getBrands: async () => {
    return mockBrands;
  },

  getBrandById: async (id) => {    
    const brand = mockBrands.find(p => p.id === parseInt(id));
    if (!brand) {
      throw new Error('Бренд не найден');
    }
    
    return brand;
  },

  getBrandByName: async (name) => {    
    const brand = mockBrands.find(p => p.name === name);
    if (!brand) {
      throw new Error('Бренд не найден');
    }
    
    return brand;
  }
};

export const brandsService = CURRENT_MODE === API_MODE.MOCK 
  ? mockBrandsService 
  : realBrandsService;