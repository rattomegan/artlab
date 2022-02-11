import "./Pagination.css";

function Pagination({ totalItems, handlePageClick}) {
  const pageNumbers = [];
  
  for(let i = 1; i <= Math.ceil(totalItems / 30); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="Pagination">
        {pageNumbers.map(page => (
          <li key={page} className="page-item">
            <button className="page-btn" onClick={() => handlePageClick(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination