import './filterBar.css';
import PerfumeryCheckbox from '../perfumeryCheckbox/perfumeryCheckbox';
import PerfumerySlider from '../perfumerySlider/perfumerySlider';

function FilterBar(){

  return(
    <div className='filterBar-container'>
      <div className='filterBar-container-header'>Поиск по фильтру</div>
      
      <div className='filterBar-genders-container'>
        <div className='filterBar-header'>Пол</div>
        <div className='filterBar-genders'>
          <PerfumeryCheckbox 
          id="women"
          labelText="Для женщин"
          />
          <PerfumeryCheckbox 
          id="man"
          labelText="Для мужчин"
          />
        </div>
      </div>

      <div className='filterBar-genders-container'>
        <div className='filterBar-header'>Цена</div>
        <PerfumerySlider
        firstMaxValue = {0}
        secondMaxValue = {99999}
        valueType = "руб."
        />
      </div>

      <div className='filterBar-header'>Бренды</div>

    </div>
  );
}

export default FilterBar;