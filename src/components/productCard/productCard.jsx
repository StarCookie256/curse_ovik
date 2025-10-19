import './productCard.css';

function ProductCard({
  id,
  image,
  name,
  desc,
  brand,
  category,
  fPrice,
  sPrice,
  gender
}){
  return(
    <div className='product-card-container'>
      <div className='product-card-img-container'>
        <img className="product-card-img"
          src={image} 
          alt={name || "Изображение"} 
        />  
      </div>
      <div className='product-card-info-container'>
        <p className='product-card-brand'>{brand}</p>
        <h3 className='product-card-name'>{name}</h3>
        <p className='product-card-price'>{fPrice} ₽ - {sPrice} ₽</p>
      </div>
    </div>
  );
}

export default ProductCard;