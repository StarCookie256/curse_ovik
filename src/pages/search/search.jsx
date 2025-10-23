import './search.css';
import FilterBar from '../../components/filterBar/filterBar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';

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

function SearchPage(){
  const location = useLocation();
  const searchArgs = location.state;
  const [products, setProducts] = useState([]);

  const updateProducts = (newSearchArgs) => {
    fetchProducts(newSearchArgs, setProducts);
  };

  useEffect(() => {
    fetchProducts(searchArgs, setProducts);
  }, [searchArgs]);

  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Найдено товаров: {products.length}</div>

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
          <FilterBar onSearch={updateProducts} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;