import './perfumeryHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { basketService } from '../../api/services/basketService';
import { useEffect, useState } from 'react';

async function fetchData(setBasketCount){
  let localBasketCount = await basketService.getBasketProductsCount();

  setBasketCount(localBasketCount);
}

export default function PerfumeryHeader(){
  const location = useLocation();
  const [basketCount, setBasketCount] = useState();
  const [loading, setLoading] = useState(true);
  const topHeaderPages = [
    {path:'/main', pageName:'mainPage', label:'Slay💅Star'},
    {path:'/catalog', pageName:'catalog', label:'Каталог товаров'},
    {path:'/cabinet', pageName:'cabinet', label:'Личный кабинет'}
  ];
  const bottomHeaderPages = [
    {path:'/search', pageName:'search', label:'Поиск'},
    {path:'/basket', pageName:'basket', label:'Корзина'}
  ];

  useEffect(() => {
    try{
      setLoading(true);
      fetchData(setBasketCount);
    }
    catch(error){
      console.error('Error loading user data:', error);
    }
    finally{
      setLoading(false);
    }
  }, [basketCount]);

  if(loading){
    return(
      <div className='cabinet-page-container'>
        Загрузка...
      </div>
    );
  }

  return(
    <header className='header-container'>

      <div className='header-top-container'>
        <div className='header-top-items'>
          {topHeaderPages.map((page) => (
            <Link
              className={`header-item-link ${location.pathname === page.path ? 'active' : ''}`}
              key = {page.path}
              to = {page.path}
            >
              <div className={`header-item ${page.pageName}`}>
                {page.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='header-bottom-container'>
          <div className='header-bottom-items'>
            {bottomHeaderPages.map((page) => (
            <Link
              className={`header-item-link ${location.pathname === page.path ? 'active' : ''}`}
              key = {page.path}
              to = {page.path}
            >
              <div className={`header-item ${page.pageName}`}>
                {page.label}
                {page.pageName === 'basket' && <div className='header-basket-count'>{basketCount}</div>}
              </div>
            </Link>
          ))}
          </div>
      </div>
      
    </header>
  );
}