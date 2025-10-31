
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

export const categoriesService = mockCategoriesService;