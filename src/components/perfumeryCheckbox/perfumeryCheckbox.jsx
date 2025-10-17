import './perfumeryCheckbox.css';

function PerfumeryCheckbox({
  id,
  labelText,
  ref
}){

  var checkboxId = `filter_${id}`

  return(
    <div ref={ref} className='perfumeryCheckbox-container'>
      <input id={checkboxId} type='checkbox' className='perfumery-checkbox' />
      <label htmlFor={checkboxId}>{labelText}</label>
    </div>
  );
}

export default PerfumeryCheckbox;