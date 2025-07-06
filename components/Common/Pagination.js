import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, pathname }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-4">
        {prevPage ? (
          <Link href={{ pathname, query: { page: prevPage } }}>
            <a className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </a>
          </Link>
        ) : (
          <span className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed">
            Previous
          </span>
        )}

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        {nextPage ? (
          <Link href={{ pathname, query: { page: nextPage } }}>
            <a className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </a>
          </Link>
        ) : (
          <span className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed">
            Next
          </span>
        )}
      </nav>
    </div>
  );
}