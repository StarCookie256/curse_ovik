
const mockProductVariations = [
  {
    id: 1,
    productId: 3,
    category: "Парфюмерная вода",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 2,
    productId: 2,
    category: "Туалетная вода",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 3,
    productId: 1,
    category: "Парфюм категория 1",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 4,
    productId: 1,
    category: "Парфюм категория 2",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 5,
    productId: 3,
    category: "Парфюмерная вода",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 6,
    productId: 3,
    category: "Парфюмерная вода",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 7,
    productId: 3,
    category: "Парфюмерная вода",
    price: 1999,
    volume: 50,
    stock: 294
  },
  {
    id: 8,
    productId: 3,
    category: "Парфюмерная вода",
    price: 1999,
    volume: 50,
    stock: 294
  }
];

const mockProductVariationsService = {
  getProductVariations: async () => {
    return mockProductVariations;
  },

  getProductVariationsByProductId: async (id) => {
    const productVariations = mockProductVariations.filter(x => x.productId === parseInt(id))

    return productVariations
  },

  getProductVariationById: async (id) => {    
    const productVariation = mockProductVariations.find(p => p.id === parseInt(id));
    if (!productVariation) {
      throw new Error('Товар не найден');
    }
    
    return productVariation;
  }
};

export const productVariationsService = mockProductVariationsService;