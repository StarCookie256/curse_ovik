import './main.css';
import { useState, useEffect } from 'react';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';

function MainPage(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts()
      .then(productsData => {
        setProducts(productsData);
      });
  }, []);

  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Самые популярные ароматы на сегодняшний день:</div>

      <div className='main-page-products-container'>
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
    </div>
  );
}

export default MainPage;