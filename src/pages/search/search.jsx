import './search.css';
import FilterBar from '../../components/filterBar/filterBar';

function SearchPage(){
  return(
    <div className='main-page-container'>
      <div className='main-page-title'>Найдено товаров: 0</div>

      <div className='main-page-components-container'>
        <div className='main-page-products'>
        </div>
        <div className='main-page-filter-bar'>
          <FilterBar />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;