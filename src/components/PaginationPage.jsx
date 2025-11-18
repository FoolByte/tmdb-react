import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export function PaginationPage({ currentPage, totalPages, onChange }) {
  const prev = () => {
    if (currentPage > 1) onChange(currentPage - 1);
  };

  const next = () => {
    if (currentPage < totalPages) onChange(currentPage + 1);
  };

  // generate 3 angka: currentPage-1, currentPage, currentPage+1
  const pageNumbers = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p >= 1 && p <= totalPages
  );

  return (
    <Pagination>
      <PaginationContent>
        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={prev} />
        </PaginationItem>

        {/* PAGE NUMBERS */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              className="cursor-pointer"
              onClick={() => onChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
