import { React } from "react";
import paginationCss from "../cssModules/Pagination.module.css";

export default function Pagination({ totalCountries, actualPage, countriesPerPage, pages }) {
  const pageNumbers = [];

  const totalPages = 1 + Math.ceil((totalCountries - 9) / countriesPerPage);

  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav className={paginationCss.pagination}>
      <ul className={paginationCss.ul}>
        {pageNumbers.map(pageNumber => (
          <span key={pageNumber.toString()} className={actualPage === pageNumber ? paginationCss.active : null}>
            <button type="button" onClick={() => pages(pageNumber)}>
              {pageNumber}
            </button>
          </span>
        ))}
      </ul>
    </nav>
  );
}
