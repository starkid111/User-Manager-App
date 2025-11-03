 interface PaginationProps {
     currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
 }

const Pagination = ({goToPage , currentPage , totalPages , totalItems , startIndex , endIndex} : PaginationProps) => {
      if (totalItems === 0) return null;
  return (
     <div className="mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-indigo-600 disabled:opacity-40 text-sm"
                >
                  Prev
                </button>

                {/* page numbers (compact on mobile) */}
                <div className="flex items-center gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`px-2 py-1 rounded-md text-sm ${
                          p === currentPage
                            ? "bg-white text-black font-semibold"
                            : "bg-white/8 text-white"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-indigo-600 disabled:opacity-40 text-sm"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-gray-400">
                Showing {totalItems === 0 ? 0 : startIndex + 1} -{" "}
                {Math.min(totalItems, endIndex)} of {totalItems}
              </div>
            </div>
          </div>
  )
}

export default Pagination