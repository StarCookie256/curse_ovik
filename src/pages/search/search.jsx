import './search.css';
import FilterBar from '../../components/filterBar/filterBar';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';
import SearchPaginator from '../../components/searchPaginator/searchPaginator';

async function fetchProducts(searchArgs, page, setProducts, setPageMax, setTotalCount) {
  if(searchArgs == null || page == null) return;


  const ProductFilters = {
    'Brands': searchArgs.brands,
    'Categories': searchArgs.categories,
    'Gender': searchArgs.gender,
    'PriceValues': searchArgs.priceValues,
    'VolumeValues': searchArgs.volumeValues
  };
  const Pagination = {
    'Page': page,
    'PageSize': PRODUCTS_PER_PAGE
  };
  
  const response = await productService.getProductsSearch(ProductFilters,Pagination);
  console.log(response);
  setTotalCount(response.TotalCount);
  setPageMax(response.TotalPages);
  setProducts(response.Items);
}

const PRODUCTS_PER_PAGE = 18;

function SearchPage(){
  const location = useLocation();
  const searchArgs = location.state;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const updateProducts = (newSearchArgs) => {
    fetchProducts(newSearchArgs, page, setProducts, setPageMax, setTotalCount);
  };

  useEffect(() => { 
    const loadProducts = async () => {
      setLoading(true);
      try {
        await fetchProducts(searchArgs, page, setProducts, setPageMax, setTotalCount);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchArgs && page) {
      loadProducts();
    }
  }, [searchArgs, page]);

  // переход на след страницу
  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    
    setPage(next <= pageMax ? next : current);
  }, [page, pageMax]);

  // переход на прошлую страницу
  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;
    
    setPage(prev > 0 ? prev : current);
  }, [page]);

  if(loading){
    return(
      <div className='loading-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Найдено товаров: {totalCount ?? 0}</div>

      <div className='main-page-components-container'>
        {products && products.length > 0 
        ? (
          <div className='main-page-products'>
            {products.map((product) => (
              <ProductCard
                key = {product.Id}
                id = {product.Id}
                name = {product.Name}
                categories = {product.Categories}
                brand = {product.Brand}
                image = {product.Image}
                fPrice = {product.FPrice}
                sPrice = {product.SPrice}
                gender = {product.Gender}
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