import './searchPaginator.css';
import { memo } from 'react';

// предполагаемые рофлики
// const paginationProps = {
//   onNextPageClick: () => {},
//   onPrevPageClick: () => {},
//   disable: {
//     left: false,
//     right: false
//   },
//   nav: {
//     current: 1,
//     total: 10
//   }
// };

const SearchPaginator = (props) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className="search-paginator-container">
      <button
        className="search-paginator-arrow"
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        {'<'}
      </button>

      {nav && (
        <span className="search-paginator-navigation" >
          {nav.current} / {nav.total}
        </span>
      )}

      <button
        className="search-paginator-arrow"
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        {'>'}
      </button>
    </div>
  );
};

export default memo(SearchPaginator);