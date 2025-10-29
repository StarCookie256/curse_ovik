
const mockProductVariations = [
  {
    id: 1,
    productId: 1,
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