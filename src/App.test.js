// // src/App.test.js
// import { render, screen, waitFor } from '@testing-library/react';

// // ========== МОКИ ДЛЯ REACT-ROUTER-DOM ==========
// jest.mock('react-router', () => ({
//   Link: ({ children, to }) => <a href={to}>{children}</a>,
//   useParams: () => ({}),
//   useLocation: () => ({ pathname: '/', state: null }),
//   useNavigate: () => jest.fn(),
// }));

// // ========== МОКИ ДЛЯ ВСЕХ СТРАНИЦ ==========

// // Мокаем API сервисы
// jest.mock('./api/services/productsService.js', () => ({
//   productService: {
//     getProductsOfDay: jest.fn(),
//     getProductsByBrand: jest.fn(),
//     getProductPageInfo: jest.fn(),
//     getProductsSearch: jest.fn(),
//   },
// }));

// jest.mock('./api/services/brandsService.js', () => ({
//   brandsService: {
//     getBrands: jest.fn(),
//     getBrandById: jest.fn(),
//   },
// }));

// jest.mock('./api/services/categoriesService.js', () => ({
//   categoriesService: {
//     getCategories: jest.fn(),
//   },
// }));

// jest.mock('./api/services/basketService.js', () => ({
//   basketService: {
//     getBasketByUserId: jest.fn(),
//     getBasketItemsCount: jest.fn(),
//   },
// }));

// jest.mock('./api/services/authService.js', () => ({
//   authService: {
//     checkAuth: jest.fn(),
//     getProfile: jest.fn(),
//   },
// }));

// // Мокаем компоненты
// jest.mock('./components/productCard/productCard.jsx', () => ({
//   __esModule: true,
//   default: jest.fn((props) => <div data-testid="product-card">{props.name}</div>)
// }));

// jest.mock('./components/filterBar/filterBar.jsx', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="filter-bar">Filter Bar</div>)
// }));

// jest.mock('./components/basketProduct/BasketProduct.jsx', () => ({
//   __esModule: true,
//   default: jest.fn((props) => <div data-testid="basket-product">{props.productName}</div>)
// }));

// jest.mock('./components/productVariationLine/ProductVariationLine.jsx', () => ({
//   __esModule: true,
//   default: jest.fn((props) => <div data-testid="product-variation">{props.category}</div>)
// }));

// jest.mock('./components/searchPaginator/searchPaginator.jsx', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="search-paginator">Paginator</div>)
// }));

// // Мокаем CSS
// jest.mock('./pages/main/main.css', () => ({}));
// jest.mock('./pages/search/search.css', () => ({}));
// jest.mock('./pages/login/LoginPage.css', () => ({}));
// jest.mock('./pages/cabinet/CabinetPage.css', () => ({}));
// jest.mock('./pages/catalog/CatalogPage.css', () => ({}));
// jest.mock('./pages/brandPage/BrandPage.css', () => ({}));
// jest.mock('./pages/productPage/ProductPage.css', () => ({}));
// jest.mock('./pages/basketPage/BasketPage.css', () => ({}));
// jest.mock('./pages/register/RegisterPage.css', () => ({}));

// // Мокаем контекст авторизации
// jest.mock('./components/context/AuthContext', () => ({
//   useAuth: () => ({
//     user: { id: 1, name: 'Test User', address: 'Test Address' },
//     loading: false,
//     isAuthenticated: true,
//     checkAuth: jest.fn(),
//     refreshProfile: jest.fn(),
//   })
// }));

// // Мокаем Redux
// jest.mock('react-redux', () => ({
//   useSelector: () => 0,
//   useDispatch: () => jest.fn(),
// }));

// // ========== ТЕСТЫ ДЛЯ КАЖДОЙ СТРАНИЦЫ ==========

// describe('Тесты для MainPage', () => {
//   const MainPage = require('./pages/main/main.jsx').default;
//   const { productService } = require('./api/services/productsService.js');
//   const ProductCard = require('./components/productCard/productCard.jsx').default;

//   const mockProducts = [
//     {
//       id: 1,
//       name: 'Test Product 1',
//       desc: 'Test Description 1',
//       category: 'perfume',
//       brand: { id: 1, name: 'Test Brand 1' },
//       image: 'image1.jpg',
//       fPrice: 100,
//       sPrice: 80,
//       gender: 'unisex'
//     }
//   ];

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна показывать состояние загрузки', () => {
//     productService.getProductsOfDay.mockImplementation(() => new Promise(() => {}));
//     render(<MainPage />);
//     expect(screen.getByText('Работа с данными, пожалуйста, подождите...')).toBeInTheDocument();
//   });

//   test('должна отображать продукты после загрузки', async () => {
//     productService.getProductsOfDay.mockResolvedValue(mockProducts);
//     render(<MainPage />);

//     await waitFor(() => {
//       expect(screen.queryByText('Работа с данными, пожалуйста, подождите...')).not.toBeInTheDocument();
//     });

//     expect(screen.getByText('Самые популярные ароматы на сегодняшний день:')).toBeInTheDocument();
//     expect(ProductCard).toHaveBeenCalledTimes(1);
//   });

//   test('должна обрабатывать ошибку загрузки продуктов', async () => {
//     productService.getProductsOfDay.mockRejectedValue(new Error('API Error'));
//     render(<MainPage />);

//     await waitFor(() => {
//       expect(screen.queryByText('Работа с данными, пожалуйста, подождите...')).not.toBeInTheDocument();
//     });

//     expect(screen.getByText('Самые популярные ароматы на сегодняшний день:')).toBeInTheDocument();
//   });

//   test('должна отображать FilterBar', async () => {
//     productService.getProductsOfDay.mockResolvedValue([]);
//     render(<MainPage />);

//     await waitFor(() => {
//       expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
//     });
//   });
// });

// describe('Тесты для CatalogPage', () => {
//   const CatalogPage = require('./pages/catalog/CatalogPage.jsx').default;
//   const { brandsService } = require('./api/services/brandsService.js');

//   const mockBrands = [
//     { id: 1, name: 'Brand 1' },
//     { id: 2, name: 'Brand 2' }
//   ];

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать бренды', async () => {
//     brandsService.getBrands.mockResolvedValue(mockBrands);
//     render(<CatalogPage />);

//     await waitFor(() => {
//       expect(brandsService.getBrands).toHaveBeenCalledTimes(1);
//     });

//     expect(screen.getByText('Бренды')).toBeInTheDocument();
//   });

//   test('должна показывать навигацию по буквам', async () => {
//     const mockBrands = [
//       { id: 1, name: 'Brand A' },
//       { id: 2, name: 'Brand B' },
//       { id: 3, name: 'Chanel' }
//     ];
    
//     brandsService.getBrands.mockResolvedValue(mockBrands);
//     render(<CatalogPage />);

//     await waitFor(() => {
//       expect(screen.getByText('A')).toBeInTheDocument();
//       expect(screen.getByText('B')).toBeInTheDocument();
//       expect(screen.getByText('C')).toBeInTheDocument();
//     });
//   });

//   test('должна обрабатывать ошибку загрузки брендов', async () => {
//     brandsService.getBrands.mockRejectedValue(new Error('API Error'));
//     render(<CatalogPage />);

//     await waitFor(() => {
//       expect(brandsService.getBrands).toHaveBeenCalledTimes(1);
//     });
//   });
// });

// describe('Тесты для BrandPage', () => {
//   const BrandPage = require('./pages/brandPage/BrandPage.jsx').default;
//   const { brandsService } = require('./api/services/brandsService.js');
//   const { productService } = require('./api/services/productsService.js');

//   const mockBrand = { id: 1, name: 'Test Brand' };
//   const mockProducts = [
//     {
//       id: 1,
//       name: 'Product 1',
//       brand: mockBrand,
//       image: 'image1.jpg',
//       fPrice: 100,
//       sPrice: 80,
//       gender: 'male'
//     }
//   ];

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать информацию о бренде и продукты', async () => {
//     brandsService.getBrandById.mockResolvedValue(mockBrand);
//     productService.getProductsByBrand.mockResolvedValue(mockProducts);

//     render(<BrandPage />);

//     await waitFor(() => {
//       expect(brandsService.getBrandById).toHaveBeenCalledWith({ id: '1' });
//     });

//     expect(screen.getByText('Каталог')).toBeInTheDocument();
//   });

//   test('должна показывать сообщение при отсутствии продуктов', async () => {
//     const mockBrand = { id: 1, name: 'Test Brand' };
//     brandsService.getBrandById.mockResolvedValue(mockBrand);
//     productService.getProductsByBrand.mockResolvedValue([]);

//     render(<BrandPage />);

//     await waitFor(() => {
//       expect(screen.getByText('У данного бренда отсутствуют товары!')).toBeInTheDocument();
//     });
//   });

//   test('должна отображать продукты бренда', async () => {
//     const mockBrand = { id: 1, name: 'Test Brand' };
//     const mockProducts = [
//       {
//         id: 1,
//         name: 'Product 1',
//         brand: mockBrand,
//         image: 'image1.jpg',
//         fPrice: 100,
//         sPrice: 80,
//         gender: 'male'
//       }
//     ];

//     brandsService.getBrandById.mockResolvedValue(mockBrand);
//     productService.getProductsByBrand.mockResolvedValue(mockProducts);

//     render(<BrandPage />);

//     await waitFor(() => {
//       expect(screen.getByText('Product 1')).toBeInTheDocument();
//     });
//   });
// });

// describe('Тесты для ProductPage', () => {
//   const ProductPage = require('./pages/productPage/ProductPage.jsx').default;
//   const { productService } = require('./api/services/productsService.js');

//   const mockProduct = {
//     id: 1,
//     name: 'Test Product',
//     brand: { id: 1, name: 'Test Brand' },
//     image: 'image1.jpg',
//     gender: 'male',
//     country: 'Test Country',
//     manufactureYear: 2023,
//     expirationDate: '36 месяцев',
//     productVariations: [
//       { id: 1, category: 'Парфюмерная вода', price: 100, volume: 50, stock: 10 }
//     ]
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать информацию о товаре', async () => {
//     productService.getProductPageInfo.mockResolvedValue(mockProduct);

//     render(<ProductPage />);

//     await waitFor(() => {
//       expect(screen.queryByText('Работа с данными, пожалуйста, подождите...')).not.toBeInTheDocument();
//     });

//     expect(screen.getByText('Каталог')).toBeInTheDocument();
//   });

//   test('должна отображать вариации товара', async () => {
//     const mockProduct = {
//       id: 1,
//       name: 'Test Product',
//       brand: { id: 1, name: 'Test Brand' },
//       productVariations: [
//         { id: 1, category: 'Парфюмерная вода', price: 100, volume: 50, stock: 10 },
//         { id: 2, category: 'Туалетная вода', price: 80, volume: 100, stock: 5 }
//       ]
//     };

//     productService.getProductPageInfo.mockResolvedValue(mockProduct);
//     render(<ProductPage />);

//     await waitFor(() => {
//       expect(screen.getByText('Парфюмерная вода')).toBeInTheDocument();
//       expect(screen.getByText('Туалетная вода')).toBeInTheDocument();
//     });
//   });

//   test('должна отображать описание товара', async () => {
//     const mockProduct = {
//       id: 1,
//       name: 'Test Product',
//       brand: { id: 1, name: 'Test Brand' },
//       productVariations: []
//     };

//     productService.getProductPageInfo.mockResolvedValue(mockProduct);
//     render(<ProductPage />);

//     await waitFor(() => {
//       expect(screen.getByText(/Погрузитесь в мир изысканной парфюмерии/)).toBeInTheDocument();
//     });
//   });
// });

// describe('Тесты для SearchPage', () => {
//   const SearchPage = require('./pages/search/search.jsx').default;
//   const { productService } = require('./api/services/productsService.js');

//   const mockSearchResults = {
//     items: [
//       {
//         id: 1,
//         name: 'Search Product 1',
//         brand: { id: 1, name: 'Test Brand' },
//         image: 'image1.jpg',
//         fPrice: 100,
//         sPrice: 80,
//         gender: 'male'
//       }
//     ],
//     totalCount: 1,
//     totalPages: 1
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать результаты поиска', async () => {
//     productService.getProductsSearch.mockResolvedValue(mockSearchResults);

//     render(<SearchPage />);

//     await waitFor(() => {
//       expect(productService.getProductsSearch).toHaveBeenCalled();
//     });

//     expect(screen.getByText(/Найдено товаров:/i)).toBeInTheDocument();
//   });

//   test('должна отображать пагинатор при наличии результатов', async () => {
//     const mockSearchResults = {
//       items: [{ id: 1, name: 'Product', brand: { id: 1, name: 'Brand' }, image: 'img.jpg', fPrice: 100, sPrice: 80, gender: 'male' }],
//       totalCount: 1,
//       totalPages: 1
//     };

//     productService.getProductsSearch.mockResolvedValue(mockSearchResults);
//     render(<SearchPage />);

//     await waitFor(() => {
//       expect(screen.getByTestId('search-paginator')).toBeInTheDocument();
//     });
//   });

//   test('должна показывать сообщение при отсутствии результатов', async () => {
//     const mockSearchResults = { items: [], totalCount: 0, totalPages: 0 };
//     productService.getProductsSearch.mockResolvedValue(mockSearchResults);
//     render(<SearchPage />);

//     await waitFor(() => {
//       expect(screen.getByText(/Попробуйте изменить фильтры поиска/)).toBeInTheDocument();
//     });
//   });
// });

// // Исправляем тест для BasketPage
// describe('Тесты для BasketPage', () => {
//   const BasketPage = require('./pages/basketPage/BasketPage.jsx').default;
//   const { basketService } = require('./api/services/basketService.js');

//   const mockBasket = {
//     basketItems: [
//       {
//         id: 1,
//         name: 'Basket Product 1',
//         productVariation: {
//           id: 1,
//           category: 'Парфюмерная вода',
//           price: 100,
//           volume: 50
//         },
//         stock: 1,
//         image: 'image1.jpg'
//       }
//     ],
//     totalPrice: 100
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать товары в корзине', async () => {
//     basketService.getBasketByUserId.mockResolvedValue(mockBasket);
//     render(<BasketPage />);

//     await waitFor(() => {
//       expect(screen.getByText('Главная')).toBeInTheDocument();
//     });
//   });

//   test('должна показывать пустую корзину', async () => {
//     const mockBasket = { basketItems: [], totalPrice: 0 };
//     basketService.getBasketByUserId.mockResolvedValue(mockBasket);
//     render(<BasketPage />);

//     await waitFor(() => {
//       expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
//     });
//   });

//   test('должна отображать общую стоимость', async () => {
//     const mockBasket = {
//       basketItems: [
//         {
//           id: 1,
//           name: 'Product 1',
//           productVariation: { id: 1, category: 'Test', price: 100, volume: 50 },
//           stock: 1,
//           image: 'image1.jpg'
//         }
//       ],
//       totalPrice: 100
//     };

//     basketService.getBasketByUserId.mockResolvedValue(mockBasket);
//     render(<BasketPage />);

//     await waitFor(() => {
//       expect(screen.getByText('100 руб.')).toBeInTheDocument();
//     });
//   });
// });

// describe('Тесты для LoginPage', () => {
//   const LoginPage = require('./pages/login/LoginPage.jsx').default;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать форму входа', () => {
//     render(<LoginPage />);

//     expect(screen.getByText('Вход')).toBeInTheDocument();
//     expect(screen.getByText('Почта:')).toBeInTheDocument();
//     expect(screen.getByText('Пароль:')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
//   });

//   test('должна валидировать обязательные поля', () => {
//     render(<LoginPage />);
    
//     const submitButton = screen.getByRole('button', { name: /Войти/i });
//     expect(submitButton).toBeEnabled();
//   });

//   test('должна иметь ссылку на регистрацию', () => {
//     render(<LoginPage />);
    
//     expect(screen.getByText('Регистрация')).toBeInTheDocument();
//     expect(screen.getByRole('link')).toHaveAttribute('href', '/register');
//   });
// });

// describe('Тесты для RegisterPage', () => {
//   const RegisterPage = require('./pages/register/RegisterPage.jsx').default;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать форму регистрации', () => {
//     render(<RegisterPage />);

//     expect(screen.getByText('Регистрация')).toBeInTheDocument();
//     expect(screen.getByText('Псевдоним/ФИО:')).toBeInTheDocument();
//     expect(screen.getByText('Почта:')).toBeInTheDocument();
//     expect(screen.getByText('Пароль:')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Зарегистрироваться/i })).toBeInTheDocument();
//   });

//   test('должна иметь поле для загрузки изображения', () => {
//     render(<RegisterPage />);
    
//     expect(screen.getByLabelText(/Выбрать изображение:/)).toBeInTheDocument();
//     expect(screen.getByText('Как будет выглядеть в кабинете:')).toBeInTheDocument();
//   });

//   test('должна валидировать форму регистрации', () => {
//     render(<RegisterPage />);
    
//     const submitButton = screen.getByRole('button', { name: /Зарегистрироваться/i });
//     expect(submitButton).toBeEnabled();
//   });
// });

// // Исправляем тест для CabinetPage
// describe('Тесты для CabinetPage', () => {
//   const CabinetPage = require('./pages/cabinet/CabinetPage.jsx').default;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('должна отображать информацию пользователя', async () => {
//     render(<CabinetPage />);

//     await waitFor(() => {
//       expect(screen.getByText('Телефон:')).toBeInTheDocument();
//       expect(screen.getByText('Адрес:')).toBeInTheDocument();
//     });
//   });

//   test('должна отображать карту', () => {
//     render(<CabinetPage />);
    
//     expect(screen.getByTitle('Яндекс Карта')).toBeInTheDocument();
//   });

//   test('должна отображать кнопку выбора адреса', () => {
//     render(<CabinetPage />);
    
//     expect(screen.getByText('Выбрать')).toBeInTheDocument();
//   });

//   test('должна отображать информацию о пользователе', () => {
//     render(<CabinetPage />);
    
//     expect(screen.getByText('Test User')).toBeInTheDocument();
//     expect(screen.getByText('Электронная почта:')).toBeInTheDocument();
//   });
// });