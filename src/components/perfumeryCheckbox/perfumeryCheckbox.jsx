import './perfumeryCheckbox.css';
import { filterBrands } from '../../api/globalVar';
import { filterCategories } from '../../api/globalVar';
import {useRef} from 'react';

function PerfumeryCheckbox({
  id,
  labelText,
  elementId
}){
  const checkboxRef = useRef();
  let checkboxId = `perfumeryCheckbox-${id}`
  let idOfElement = `${elementId}`

  if(idOfElement !== undefined){
    if (idOfElement.includes('brand')){
      let haveBrand = false;
  
      for (let index = 0; index < filterBrands.length; index++) {
        const brandName = filterBrands[index].name;
  
        if(brandName.labelText === labelText){
          haveBrand = true;
        }
      }
  
      if(!haveBrand){
        filterBrands.push({
          id: {idOfElement},
          name: {labelText}
        });
      }
    }
    else if (idOfElement.includes('category')){
      let haveCategory = false;
      
  
      for (let index = 0; index < filterCategories.length; index++) {
        const categoryName = filterCategories[index].name;
  
        if(categoryName.labelText === labelText){
          haveCategory = true;
        }
      }
  
      if(!haveCategory){
        filterCategories.push({
          id: {idOfElement},
          name: {labelText}
        });
      }
    }
  }

  const handleCheck = () => {
    if(checkboxRef.current.classList.contains('checked')){
      checkboxRef.current.classList.remove('checked');
    }
    else{
      checkboxRef.current.classList.add('checked');
    }
  }

  return(
    <div ref={checkboxRef} id={idOfElement} className='perfumeryCheckbox-container'>
      <input onClick={handleCheck} id={checkboxId} type='checkbox' className='perfumery-checkbox' />
      <label htmlFor={checkboxId}>{labelText}</label>
    </div>
  );
}

export default PerfumeryCheckbox;