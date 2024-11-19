// import { useState, useEffect } from 'react';

// const Pagination = () => {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const fetchBooks = async (page:number) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${process.env.HOST}books?page=${page}`); // Replace `/api/books` with your API endpoint
//       const data = await res.json();
//       setBooks(data.results);
//       setTotalPages(data.total_pages);
//     } catch (error) {
//       console.error('Failed to fetch books:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Books</h1>
//       {loading ? (
//         <p className='font-2xl text-center'>Loading...</p>
//       ) : (
//         <div>
//           <ul className="mb-4">
//             {books.map((book) => (
//               <li key={book?.id} className="mb-2 border p-4 rounded">
//                 <h2 className="text-lg font-semibold">{book?.title}</h2>
//                 <p>Author: {book.author}</p>
//                 <p>Publisher: {book.publisher}</p>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-center items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
//             >
//               Previous
//             </button>
//             <span className="font-semibold">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pagination;

import { useState, useEffect } from 'react';

const Pagination = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  
  const fetchBooks = async (page:number) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.HOST}books?page=${page}`); // Replace `/api/books` with your API endpoint
      const data = await res.json();
      setBooks(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      {loading ? (
        <p className='font-2xl text-center'>Loading...</p>
      ) : (
        <div>
          <ul className="mb-4">
            {books.map((book) => (
              <li key={book?.id} className="mb-2 border p-4 rounded">
                <h2 className="text-lg font-semibold">{book?.title}</h2>
                <p>Author: {book.author}</p>
                <p>Publisher: {book.publisher}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
            >
              Previous
            </button>
            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;