import './filterBar.css';
import { useEffect, useState, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

function FilterBar(){
  const [priceValues, setPriceValues] = useState({
    first: 0,
    second: 99999
  });

  const sliderRef = useRef(null);
  const sliderInstance = useRef(null);

  useEffect(() => {
    if (sliderRef.current && !sliderInstance.current) {
      sliderInstance.current = noUiSlider.create(sliderRef.current, {
        start: [500, 25000],
        connect: true,
        range: {
          'min': 0,
          'max': 99999
        }
      });

      sliderRef.current.noUiSlider.on('update', (values) => {
        setPriceValues({
          first: Math.round(values[0]),
          second: Math.round(values[1])
        });
      });
    }

    // Очистка при размонтировании компонента
    return () => {
      if (sliderRef.current && sliderRef.current.noUiSlider) {
        sliderRef.current.noUiSlider.destroy();
        sliderInstance.current = null;
      }
    };
  }, []);

  return(
    <div className='filterBar-container'>
      <div className='filterBar-container-header'>Поиск по фильтру</div>
      
      <div className='filterBar-genders-container'>
        <div className='filterBar-header'>Пол</div>
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

      <div className='filterBar-price-container'>
        <div className='filterBar-header'>Цена</div>
        <div className='filterBar-price-values'>
          <label>От</label>
          <input value={priceValues.first} />
          <label>до</label>
          <input value={priceValues.second} />
          <label>руб.</label>
        </div>
        <div ref={sliderRef} className='filterBar-price-slider'></div>
      </div>
    </div>
  );
}

export default FilterBar;