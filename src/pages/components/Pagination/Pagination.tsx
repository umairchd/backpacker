import { FC, useMemo } from "react";

interface PaginationProps {
  page: number;
  totalCount: number;
  itemsPerPage: number;
  testId?: string;
  onClick: (page: number) => any;
}

const Pagination: FC<PaginationProps> = ({ page, totalCount, itemsPerPage, testId, onClick }) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const complexPagination = useMemo(() => {
    if (totalPages < 6 || page < 3) {
      return (
        <>
          {[...Array(totalPages < 6 ? totalPages : 3)].map((_, ind) => (
            <li
              key={ind}
              className={`page-item cursor-pointer list-none m-0 ${ind + 1 === page ? "active" : ""} `}
              onClick={() => onClick(ind + 1)}
            >
              <span className="page-link">{ind + 1}</span>
            </li>
          ))}
          {totalPages >= 6 && (
            <li className="page-item cursor-pointer list-none m-b">
              <span className="page-link">…</span>
            </li>
          )}
        </>
      );
    } else if (page >= 3 && page <= totalPages - 2) {
      return (
        <>
          <li className="page-item cursor-pointer list-none m-b">
            <span className="page-link">…</span>
          </li>
          <li
            className="page-item cursor-pointer list-none m-b"
            onClick={() => onClick(page - 1)}
          >
            <span className="page-link">{page - 1}</span>
          </li>
          <li className="page-item cursor-pointer list-none m-b active">
            <span className="page-link">{page}</span>
          </li>
          <li
            className="page-item cursor-pointer list-none m-b"
            onClick={() => onClick(page + 1)}
          >
            <span className="page-link">{page + 1}</span>
          </li>
          <li className="page-item cursor-pointer list-none m-b">
            <span className="page-link">…</span>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="page-item cursor-pointer list-none m-b">
            <span className="page-link">…</span>
          </li>
          {[...Array(3)].map((_, ind) => (
            <li
              key={ind}
              className={`page-item cursor-pointer list-none m-b ${totalPages - 2 + ind === page ? "active" : ""} `}
              onClick={() => onClick(totalPages - 2 + ind)}
            >
              <span className="page-link">{totalPages - 2 + ind}</span>
            </li>
          ))}
        </>
      );
    }
  }, [page, totalPages, onClick]);

  return (
    <ul
      data-testid={testId}
      className="pagination"
    >
      {page !== 1 && (
        <li
          className="page-item cursor-pointer list-none m-b"
          onClick={() => onClick(1)}
        >
          <span className="page-link">«</span>
        </li>
      )}
      {complexPagination}
      {page !== totalPages && (
        <li
          className="page-item cursor-pointer list-none m-b"
          onClick={() => onClick(totalPages)}
        >
          <span className="page-link">»</span>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
