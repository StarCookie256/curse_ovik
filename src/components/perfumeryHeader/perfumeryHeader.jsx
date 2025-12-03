import './perfumeryHeader.css';
import { Link, useLocation } from 'react-router';
import { basketService } from '../../api/services/basketService';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { stack as Menu } from 'react-burger-menu'

function PerfumeryHeader(){
  const signal = useSelector(state => state.refresh.signal); // ререндер при добавлении товара в корзину
  const {isAuthenticated} = useAuth();
  const location = useLocation();
  const [basketCount, setBasketCount] = useState();
  const [mobileMode, setMobileMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [loading, setLoading] = useState(true);
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
    async function fetchData() {
      try {
        // setLoading(true);
        const count = await basketService.getBasketItemsCount();
        setBasketCount(count);
      } catch(error) {
        console.error('Error loading basket count:', error);
      } finally {
        // setLoading(false);
      }
    }

    fetchData();
  }, [signal]);

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

  // if(loading){
  //   return(
  //     <div className='loading-container'>
  //       Загрузка...
  //     </div>
  //   );
  // }

  return(
    mobileMode ? (
      <header className='header-container-mobile'>
        <Menu>
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
          {bottomHeaderPages.map((page) => (
            <Link
              className={`header-item-link ${location.pathname === page.path ? 'active' : ''}`}
              key = {page.path}
              to = {page.path}
            >
              <div className={`header-item ${page.pageName}`}>
                {page.label}
                {isAuthenticated && (page.pageName === 'basket' && <div className='header-basket-count'>{basketCount >= 99 ? '99+' : basketCount}</div>)}
              </div>
            </Link>
          ))}
        </Menu>
        <p className='header-mobile-title'>StarCookie Perfumery</p>
      </header>

    ) : (

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
                  {isAuthenticated && (page.pageName === 'basket' && <div className='header-basket-count'>{basketCount >= 99 ? '99+' : basketCount}</div>)}
                </div>
              </Link>
              ))}
            </div>
        </div>
      </header>
    )
  );
}

export default PerfumeryHeader;