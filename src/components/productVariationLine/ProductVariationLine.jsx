import './ProductVariationLine.css';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { basketService } from '../../api/services/basketService';

function ProductVariationLine({
  id,
  productId,
  category,
  price,
  volume,
  stock
}){
  const navigate = useNavigate();
  const { user } = useAuth();

  const addToBasket = async () => {
    if(user){
      try {
        await basketService.updateBasket(id);
      } catch (error) {
        console.error('Error loading basket data:', error);
      }
    }
    else{
      navigate("/login");
    }
  }

  return(
    <div className='product-variation-container'>
      <div className='product-variation'>
        <div className='product-variation-category'>{category}</div>
        <div className='product-variation-volume'>{volume} мл.</div>
        <div className='product-variation-stock'>{stock} шт.</div>
        <div className='product-variation-price'>{price} руб.</div>

        <button onClick={addToBasket} className='product-variation-add'>В корзину</button>
      </div>
    </div>
  );
}

export default ProductVariationLine;