import { useCallback } from 'react'
import { Button } from '../Button'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components'
import { cn } from '@/lib'

export interface IPaginationProps {
  count: number
  rowsPerPage: number
  page: number
  onPageChange: (newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Pagination: React.FC<IPaginationProps> = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  handleChangeRowsPerPage,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage)
  const visiblePages = 3

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
    <div className="flex gap-2 items-center justify-end flex-wrap">
      <select className="select select-bordered select-sm" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
        <option value={5}>5 hàng</option>
        <option value={10}>10 hàng</option>
        <option value={25}>25 hàng</option>
        <option value={-1}>Tất cả</option>
      </select>
      <div className="join">
        <Button
          className={cn('join-item lg:!btn-sm', page === 0 && 'pointer-events-none')}
          onClick={() => {
            if (page === 0) return
            onPageChange(0)
          }}
        >
          <ChevronDoubleLeftIcon className="!size-3" />
        </Button>
        <Button
          className={cn('join-item lg:!btn-sm', page === 0 && 'pointer-events-none')}
          onClick={() => {
            if (page === 0) return
            onPageChange(page - 1)
          }}
        >
          <ChevronLeftIcon className="!size-3" />
        </Button>

        {pageNumbers.map((num, index) =>
          typeof num === 'number' ? (
            <Button
              key={index}
              className={`join-item lg:!btn-sm ${num === page + 1 ? 'btn-primary' : ''}`}
              onClick={event => onPageChange(num - 1)}
            >
              {num}
            </Button>
          ) : (
            <Button key={index} disabled className="join-item lg:!btn-sm btn-disabled">
              {num}
            </Button>
          ),
        )}

        <Button
          className={cn('join-item lg:!btn-sm', page + 1 >= totalPages && 'pointer-events-none')}
          onClick={() => {
            if (page + 1 >= totalPages) return
            onPageChange(page + 1)
          }}
        >
          <ChevronRightIcon className="!size-3" />
        </Button>
        <Button
          className={cn('join-item lg:!btn-sm', page + 1 >= totalPages && 'pointer-events-none')}
          onClick={() => {
            if (page + 1 >= totalPages) return
            onPageChange(totalPages - 1)
          }}
        >
          <ChevronDoubleRightIcon className="!size-3" />
        </Button>
      </div>
    </div>
  )
}
