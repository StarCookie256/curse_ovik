import './CatalogPage.css';
import { brandsService } from '../../api/services/brandsService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import CustomAccordion from '../../components/customAccordion/CustomAccordion';

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
  const [mobileMode, setMobileMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchData(setBrands, setBrandNavigations);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1100 && !mobileMode) {
      setMobileMode(true);
    } else if (windowWidth >= 1100 && mobileMode) {
      setMobileMode(false);
    }
  }, [windowWidth, mobileMode]); 

  return(
    <div className='brands-page-container'>

      <div className={`brands-page-navigations-container ${mobileMode}`}>
        <h3 className='brands-page-navigations-title'>Бренды</h3>
        <div className='brands-page-navigations'>
          {brandNavigations.map((brandNavigation) => (
            <a href={`#brandNav-${brandNavigation}`} className='brands-page-navigation'>{brandNavigation}</a>
          ))}
        </div>
      </div>

      {mobileMode ? (
        <>
          {brandNavigations.map((brandNavigation) => {
            return(
              <CustomAccordion 
                accordionId={`brandNav-${brandNavigation}`}
                elements={[
                  {
                    headerName: brandNavigation,
                    inside: <>{brands.map((brand) => {
                      const brandId = brand.id;

                      return(
                        (brand.firstLetter === brandNavigation) &&
                        (
                          <>
                            <Link 
                              className='brands-page-brand' 
                              to={`/catalog/${brandId}`}
                            >
                              {brand.name}
                            </Link>
                            <br />
                          </>
                        )
                      );
                    })}</>
                  }
                ]}
              />
            );
          })}
        </>
      ) : (
        <>
          {brandNavigations.map((brandNavigation) => {
            return(
              <div className='brands-page-brands-container'>
                <h3 id={`brandNav-${brandNavigation}`} className='brands-page-brand-letter'>{brandNavigation}</h3>
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
        </>
      )}
      

    </div>
  );
}

export default CatalogPage;