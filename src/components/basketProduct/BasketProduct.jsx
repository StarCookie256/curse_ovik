import './BasketProduct.css';

function BasketProduct({
  id,
  productName,
  categoryName,
  image,
  quantity,
  price,
  volume
}){
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
        <div className='basket-product-volume'>{volume}</div>
        <div className='basket-product-price'>{price}</div>

        <div className='basket-product-quantity-container'>
          <button className='basket-product-add'>+</button>
          <div className='basket-product-quantity'>{quantity}</div>
          <button className='basket-product-delete'>-</button>
        </div>
        
      </div>
    </div>
  );
}

export default BasketProduct;