import './CatalogPage.css';
import { brandsService } from '../../api/services/brandsService';
import { useEffect, useState } from 'react';

async function fetchData(setBrands){
  let localBrandsList = [];

  brandsService.getBrands()
  .then(brandsData => {
    setBrands(brandsData);
  });
}

function CatalogPage(){
  const [brands,setBrands] = useState([]);

  useEffect(() => {
    fetchData(setBrands);
  }, []);

  return(
    <div className='brands-page-container'>
      {brands.map((brand) => (
        <a className='brands-page-brand' href={`/brands/${brand.refName}`}>{brand.name}</a>
      ))}
    </div>
  );
}

export default CatalogPage;