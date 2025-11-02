  // ДЛЯ REAL BASKET SERVICE ПРИГОДИТСЯ
  // getBasketByUserId: async (userId) => {
  //   return mockBasketProducts;
  // },

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

  getBasketProductsCount: async () => {
    const productsCount = mockBasketProducts.products.length;

    return productsCount;
  },

  updateBasket: async (id) => {    
    console.log('Вау молодец!',id);
  }
};

export const basketService = mockBasketService;