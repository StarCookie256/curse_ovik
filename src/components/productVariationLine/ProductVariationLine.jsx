import './ProductVariationLine.css';
import { useAuth } from '../../components/context/AuthContext';
import { basketService } from '../../api/services/basketService';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataUpdate } from '../../services/dataUpdate.js';

function ProductVariationLine({
  id,
  productId,
  category,
  price,
  volume,
  stock
}){
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [mobileMode, setMobileMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const addToBasket = async () => {
    setIsSubmitting(true);
    if(user && isAuthenticated !== false){

      try {
        await basketService.addBasketProduct(id);
        alert('Товар успешно добавлен в корзину!')
      } catch (error) {
        console.error('Error loading basket data:', error);
      }
      finally{
        setIsSubmitting(false);
        dispatch(dataUpdate());
      }
    }
    else{
      setIsSubmitting(false);
      alert('Вы не авторизованы!')
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1100 && !mobileMode) {
      setMobileMode(true);
    } else if (windowWidth >= 1100 && mobileMode) {
      setMobileMode(false);
    }
  }, [windowWidth, mobileMode]);

  return(
    <div className={`product-variation-container ${mobileMode}`}>
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