import './ProductVariationLine.css';
import { useAuth } from '../../components/context/AuthContext';
import { basketService } from '../../api/services/basketService';
import { useState } from 'react';

function ProductVariationLine({
  id,
  productId,
  category,
  price,
  volume,
  stock
}){
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToBasket = async () => {
    setIsSubmitting(true);
    if(user){

      try {
        await basketService.addBasketProduct(id);
        alert('Товар успешно добавлен в корзину!')
      } catch (error) {
        console.error('Error loading basket data:', error);
      }
      finally{
        setIsSubmitting(false);
      }
    }
    else{
      setIsSubmitting(false);
      alert('Вы не авторизованы!')
    }
  }

  // const deleteFromBasket = async () => {
  //   if(user){
  //     const basketRequest = new FormData();

  //     basketRequest.append('BasketId', user.basketId);
  //     basketRequest.append('ProductVariationId', id);

  //     try {
  //       await basketService.deleteBasketProduct(basketRequest);
  //     } catch (error) {
  //       console.error('Error loading basket data:', error);
  //     }
  //   }
  //   else{
  //     alert('Вы не авторизованы!')
  //   }
  // }
  console.log(user.basketId, "   ", id)
  return(
    <div className='product-variation-container'>
      <div className='product-variation'>
        <div className='product-variation-category'>{category}</div>
        <div className='product-variation-volume'>{volume} мл.</div>
        <div className='product-variation-stock'>{stock} шт.</div>
        <div className='product-variation-price'>{price} руб.</div>

        <button onClick={addToBasket} disabled={isSubmitting} className='product-variation-add'>{isSubmitting ? "Добавление..." : "В корзину"}</button>
      </div>
    </div>
  );
};

export default ProductVariationLine;