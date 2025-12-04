import './CustomAccordion.css';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import chevronDown from "./chevron-down.svg";

function CustomAccordion({
accordionId,
elements
}){
  return(
    <Accordion id={accordionId} transition transitionTimeout={250}>
      {elements.map((element) => (
      <AccordionItem
      contentProps={{ className:"accordion-item-content" }} 
      buttonProps={{
        className: ({ isEnter }) =>
          `${"accordion-button"} ${isEnter && "accordion-button-expanded"}`
      }}
      header={
        <>
          {element.headerName}
          <img className="accordion-chevron" src={chevronDown} alt="Chevron Down" />
        </>}
      >
        {element.inside}
      </AccordionItem>
      ))} 
    </Accordion>
  );
};

export default CustomAccordion;