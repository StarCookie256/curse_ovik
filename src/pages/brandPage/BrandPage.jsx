import { useParams } from 'react-router-dom';
import './BrandPage.css';
import { useEffect, useState } from 'react';
import { brandsService } from '../../api/services/brandsService';
import { productService } from '../../api/services/productsService';
import ProductCard from '../../components/productCard/productCard';
import { Link } from 'react-router-dom';

async function fetchData(brandId, setProducts, setBrand){

  const brand = await brandsService.getBrandById(brandId);
  const localProductsList = await productService.getProductsByBrand(brandId);

  setProducts(localProductsList);
  setBrand(brand);
};

function BrandPage(){
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
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

  if(loading || !brand){
    return(
      <div className='loading-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <div className='brand-page-container'>

      <div className='brand-page-back-container'>
        <Link 
          className='brand-page-back' 
          to="/catalog"
        >
          Каталог
        </Link>
        <span> / {brand && brand.name}</span>
      </div>

      <div className='brand-page-info-container'>
        <div className='brand-page-title'>
          {brand.name}
        </div>
        <div className='brand-page-description'>
            Здесь представлена коллекция ароматов от парфюмерного бренда {brand.name}. Приоритетом нашей компании является реализация исключительно сертифицированной парфюмерии, и продукция {brand.name} не является исключением — ее аутентичность подтверждена покупателями и защищена гарантийными обязательствами. С полным описанием и ценами можно ознакомиться на страницах товаров.
        </div>
      </div>

      {products.length > 0 ? 
        (
          <div className='brand-page-products'>
            {products.map((product) => (
            <ProductCard
              key = {product.id}
              id = {product.id}
              name = {product.name}
              desc = {product.desc}
              categories = {product.categories}
              brand = {product.brand}
              image = {product.image}
              fPrice = {product.fPrice}
              sPrice = {product.sPrice}
              gender = {product.gender}
            />))}
          </div>
      ) : (
        <div className='brand-products-nothing'>
          У данного бренда отсутствуют товары!
        </div>
      )}

    </div>
  );
}

export default BrandPage;