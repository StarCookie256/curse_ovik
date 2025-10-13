import './filterBar.css';

function FilterBar(){
  return(
    <div className='filterBar-container'>
      <div className='filterBar-container-header'>Поиск по фильтру</div>
      <div className='filterBar-genders-container'>
        <div className='filterBar-header'>По полу</div>
        <div className='filterBar-genders'>
          <div className='filterBar-women'>
            <input id='filter_women'type='checkbox' className='perfumery-checkbox' />
            <label htmlFor='filter_women'>Для женщин</label>
          </div>
          <div className='filterBar-men'>
            <input id='filter_men'type='checkbox' className='perfumery-checkbox' />
            <label htmlFor='filter_men'>Для мужчин</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;