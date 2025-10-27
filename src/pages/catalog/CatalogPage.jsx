import './CatalogPage.css';
import { brandsService } from '../../api/services/brandsService';
import { useEffect, useState } from 'react';

async function fetchData(setBrands, setBrandNavigations){
  let localBrandsList = [];
  let localBrandNavigationsList = [];

  localBrandsList = await brandsService.getBrands();

  localBrandsList = localBrandsList.map(brand => {
    brand.firstLetter = brand.name.charAt(0)

    if(!localBrandNavigationsList.includes(brand.firstLetter))
      localBrandNavigationsList.push(brand.firstLetter)

    return brand;
  });

  setBrands(localBrandsList);
  setBrandNavigations(localBrandNavigationsList);
}

function CatalogPage(){
  const [brands,setBrands] = useState([]);
  const [brandNavigations, setBrandNavigations] = useState([]);

  useEffect(() => {
    fetchData(setBrands, setBrandNavigations);
  }, []);

  return(
    <div className='brands-page-container'>
      <div className='brands-page-navigations'>
      </div>
      {brandNavigations.map((brandNavigation) => (
        <div>{brandNavigation}</div>
      ))}
      {brands.map((brand) => (
        <a className='brands-page-brand' href={`/brands/${brand.refName}`}>{brand.name}</a>
      ))}
    </div>
  );
}

export default CatalogPage;