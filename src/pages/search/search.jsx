import './search.css';
import FilterBar from '../../components/filterBar/filterBar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';

function SearchPage(){
  const location = useLocation();
  const searchArgs = location.state;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchArgs?.brands?.length > 0) {
        // Используем Promise.all для ожидания всех запросов
        const productPromises = searchArgs.brands.map(brand => 
          productService.getProductsByBrand(brand)
        );
        
        const productsArrays = await Promise.all(productPromises);
        
        // Объединяем все массивы в один
        const localProductList = productsArrays.flat();

        setProducts(localProductList);
      }
    };

    fetchProducts();
  }, [searchArgs]);

  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Найдено товаров: 0</div>

      <div className='main-page-components-container'>
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
        <div className='main-page-filter-bar'>
          <FilterBar />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;