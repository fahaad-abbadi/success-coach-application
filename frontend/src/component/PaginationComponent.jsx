import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  //Generate page numbers based on total pages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2 py-4">
      <button
        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo; Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 ${
            currentPage === number ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  );
};
export default PaginationComponent;
