import './ProductVariationLine.css';

function ProductVariationLine({
  id,
  productId,
  category,
  price,
  volume,
  stock
}){
  return(
    <div className='product-variation-container'>
      <div className='product-variation'>
        <div className='product-variation-category'>{category}</div>
        <div className='product-variation-volume'>{volume} мл.</div>
        <div className='product-variation-stock'>{stock} шт.</div>
        <div className='product-variation-price'>{price} руб.</div>

        <button className='product-variation-add'>В корзину</button>
      </div>
    </div>
  );
}

export default ProductVariationLine;