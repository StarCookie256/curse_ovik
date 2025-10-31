import { useNavigate } from 'react-router-dom';
import './productCard.css';
import { brandsService } from '../../api/services/brandsService';
import { useEffect, useState } from 'react';

async function fetchData(brand, setBrandId){
  let localBrand = await brandsService.getBrandByName(brand);

  setBrandId(localBrand.id);
};

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
  const navigate = useNavigate();
  const [brandId, setBrandId] = useState();

  useEffect(() => {
    fetchData(brand, setBrandId);
  }, [brand]);

  const productPageNav = () => {
    navigate(`/catalog/${brandId}/${id}`);
  }

  return(
    <div className='product-card-container' onClick={productPageNav}>
      <div className='product-card-img-container'>
        <img className="product-card-img"
          src={image} 
          alt={name || "Изображение"} 
        />  
      </div>
      <div className='product-card-info-container'>
        <p className='product-card-brand'>{brand}</p>
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