import './perfumeryHeader.css';
import { Link } from 'react-router-dom';

export default function PerfumeryHeader(){
  const headerPages = [
    {path:'/main', pageName:'mainPage', label:'Главная'}
  ];


  return(
    <header className='header-container'>
      {headerPages.map((page) => (
        <Link
          key = {page.path}
          to = {page.path}
        >
          <div className='header-item'>
            {page.label}
          </div>
        </Link>
      ))}
    </header>
  );
}