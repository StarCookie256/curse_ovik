
const mockBrands = [
  {
    id: 1,
    name: 'Брбр Патапим0',
    refName: 'Брбр-Патапим0'
  },
  {
    id: 2,
    name: 'Брбр Патапим1',
    refName: 'Брбр-Патапим1'
  },
  {
    id: 3,
    name: 'Брбр Патапим2',
    refName: 'Брбр-Патапим2'
  },
  {
    id: 4,
    name: 'Брбр Патапим3',
    refName: 'Брбр-Патапим3'
  },
  {
    id: 5,
    name: 'Брбр Патапим4',
    refName: 'Брбр-Патапим4'
  },
  {
    id: 6,
    name: 'Брбр Патапим5',
    refName: 'Брбр-Патапим5'
  },
  {
    id: 7,
    name: 'Брбр Патапим6',
    refName: 'Брбр-Патапим6'
  },
  {
    id: 8,
    name: 'Брбр Патапим7',
    refName: 'Брбр-Патапим7'
  },
  {
    id: 9,
    name: 'Брбр Патапим8',
    refName: 'Брбр-Патапим8'
  },
  {
    id: 10,
    name: 'Брбр Патапим9',
    refName: 'Брбр-Патапим9'
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

  updatebrand: async (id, brandData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const brandIndex = mockBrands.findIndex(p => p.id === parseInt(id));
    if (brandIndex === -1) {
      throw new Error('Бренд не найден');
    }
    
    const updatedbrand = {
      ...mockBrands[brandIndex],
      ...brandData
    };
    
    console.log('Обновлен бренд:', updatedbrand);
    
    return updatedbrand;
  }
};

export const brandsService = mockBrandsService;