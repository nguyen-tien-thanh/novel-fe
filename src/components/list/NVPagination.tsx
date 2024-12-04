import { useCallback } from 'react'

interface PaginationProps {
  count: number
  rowsPerPage: number
  page: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  handleChangeRowsPerPage,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage)
  const visiblePages = 5

  const getPageNumbers = useCallback(() => {
    const start = Math.max(1, page - Math.floor(visiblePages / 2))
    const end = Math.min(totalPages, start + visiblePages - 1)

    const pages: (number | string)[] = []
    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }, [page, visiblePages, totalPages])
  const pageNumbers = getPageNumbers()

  return (
    <div className="flex gap-2 items-center justify-between">
      <select className="select select-bordered select-sm" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
        <option value={5}>5 hàng</option>
        <option value={10}>10 hàng</option>
        <option value={25}>25 hàng</option>
        <option value={-1}>Tất cả</option>
      </select>
      <div className="join">
        <button className="join-item btn" onClick={event => onPageChange(event, page - 1)} disabled={page === 0}>
          «
        </button>

        {pageNumbers.map((num, index) =>
          typeof num === 'number' ? (
            <button
              key={index}
              className={`join-item btn ${num === page + 1 ? 'btn-active' : ''}`}
              onClick={event => onPageChange(event, num - 1)}
            >
              {num}
            </button>
          ) : (
            <span key={index} className="join-item btn btn-disabled">
              {num}
            </span>
          ),
        )}
        <button
          className="join-item btn"
          onClick={event => onPageChange(event, page + 1)}
          disabled={page + 1 >= totalPages}
        >
          »
        </button>
      </div>
    </div>
  )
}
