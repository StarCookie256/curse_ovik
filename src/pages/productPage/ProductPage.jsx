import './ProductPage.css';
import { productService } from '../../api/services/productsService';
import { productVariationsService } from '../../api/services/productVariationsService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PerfumeryScrollSearcher from '../../components/perfumeryScrollSearcher/perfumeryScrollSearcher';

async function fetchData(productId, setProduct, setProductVariations, setBrandId){

}

function ProductPage(){
  const productId = useParams();
  const [product, setProduct] = useState();
  const [productVariations, setProductVariations] = useState([]);
  const [brandId, setBrandId] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try{
      setLoading(true);
      fetchData(productId.id, setProduct, setProductVariations, setBrandId)
    }
    catch(error){
      console.error('Error loading user data:', error);
    }
    finally{
      setLoading(false);
    }
  }, []);


  if(loading){
    return(
      <div className='cabinet-page-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <div className='product-page-container'>

      <div className='product-page-back-container'>
        <a className='product-page-back' href="/catalog">Каталог</a>
        <span> / </span>
        <a className='product-page-back' href="/brandName">{product.brand}</a>
        <span> / {product.name}</span>
      </div>

      <div className='product-page-product-card'>
        <div className='product-page-image-container'>
          <img 
            className='product-page-image' 
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className='product-page-product-card-info'>
          <p className='product-page-title-gender'>{product.gender}</p>
          <h3 className='product-page-title'>{product.name}</h3>
          <div className='product-page-details'>
            <p className='product-page-country'>Страна производителя: {product.country}</p>
            <p className='product-page-brand'>Бренд: {product.brand}</p>
            <p className='product-page-date'>Год выпуска: {product.manufactureYear}</p>
            <p className='product-page-expiration-date'>Срок годности: {product.expirationDate}</p>
            <p className='product-page-gender'>Пол: {product.gender}</p>
          </div>
        </div>
      </div>

      <div className='product-page-variations-container'>
        <PerfumeryScrollSearcher 
          elements={
            productVariations.map((productVariation) => (
              <div className='product-variation-container'>
                {productVariation.category}
              </div>
            ))
          }
        />
      </div>

      <div className='product-page-description-container'>
        <div className='product-page-description-title'>Описание</div>
        <div className='product-page-description'>{product.desc}</div>
      </div>

    </div>
  );
}

export default ProductPage;