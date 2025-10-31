import { useParams } from 'react-router-dom';
import './BrandPage.css';
import { useEffect, useState } from 'react';
import { brandsService } from '../../api/services/brandsService';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';

async function fetchData(brandId, setProducts, setBrand){
  let localProductsList = [];

  // ПОКА ЧТО ДЛЯ МОКОВЫХ ПРОДУКТОВ
  let brand = await brandsService.getBrandById(brandId);
  localProductsList = await productService.getProductsByBrand(brand.name);

  setProducts(localProductsList);
  setBrand(brand);
};

function BrandPage(){
  const { brandId } = useParams();
  const [brand, setBrand] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try{
      setLoading(true);
      fetchData(brandId, setProducts, setBrand)
    }
    catch(error){
      console.error('Error loading brand data:', error);
    }
    finally{
      setLoading(false);
    }
  }, [brandId]);

  if(loading){
    return(
      <div className='cabinet-page-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <div className='brand-page-container'>

      <div className='brand-page-back-container'>
        <a className='brand-page-back' href="/catalog">Каталог</a>
        <span> / {brand.name}</span>
      </div>

      <div className='brand-page-info-container'>
        <div className='brand-page-title'>
          {brand.name}
        </div>
        <div className='brand-page-description'>
            Здесь представлена коллекция ароматов от парфюмерного бренда {brand.name}. Приоритетом нашей компании является реализация исключительно сертифицированной парфюмерии, и продукция {brand.name} не является исключением — ее аутентичность подтверждена покупателями и защищена гарантийными обязательствами. С полным описанием и ценами можно ознакомиться на страницах товаров.
        </div>
      </div>

      <div className='brand-page-products'>
        {products.map((product) => (
          <ProductCard
            key = {product.id}
            id = {product.id}
            name = {product.name}
            desc = {product.desc}
            category = {product.category}
            brand = {product.brand}
            image = {product.image}
            fPrice = {product.fPrice}
            sPrice = {product.sPrice}
            gender = {product.gender}
          />
        ))}
      </div>
      
    </div>
  );
}

export default BrandPage;