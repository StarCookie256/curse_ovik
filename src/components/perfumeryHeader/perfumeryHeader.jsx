import './perfumeryHeader.css';
import { Link, useLocation } from 'react-router-dom';

export default function PerfumeryHeader(){
  const location = useLocation();
  const headerPages = [
    {path:'/main', pageName:'mainPage', label:'Slay💅Star'},
    {path:'/catalog', pageName:'catalog', label:'Каталог товаров'},
    {path:'/cabinet', pageName:'cabinet', label:'Личный кабинет'}
  ];


  return(
    <header className='header-container'>
      <div className='header-items-container'>
        {headerPages.map((page) => (
          <Link
            className={`header-item-link ${location.pathname === page.path ? 'active' : ''}`}
            key = {page.path}
            to = {page.path}
          >
            <div className='header-item'>
              {page.label}
            </div>
          </Link>
        ))}
      </div>
    </header>
  );
}