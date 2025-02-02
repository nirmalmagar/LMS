import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Pagination = () => {
  const book_id = useParams();
  const [BookListsURL, setBookListsURL] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.HOST}books/?query=${book_id}/recommended-books/?page=${page}`
      ); // Replace `/api/books` with your API endpoint
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="font-2xl text-center h-96">Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-y-12 gap-x-12">
            {BookListsURL?.map((value: any, index: number) => {
              return (
                <div key={index}>
                  <div className="shadow-md hover:shadow-xl hover:scale-105 h-[25rem]  hover:duration-500">
                    <Link href={`/books/${value.id}/recommended-books`}>
                      <div className="relative w-60 h-72 mb-2">
                        {value?.cover && (
                          <Image fill src={value?.cover} alt="cover image" />
                        )}
                      </div>
                      <div className=" pl-4 pb-2">
                        <h3 className="font-semibold" id="card_title">
                          {value?.title}
                        </h3>
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
                </div>
              );
            })}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
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
