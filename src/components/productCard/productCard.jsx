import { useNavigate } from 'react-router-dom';
import './productCard.css';
import { useEffect, useState } from 'react';

function ProductCard({
  id,
  image,
  name,
  desc,
  brand,
  categories,
  fPrice,
  sPrice,
  gender
}){
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("/no_photo.png");

  useEffect(() => {
    const checkImage = new Image();
    checkImage.onload = () => {
      setImgSrc(image); // Картинка существует
    };
    checkImage.onerror = () => {
      setImgSrc("/no_photo.png"); // Картинка не существует
    };
    checkImage.src = image;
  }, [image]);

  const productPageNav = () => {
    navigate(`/catalog/${brand.id}/${id}`);
  }

  return(
    <div className='product-card-container' onClick={productPageNav}>
      <div className='product-card-img-container'>
        <img 
          className="product-card-img"
          src={imgSrc} 
          alt={name} 
        />  
      </div>
      <div className='product-card-info-container'>
        <p className='product-card-brand'>{brand.name}</p>
        <h3 className='product-card-name'>{name}</h3>
        {gender === "male" ?
          (<div className={`product-card-gender ${gender}`}><span>М</span></div>
        ) : 
          ( <div className={`product-card-gender ${gender}`}><span>Ж</span></div>
        )}
        <p className='product-card-price'>{fPrice} ₽ - {sPrice} ₽</p>
      </div>
    </div>
  );
}

export default ProductCard;