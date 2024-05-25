import React from "react";

interface PaginationProps {
  pagesArray: number[];
  currentPage: number;
  changeCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagesArray,
  currentPage,
  changeCurrentPage,
}) => {
  return (
    <div className="pagination">
      {pagesArray.map((page) => (
        <button
          key={page}
          className={`pagination_button ${
            page === currentPage ? "pagination_button_active" : ""
          }`}
          onClick={() => changeCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
