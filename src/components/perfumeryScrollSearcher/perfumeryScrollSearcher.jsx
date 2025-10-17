import './perfumeryScrollSearcher.css';
import PerfumeryCheckbox from '../perfumeryCheckbox/perfumeryCheckbox';
import { useState, useCallback, useRef } from 'react';

function PerfumeryScrollSearcher({
  elements
}){
  const [searchStr, setSearchStr] = useState('');
  const elementsRef = useRef();

  const searchItems = useCallback((e) => {
    setSearchStr(e.target.value);
  }, [searchStr]);

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