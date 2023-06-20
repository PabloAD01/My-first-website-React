import React from "react";
import PropTypes from "prop-types";


function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const limitedPageNumbers = pageNumbers.slice(0, 5);

  function handleNextPage() {
    onPageChange(currentPage + 1);
  }
  
  function handlePrevPage() {
    onPageChange(currentPage - 1);
  }


  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        P
      </button>
      {limitedPageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage === limitedPageNumbers.length}
        onClick={handleNextPage}
      >
        N
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;