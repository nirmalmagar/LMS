import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Pagination = () => {
  const [BookListsURL, setBookListsURL] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.HOST}books?page=${page}`); // Replace `/api/books` with your API endpoint
      const data = await res.json();
      setBookListsURL(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePageChange = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Books lists</h1>
      {loading ? (
        <p className="font-2xl text-center h-96">Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
            {BookListsURL?.map((value: any, index: number) => {
              return (
                <div key={index}>
                  <div className="shadow-md hover:shadow-xl hover:scale-105  hover:duration-500">
                    <Link href={`/book-list/${value.id}`}>
                      <div className="relative w-60 h-72 mb-2">
                        <Image fill src={value?.cover} alt="cover image" />
                      </div>
                      <div className=" pl-4 pb-2">
                        <h3 className="font-semibold">{value?.title}</h3>
                        <div className="flex gap-x-0.5">
                          <span className="font-semibold">by:</span>
                          <p>{value?.publisher}</p>
                        </div>
                        <div className="flex gap-x-0.5 font-semibold text-lg">
                          <p className="">Rs:</p>
                          <span>{value?.price}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <div className="my-2 py-1 border-2 border-blue-400 text-center rounded-sm hover:bg-blue-400 font-semibold hover:text-white">
                    ADD TO CART
                  </div> */}
                </div>
              );
            })}
          </div>
          {/*<ul className="mb-4">
            {books.map((book) => (
              <li key={book?.id} className="mb-2 border p-4 rounded">
                <h2 className="text-lg font-semibold">{book?.title}</h2>
                <p>Author: {book.author}</p>
                <p>Publisher: {book.publisher}</p>
              </li>
            ))} 
          </ul>*/}
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
