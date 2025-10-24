import './search.css';
import FilterBar from '../../components/filterBar/filterBar';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';
import SearchPaginator from '../../components/searchPaginator/searchPaginator';

async function fetchProducts(searchArgs, setProducts) {
  let localProductList = [];

  ////////////// ВЫЗОВ ПРОДУКТОВ ПО БРЕНДАМ
  if (searchArgs?.brands?.length > 0) {
    const productPromises = searchArgs.brands.map(brand => 
      productService.getProductsByBrand(brand)
    );
    
    const productsArrays = await Promise.all(productPromises);
    localProductList = productsArrays.flat();
  } 
  else {
    localProductList = await productService.getProducts();
  }
  ////////////

  ////////////// СОРТИРОВКА ПО ПОЛУ
  if (searchArgs?.gender?.length === 1) {
    const targetGender = searchArgs.gender[0];
    localProductList = localProductList.filter(p => p.gender === targetGender);
  }
  //////////////

  ////////////// СОРТИРОВКА ПО КАТЕГОРИЯМ
  if(searchArgs?.categories?.length > 0){
    let sortedList = searchArgs.categories.map(category => {
      return localProductList.filter(p => p.category === category)
    })
    localProductList = sortedList.flat();
  }
  //////////////

  ////////////// СОРТИРОВКА ПО ЦЕНАМ
  localProductList = localProductList.filter(p => p.fPrice <= searchArgs.priceValues[1] && p.sPrice >= searchArgs.priceValues[0]);
  //////////////

  ////////////// СОРТИРОВКА ПО ОБЪЁМУ
  localProductList = localProductList.filter(p => p.fVolume <= searchArgs.volumeValues[1] && p.sVolume >= searchArgs.volumeValues[0]);
  //////////////
  console.log(localProductList.length);
  setProducts(localProductList);
}

const PRODUCTS_PER_PAGE = 18;
const getTotalPageCount = (productsCount) => Math.ceil(productsCount / PRODUCTS_PER_PAGE);

function SearchPage(){
  ////////////// РАБОТА С ПЕРЕДАЧЕЙ ДАННЫХ НА СТРАНИЦУ
  const location = useLocation();
  const searchArgs = location.state;
  const [products, setProducts] = useState([]);

  const updateProducts = (newSearchArgs) => {
    fetchProducts(newSearchArgs, setProducts);
  };

  useEffect(() => {
    fetchProducts(searchArgs, setProducts);
  }, [searchArgs]);
  //////////////

  ////////////// РАБОТА С ПАГИНАЦИЕЙ
  const [page, setPage] = useState(1);

  // переход на след страницу
  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = products ? getTotalPageCount(products.length) : current;

    setPage(next <= total ? next : current);
  }, [page, products]);

  // переход на прошлую страницу
  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);
  //////////////

  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Найдено товаров: {products.length}</div>

      <div className='main-page-components-container'>
        {products.length > 0 
        ? (
          <div className='main-page-products'>
            {products.map((product) => (
              <ProductCard
                key = {product.id}
                id = {product.id}
                name = {product.name}
                desc = {product.desc}
                category = {product.category}
                brand = {product.brand}
                image = {product.image}
                fPrice = {product.fPrice}
                sPrice = {product.sPrice}
              />
            ))}
          </div>
          )
        : ("Попробуйте изменить фильтры поиска, чтобы найти больше товаров!")
        }
        <div className='main-page-filter-bar'>
          <FilterBar onSearch={updateProducts} />
        </div>
      </div>
      <div className='search-page-paginator-container'>
        {products && (
          <SearchPaginator
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: page === 1,
              right: page === getTotalPageCount(products.length),
            }}
            nav={{ current: page, total: getTotalPageCount(products.length) }}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;