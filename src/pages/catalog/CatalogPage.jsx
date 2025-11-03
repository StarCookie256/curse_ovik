import './CatalogPage.css';
import { brandsService } from '../../api/services/brandsService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  setBrandNavigations(localBrandNavigationsList.sort());
}

function CatalogPage(){
  const [brands,setBrands] = useState([]);
  const [brandNavigations, setBrandNavigations] = useState([]);

  useEffect(() => {
    fetchData(setBrands, setBrandNavigations);
  }, []);

  return(
    <div className='brands-page-container'>

      <div className='brands-page-navigations-container'>
        <h3 className='brands-page-navigations-title'>Бренды</h3>
        <div className='brands-page-navigations'>
          {brandNavigations.map((brandNavigation) => (
            <p className='brands-page-navigation'>{brandNavigation}</p>
          ))}
        </div>
      </div>

      {brandNavigations.map((brandNavigation) => {
        return(
          <div className='brands-page-brands-container'>
            <h3 className='brands-page-brand-letter'>{brandNavigation}</h3>
            <div className='brands-page-brands'>
              {brands.map((brand) => {
                const brandId = brand.id;

                return(
                  (brand.firstLetter === brandNavigation) &&
                  (
                    <Link 
                      className='brands-page-brand' 
                      to={`/catalog/${brandId}`}
                    >
                      {brand.name}
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        );
      })}

    </div>
  );
}

export default CatalogPage;