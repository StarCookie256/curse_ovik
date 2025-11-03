import './BasketPage.css';
import { basketService } from '../../api/services/basketService';
import { useEffect, useState } from 'react';
import BasketProduct from '../../components/basketProduct/BasketProduct';
import PerfumeryScrollSearcher from '../../components/perfumeryScrollSearcher/perfumeryScrollSearcher';
import { useAuth } from '../../components/context/AuthContext';

async function fetchData(setTotalPrice, setProducts){
  let localBasket = await basketService.getBasket();

  setTotalPrice(localBasket.totalPrice);
  setProducts(localBasket.products);
};

function BasketPage(){
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    try {
      setLoading(true);
      fetchData(setTotalPrice, setProducts);
    } catch (error) {
      console.error('Error loading basket data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if(loading){
    return(
      <div className='loading-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <div className='basket-page-container'>
      
      <div className='basket-page-back-container'>
        <a className='basket-page-back' href="/main">Главная</a>
        <span> / Корзина</span>
      </div>

      <div className='basket-card'>
        <PerfumeryScrollSearcher 
          elements={
            products.map((product) => (
              <BasketProduct
                id={product.id}
                productName={product.productName}
                categoryName={product.categoryName}
                price={product.price}
                volume={product.volume}
                quantity={product.quantity}
                image={product.image}
              />
            ))
          }
        />
      </div>

      <div className='basket-page-buy-container'>
        <div className='basket-page-buy-info'>
          <div className='basket-page-total'>Общая цена товаров: <span>{totalPrice} руб.</span></div>
          <div className='basket-page-info'>
            Посылка прибудет на адрес - {user.address}. <br /> 
            <span>Адрес всегда можно изменить в <a href='/cabinet'>Личном кабинете!</a></span>
          </div>
        </div>

        <div className='basket-page-buy-button-container'>
          <button className='basket-page-buy-button'>Приобрести</button>
        </div>
      </div>

    </div>
  );
}

export default BasketPage;