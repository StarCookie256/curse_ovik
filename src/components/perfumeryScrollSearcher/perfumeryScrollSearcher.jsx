import './perfumeryScrollSearcher.css';
import { filterBrands, filterCategories } from '../../api/globalVar';

function PerfumeryScrollSearcher({
  elements,
  whatFind
}){

  const searchItems = (e) => {
    const toSearch = e.target.value;

    if(whatFind === "brands"){
      for (let index = 0; index < filterBrands.length; index++) {
        const brandName = filterBrands[index].name.labelText.toLowerCase();
        console.log(brandName);
        let id = filterBrands[index].id.idOfElement;
        console.log(id);
  
        let element = document.getElementById(id);
        if(brandName.includes(toSearch.toLowerCase()) || toSearch.length === 0){
          element.style.display = 'flex';
        }
        else{
          element.style.display = 'none';
        }
      }
    }
    else if(whatFind === "categories"){
      for (let index = 0; index < filterCategories.length; index++) {
        const categoryName = filterCategories[index].name.labelText.toLowerCase();
        console.log(categoryName);
        let id = filterCategories[index].id.idOfElement;
        console.log(id);
  
        let element = document.getElementById(id);
        if(categoryName.includes(toSearch.toLowerCase()) || toSearch.length === 0){
          element.style.display = 'flex';
        }
        else{
          element.style.display = 'none';
        }
      }
    }
  };

  return(
    <div className='perfumeryScrollSearcher-container'>
      <input className='perfumeryScrollSearcher-input' type='text' onChange={searchItems}></input>
      <div className='perfumeryScrollSearcher-items'>
        {elements}
      </div>
    </div>
  );
}

export default PerfumeryScrollSearcher;