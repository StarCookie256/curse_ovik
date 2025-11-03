import './ProductPage.css';
import { productService } from '../../api/services/productsService';
import { productVariationsService } from '../../api/services/productVariationsService';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PerfumeryScrollSearcher from '../../components/perfumeryScrollSearcher/perfumeryScrollSearcher';
import ProductVariationLine from '../../components/productVariationLine/ProductVariationLine';

async function fetchData(productId, setProduct, setProductVariations){
  let localProduct = await productService.getProductById(productId);
  let localProductVariationsList = [];

  localProductVariationsList = await productVariationsService.getProductVariationsByProductId(productId);

  setProduct(localProduct);
  setProductVariations(localProductVariationsList);
}

function ProductPage(){
  const { brandId, productId} = useParams();
  const [product, setProduct] = useState();
  const [productVariations, setProductVariations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try{
      setLoading(true);
      console.log(productId);
      fetchData(productId, setProduct, setProductVariations)
    }
    catch(error){
      console.error('Error loading user data:', error);
    }
    finally{
      setLoading(false);
    }
  }, [productId]);


  if(loading){
    return(
      <div className='loading-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <div className='product-page-container'>

      <div className='product-page-back-container'>
        <Link 
          className='product-page-back' 
          to="/catalog"
        >
          Каталог
        </Link>
        <span> / </span>
        <Link 
          className='product-page-back' 
          to={`/catalog/${brandId}`}
        >
          {product.brand}
        </Link>
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
          <p className='product-page-title-gender'>{product.gender === 'male' ? 'Мужская парфюмерия' : 'Женская парфюмерия'}</p>
          <p className='product-page-title'>{product.name}</p>
          <div className='product-page-details'>
            {product.country && <p className='product-page-text country'>Страна производителя: <span>{product.country}</span> </p>}
            {product.brand && <p className='product-page-text brand'>Бренд: <span>{product.brand}</span> </p>}
            {product.manufactureYear && <p className='product-page-text date'>Год выпуска: <span>{product.manufactureYear}</span> </p>}
            {product.expirationDate && <p className='product-page-text expiration-date'>Срок годности: <span>{product.expirationDate}</span> </p>}
            {product.gender && <p className='product-page-text gender'>Пол: <span>{product.gender === 'male' ? 'для мужчин' : 'для женщин'}</span> </p>}
          </div>
        </div>
      </div>

      <div className='product-page-variations-container'>
        <div className='product-page-section-title'>Варианты товара</div>
        <PerfumeryScrollSearcher 
          elements={
            productVariations.map((productVariation) => (
              <ProductVariationLine
                id={productVariation.id}
                productId={productVariation.productId}
                category={productVariation.category}
                price={productVariation.price}
                volume={productVariation.volume}
                stock={productVariation.stock}
              />
            ))
          }
        />
      </div>

      <div className='product-page-description-container'>
        <div className='product-page-section-title'>Описание</div>
        <div className='product-page-description'>
          Погрузитесь в мир изысканной парфюмерии с ароматом {product.brand} {product.name}. Это уникальное творение — больше, чем просто духи, это ключ к вашему внутреннему состоянию и яркий акцент в вашем образе. {product.brand} {product.name} — это гармоничный симбиоз тщательно отобранных нот, которые раскрываются на коже, создавая неповторимый шлейф. Композиция начинается с яркого и соблазнительного шлейфа, который плавно переходит в сердцевину, раскрывающую всю глубину и характер аромата. Финальная же базовая нота оставляет за собой незабываемый, стойкий след в памяти окружающих. Идеально сбалансированная формула подчеркивает индивидуальность, позволяя аромату звучать по-разному в зависимости от своей обладательницы или обладателя. {product.brand} {product.name} создан для тех, кто ценит качество, стремится к самовыражению и не боится быть замеченным. Позвольте себе роскошь быть особенным каждый день с {product.brand} {product.name}.
        </div>
      </div>

    </div>
  );
}

export default ProductPage;