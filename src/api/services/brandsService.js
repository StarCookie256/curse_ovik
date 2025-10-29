
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
  }
};

export const brandsService = mockBrandsService;