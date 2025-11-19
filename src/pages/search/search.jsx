import './search.css';
import FilterBar from '../../components/filterBar/filterBar';
import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  setTotalCount(response.totalCount);
  setPageMax(response.totalPages);
  setProducts(response.items);
}

const PRODUCTS_PER_PAGE = 18;

function SearchPage(){
  const location = useLocation();
  const searchArgs = location.state;
  const buttonRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const updateProducts = async (newSearchArgs) => {
    setIsSearching(true);
    try {
      await fetchProducts(newSearchArgs, page, setProducts, setPageMax, setTotalCount);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
  }
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
    } else {
      setLoading(false);
      setProducts([]);
      setTotalCount(0);
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

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = isSearching;
    }
  }, [isSearching]);

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
          <FilterBar onSearch={updateProducts} ref={buttonRef} isSearching={isSearching} />
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