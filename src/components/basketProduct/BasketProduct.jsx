import './BasketProduct.css';
import { useAuth } from '../../components/context/AuthContext';
import { useDispatch } from 'react-redux';
import { dataUpdate } from '../../services/dataUpdate.js'
import { basketService } from '../../api/services/basketService.js';
import { useState } from 'react';

function BasketProduct({
  id,
  productId,
  productName,
  categoryName,
  image,
  quantity,
  price,
  volume
}){
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const addToBasket = async () => {
    setIsSubmitting(true);
    if(user && isAuthenticated !== false){
      try {
        await basketService.addBasketProduct(id);
        setAlertMessage('Товар успешно добавлен в корзину!');
        setShowAlert(true);
      } catch (error) {
        console.error('Error loading basket data:', error);
      } finally{
        setIsSubmitting(false);
        dispatch(dataUpdate());
      }
    }
    else{
      setIsSubmitting(false);
      setAlertMessage('Вы не авторизованы!');
      setShowAlert(true);
    }
  }
  
  const deleteFromBasket = async () => {
    setIsSubmitting(true);
    if(user && isAuthenticated !== false){
      try {
        await basketService.deleteBasketProduct(id);
        setAlertMessage('Товар успешно удален из корзины!');
        setShowAlert(true);
      } catch (error) {
        console.error('Error loading basket data:', error);
      } finally{
        setIsSubmitting(false);
        dispatch(dataUpdate());
      }
    }
    else{
      setIsSubmitting(false);
      setAlertMessage('Вы не авторизованы!');
      setShowAlert(true);
    }
  }

  if(showAlert){
    alert(alertMessage);
    setShowAlert(false);
  }

  return(
    <div className='basket-product-container'>
      <div className='basket-product'>

        <div className='basket-product-image-container'>
          <img 
            className='basket-product-image'
            src={image} 
            alt={productName}
          />
        </div>

        <div className='basket-product-name'>{productName}</div>
        <div className='basket-product-category'>{categoryName}</div>
        <div className='basket-product-volume'>{volume} мл.</div>
        <div className='basket-product-price'>{price} руб.</div>

        <div className='basket-product-quantity-container'>
          <button onClick={addToBasket} disabled={isSubmitting} className='basket-product-quantity-button add'>+</button>
          <div className='basket-product-quantity'>{quantity} шт.</div>
          <button onClick={deleteFromBasket} disabled={isSubmitting} className='basket-product-quantity-button delete'>-</button>
        </div>
        
      </div>
    </div>
  );
}

export default BasketProduct;