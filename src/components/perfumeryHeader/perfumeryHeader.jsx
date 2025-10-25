import './perfumeryHeader.css';
import { Link } from 'react-router-dom';

export default function PerfumeryHeader(){
  const headerPages = [
    {path:'/main', pageName:'mainPage', label:'Slay💅Star'},
    {path:'/main', pageName:'mainPage', label:'Каталог товаров'},
    {path:'/cabinet', pageName:'cabinet', label:'Личный кабинет'}
  ];


  return(
    <header className='header-container'>
      <div className='header-items-container'>
        {headerPages.map((page) => (
          <Link
            className='header-item-link'
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