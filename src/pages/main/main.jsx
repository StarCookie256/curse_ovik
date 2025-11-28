import './main.css';
import { useState, useEffect } from 'react';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';
import FilterBar from '../../components/filterBar/filterBar';


function MainPage(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = await productService.getProductsOfDay();
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading){
    return(
      <div className='loading-data'>Работа с данными, пожалуйста, подождите...</div>
    );
  }

  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Самые популярные ароматы на сегодняшний день:</div>

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
              gender = {product.gender}
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

export default MainPage;