import './BasketPage.css';
import { basketService } from '../../api/services/basketService';
import { useEffect, useState } from 'react';
import BasketProduct from '../../components/basketProduct/BasketProduct';
import PerfumeryScrollSearcher from '../../components/perfumeryScrollSearcher/perfumeryScrollSearcher';
import { useAuth } from '../../components/context/AuthContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataUpdate } from '../../services/dataUpdate';

async function fetchData(setTotalPrice, setProducts){
  const localBasket = await basketService.getBasketByUserId();

  console.log(localBasket);

  setTotalPrice(localBasket.totalPrice);
  setProducts(localBasket.basketItems);
};

function BasketPage(){
  const signal = useSelector(state => state.refresh.signal); // ререндер при добавлении товара в корзину
  const { user, isAuthenticated } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const localFetch = async () => {
      try {
        setLoading(true);
        await fetchData(setTotalPrice, setProducts);
      } catch (error) {
        console.error('Error loading basket data:', error);
      } finally {
        setLoading(false);
    }}

    localFetch();
  }, [signal]);

  const handleBuy = async () => {
    setIsSubmitting(true);
    if(user && isAuthenticated !== false){
      try {
        await basketService.clearBasket();
      } catch (error) {
        console.error('Error clearing basket data:', error);
      } finally{
        setIsSubmitting(false);
        dispatch(dataUpdate());
      }
    }
    else{
      setIsSubmitting(false);
    }
  }

  if(loading){
    return(
      <div className='loading-data'>Работа с данными, пожалуйста, подождите...</div>
    );
  }

  return(
    <div className='basket-page-container'>
      
      <div className='basket-page-back-container'>
        <Link 
          className='basket-page-back' 
          to="/main"
        >
          Главная
        </Link>
        <span> / Корзина</span>
      </div>

      <div className='basket-card'>
        {products && products.length !== 0
        ? (
          <PerfumeryScrollSearcher 
          elements={
            products.map((product) => (
              <BasketProduct
                id={product.productVariation.id}
                productId={product.id}
                productName={product.name}
                categoryName={product.productVariation.category}
                price={product.productVariation.price}
                volume={product.productVariation.volume}
                quantity={product.stock}
                image={product.image}
              />
            ))
          }
        />
        ) : (
          <div className='basket-nothing'>
            Корзина пуста
          </div>
        )
        }
      </div>

      <div className='basket-page-buy-container'>
        <div className='basket-page-buy-info'>
          <div className='basket-page-total'>Общая цена товаров: <span>{totalPrice ? totalPrice : 0} руб.</span></div>
          <div className='basket-page-info'>
            Посылка прибудет на адрес - {user.address}. <br /> 
            <span>{'Адрес всегда можно изменить в '}
              <Link
                to="/cabinet"
              >
                Личном кабинете!
              </Link></span>
          </div>
        </div>

        <div className='basket-page-buy-button-container'>
          <button onClick={handleBuy} disabled={totalPrice <= 0 || isSubmitting} className='basket-page-buy-button'>Приобрести</button>
        </div>
      </div>

    </div>
  );
}

export default BasketPage;