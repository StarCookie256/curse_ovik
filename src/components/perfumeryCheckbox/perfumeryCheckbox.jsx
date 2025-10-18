import './perfumeryCheckbox.css';
import { filterBrands } from '../../api/globalVar';
import { filterCategories } from '../../api/globalVar';

function PerfumeryCheckbox({
  id,
  labelText,
  elementId
}){

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

  return(
    <div id={idOfElement} className='perfumeryCheckbox-container'>
      <input id={checkboxId} type='checkbox' className='perfumery-checkbox' />
      <label htmlFor={checkboxId}>{labelText}</label>
    </div>
  );
}

export default PerfumeryCheckbox;