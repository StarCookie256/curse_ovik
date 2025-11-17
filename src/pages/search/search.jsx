import './search.css';
import FilterBar from '../../components/filterBar/filterBar';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';
import SearchPaginator from '../../components/searchPaginator/searchPaginator';

async function fetchProducts(searchArgs, page, setProducts, setPageMax) {
  if(searchArgs == null || page == null) return;

  let localProductList = [];

  const requestData = new FormData();

  let pageObj = {
    'Page': page,
    'PageSize': PRODUCTS_PER_PAGE
  }

  console.log(localProductList.length);
  setProducts(localProductList);
}

const PRODUCTS_PER_PAGE = 18;
const getTotalPageCount = (productsCount) => Math.ceil(productsCount / PRODUCTS_PER_PAGE);

function SearchPage(){
  const location = useLocation();
  const searchArgs = location.state;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);

  const updateProducts = (newSearchArgs) => {
    fetchProducts(newSearchArgs, page, setProducts, setPageMax);
  };

  useEffect(() => { 
    fetchProducts(searchArgs, page, setProducts, setPageMax);
  }, [searchArgs]);

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
                gender = {product.gender}
              />
            ))}
          </div>
          )
        : (<div className='search-page-nothing'>Попробуйте изменить фильтры поиска, чтобы найти больше товаров!</div>)
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
              right: page === pageMax,
            }}
            nav={{ current: page, total: pageMax }}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;