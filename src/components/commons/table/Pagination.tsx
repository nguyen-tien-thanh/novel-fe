import { useCallback } from 'react'
import { Button } from '../Button'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components'
import { cn } from '@/lib'
import { useMediaQuery } from 'usehooks-ts'

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
  const isMobile = useMediaQuery('(max-width: 480px)')
  const totalPages = Math.ceil(count / rowsPerPage)

  const getPageNumbers = useCallback(() => {
    const show = isMobile ? 0 : 1
    let start = Math.max(1, page - show)
    let end = Math.min(totalPages, page + show)

    const visibleLength = 2 * show + 1
    if (end - start + 1 < visibleLength) {
      if (start === 1) {
        end = Math.min(totalPages, start + visibleLength - 1)
      } else if (end === totalPages) {
        start = Math.max(1, end - visibleLength + 1)
      }
    }

    const pages: number[] = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }, [page, totalPages])

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
          className={cn('join-item lg:btn-sm', page === 1 && 'pointer-events-none')}
          onClick={() => {
            if (page === 1) return
            onPageChange(0)
          }}
        >
          <ChevronDoubleLeftIcon className="!size-3" />
        </Button>
        <Button
          className={cn('join-item lg:btn-sm', page === 1 && 'pointer-events-none')}
          onClick={() => {
            if (page === 1) return
            onPageChange(page - 2)
          }}
        >
          <ChevronLeftIcon className="!size-3" />
        </Button>

        {pageNumbers.map((num, index) =>
          typeof num === 'number' ? (
            <Button
              key={index}
              className={`join-item lg:btn-sm ${num === page ? 'btn-primary' : ''}`}
              onClick={event => onPageChange(num - 1)}
            >
              {num}
            </Button>
          ) : (
            <Button key={index} disabled className="join-item lg:btn-sm btn-disabled">
              {num}
            </Button>
          ),
        )}

        <Button
          className={cn('join-item lg:btn-sm', page >= totalPages && 'pointer-events-none')}
          onClick={() => {
            if (page >= totalPages) return
            onPageChange(page)
          }}
        >
          <ChevronRightIcon className="!size-3" />
        </Button>
        <Button
          className={cn('join-item lg:btn-sm', page >= totalPages && 'pointer-events-none')}
          onClick={() => {
            if (page >= totalPages) return
            onPageChange(totalPages - 1)
          }}
        >
          <ChevronDoubleRightIcon className="!size-3" />
        </Button>
      </div>
    </div>
  )
}
