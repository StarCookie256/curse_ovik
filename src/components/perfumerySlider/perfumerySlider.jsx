import './perfumerySlider.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

function PerfumerySlider({
  firstMaxValue,
  secondMaxValue,
  valueType
}){
  const [values, setValues] = useState({
    first: Math.round(secondMaxValue * 10 / 100),
    second: Math.round(secondMaxValue * 70 / 100)
  });

  const sliderRef = useRef(null);
  const sliderInstance = useRef(null);

  
  useEffect(() => {
    if (sliderRef.current && !sliderInstance.current) {
      sliderInstance.current = noUiSlider.create(sliderRef.current, {
        start: [values.first, values.second],
        connect: true,
        range: {
          'min': firstMaxValue,
          'max': secondMaxValue
        }
      });

      // Обновление state при изменении слайдера
      sliderInstance.current.on('update', (sliderValues) => {
        setValues({
          first: Math.round(sliderValues[0]),
          second: Math.round(sliderValues[1])
        });
      });
    }

    return () => {
      if (sliderInstance.current) {
        sliderInstance.current.destroy();
        sliderInstance.current = null;
      }
    };
  }, [firstMaxValue, secondMaxValue]);

  
  const handleInputChange = useCallback((field) => (e) => {
    let changedVal = e.target.value;
    
    if (/^\d*\.?\d*$/.test(changedVal) && 
        (changedVal.match(/\./g) || []).length <= 1 &&
        !changedVal.startsWith('.')) {
      
      const numValue = parseFloat(changedVal) || 0;
      
      setValues(prev => {
        let constrainedValue;
        let newFirst = prev.first;
        let newSecond = prev.second;

        if (field === 'first') {
          constrainedValue = Math.max(firstMaxValue, Math.min(numValue, prev.second));
          newFirst = constrainedValue;
        } else {
          constrainedValue = Math.max(prev.first, Math.min(numValue, secondMaxValue));
          newSecond = constrainedValue;
        }
        
        
        if (sliderInstance.current) {
          sliderInstance.current.set([newFirst, newSecond]);
        }
        
        return {
          first: newFirst,
          second: newSecond
        };
      });
    }
  }, [firstMaxValue, secondMaxValue]);

  return(
    <div className='perfumerySlider-container'>
      <div className='perfumerySlider-values'>
        <label>От</label>
        <input 
          type="text" 
          value={values.first} 
          onChange={handleInputChange('first')}
        />
        <label>до</label>
        <input 
          type="text" 
          value={values.second} 
          onChange={handleInputChange('second')}
        />
        <label>{valueType}</label>
      </div>
      <div ref={sliderRef} className='perfumerySlider-body'></div>
    </div>
  );
}

export default PerfumerySlider;