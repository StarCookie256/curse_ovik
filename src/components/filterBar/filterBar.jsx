import './filterBar.css';
import PerfumeryCheckbox from '../perfumeryCheckbox/perfumeryCheckbox';
import PerfumerySlider from '../perfumerySlider/perfumerySlider';
import PerfumeryScrollSearcher from '../perfumeryScrollSearcher/perfumeryScrollSearcher';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

function FilterBar(){
  const [searching, setSearching] = useState(false);
  const searchArgs = {
    gender: ['male', 'female'],
    priceValues: [10000, 69999],
    brands: [],
    categories: [],
    volumeValues: [100, 700]
  };

  const genderRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();
  const volumeRef = useRef();

  const searchButtonClick = () => {
    setSearching(true);
  };

  useEffect(() => {
    // if (filterBarRef.current) {
    //   // Поиск полаааааа
    //   const gendersElement = genderRef.current.querySelector;
      
    //   // Поиск по ID внутри контейнера
    //   const elementById = containerRef.current.querySelector('#my-id');
      
    //   // Поиск всех элементов с классом
    //   const allElements = containerRef.current.querySelectorAll('.my-class');
      
    //   console.log(elementByClass, elementById, allElements);
    // }
  }, [searching]);

  return(
    <div className='filterBar-container'>
      <div className='filterBar-container-header'>Поиск по фильтру</div>
      
      <div className='filterBar-element-container'>
        <div className='filterBar-header'>Пол</div>
        <div ref={genderRef} className='filterBar-genders'>
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

      <div ref={priceRef} className='filterBar-element-container price'>
        <div className='filterBar-header'>Цена</div>
        <PerfumerySlider
        firstMaxValue = {0}
        secondMaxValue = {99999}
        valueType = "руб."
        />
      </div>

      <div ref={brandRef} className='filterBar-element-container brands'>
        <div className='filterBar-header'>Бренды</div>
        <PerfumeryScrollSearcher
        elements={Array.from({ length: 10 }).map((_, i) => (
          <PerfumeryCheckbox 
            key={i}
            elementId={`brand-${i}`}
            id={`brand-${i}`}
            labelText={`Брбр Патапим${i}`}
          />
        ))}
        whatFind="brands"
        />
      </div>

      <div ref={categoryRef} className='filterBar-element-container categories'>
        <div className='filterBar-header'>Категории</div>
        <PerfumeryScrollSearcher
        elements={Array.from({ length: 10 }).map((_, i) => (
          <PerfumeryCheckbox 
            key={i}
            elementId={`category-${i}`}
            id={`category-${i}`}
            labelText={`Пельмени${i}`}
          />
        ))}
        whatFind="categories"
        />
      </div>

      <div ref={volumeRef} className='filterBar-element-container volume'>
        <div className='filterBar-header'>Объём</div>
        <PerfumerySlider
        firstMaxValue = {0}
        secondMaxValue = {1000}
        valueType = "мл."
        />
      </div>

      <div className='filter-search-button-container'>
        <Link onClick={searchButtonClick} className='filter-search-link'>
          <button className='filter-search-button'>Найти</button>
        </Link>
      </div>
    </div>
  );
}

export default FilterBar;