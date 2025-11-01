import './BasketPage.css';
import { basketService } from '../../api/services/basketService';
import { useEffect, useState } from 'react';

async function fetchData(setTotalPrice, setProducts){
  let localBasket = await basketService.getBasket();

  setTotalPrice(localBasket.totalPrice);
  setProducts(localBasket.products);
};

function BasketPage(){
  const [totalPrice, setTotalPrice] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchData(setTotalPrice, setProducts);
  }, []);

  return(
    <div className='basket-page-container'>
      <div className='basket-card'>
        <PerfumeryScrollSearcher 
          elements={
            products.map((product) => (
              <ProductVariationLine
                id={product.id}
                productId={product.productId}
                category={product.category}
                price={product.price}
                volume={product.volume}
                stock={product.stock}
              />
            ))
          }
        />
      </div>
    </div>
  );
}