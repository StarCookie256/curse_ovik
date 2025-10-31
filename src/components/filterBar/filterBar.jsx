import './filterBar.css';
import PerfumeryCheckbox from '../perfumeryCheckbox/perfumeryCheckbox';
import PerfumerySlider from '../perfumerySlider/perfumerySlider';
import PerfumeryScrollSearcher from '../perfumeryScrollSearcher/perfumeryScrollSearcher';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { brandsService } from '../../api/services/brandsService';
import { categoriesService } from '../../api/services/categoriesService';

async function fetchData(setBrands, setCategories){
  let localBrandsList = [];
  let localCategoriesList = [];

  localBrandsList = await brandsService.getBrands();
  localCategoriesList = await categoriesService.getCategories();

  setBrands(localBrandsList);
  setCategories(localCategoriesList);
};

function FilterBar({
  onSearch
}){
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  function createDefaultSearchArgs() {
    return {
      gender: [],
      priceValues: [10000, 69999],
      brands: [],
      categories: [],
      volumeValues: [100, 700]
    };
  }

  const genderRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();
  const volumeRef = useRef();

  const searchButtonClick = () => {
    const searchArgs = createDefaultSearchArgs();

    ////////////// ПОЛУЧЕНИЕ ИНФЫ О ПОЛАХ
    const selectedGenders = genderRef.current.querySelectorAll('.checked > label');
    const genderInfo = Array.from(selectedGenders).map(label => {
      return label.textContent;
    });
    //////////////

    genderInfo.forEach(gender => {
      if(gender === "Для мужчин") searchArgs.gender.push("male");
      else if(gender === "Для женщин") searchArgs.gender.push("female");
    });

    ////////////// ПОЛУЧЕНИЕ ИНФЫ О ЦЕНЕ
    const selectedPrices = priceRef.current.querySelectorAll('input[type="text"]');

    searchArgs.priceValues[0] = selectedPrices[0].value;
    searchArgs.priceValues[1] = selectedPrices[1].value;
    //////////////

    ////////////// ПОЛУЧЕНИЕ ИНФЫ О БРЕНДАХ
    const selectedBrands = brandRef.current.querySelectorAll('.checked > label');
    const brandInfo = Array.from(selectedBrands).map(label => {
      return label.textContent;
    });

    brandInfo.forEach(brand => {
      searchArgs.brands.push(brand);
    });
    //////////////

    ////////////// ПОЛУЧЕНИЕ ИНФЫ О КАТЕГОРИЯХ
    const selectedCategories = categoryRef.current.querySelectorAll('.checked > label');
    const categoryInfo = Array.from(selectedCategories).map(label => {
      return label.textContent;
    });

    categoryInfo.forEach(category => {
      searchArgs.categories.push(category);
    });
    //////////////

    ////////////// ПОЛУЧЕНИЕ ИНФЫ ОБ ОБЪЁМЕ
    const selectedVolumes = volumeRef.current.querySelectorAll('input[type="text"]');

    searchArgs.volumeValues[0] = selectedVolumes[0].value;
    searchArgs.volumeValues[1] = selectedVolumes[1].value;
    //////////////
    
    if(window.location.pathname === '/search'){
      onSearch(searchArgs);
    }
    else{
      navigate('/search', {
        state: searchArgs
      });
    }
  };

  useEffect(() => {
    fetchData(setBrands, setCategories);
  }, []);

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
          elements={brands.map((brand) => (
            <PerfumeryCheckbox 
              key={brand.id}
              elementId={`brand-${brand.id}`}
              id={`brand-${brand.id}`}
              labelText={`${brand.name}`}
            />
        ))}
        whatFind="brands"
        />
      </div>

      <div ref={categoryRef} className='filterBar-element-container categories'>
        <div className='filterBar-header'>Категории</div>
        <PerfumeryScrollSearcher
        elements={categories.map((category) => (
          <PerfumeryCheckbox 
            key={category.id}
            elementId={`category-${category.id}`}
            id={`category-${category.id}`}
            labelText={`${category.name}`}
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
        <button onClick={searchButtonClick} className='filter-search-button'>Найти</button>
      </div>
    </div>
  );
}

export default FilterBar;