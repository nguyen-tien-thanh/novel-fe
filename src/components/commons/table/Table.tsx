'use client'

import { cn } from '@/lib'
import React, { FC, ReactElement, useState } from 'react'
import { Button } from '../Button'
import { EditIcon, PlusIcon, TrashIcon } from '../../icons'
import { IRowProps } from './Row'
import { TEntity } from '@/types'
import { Pagination } from './Pagination'

export interface ITableProps<T extends TEntity> {
  data?: T[]
  title?: string
  resource?: string
  children: ReactElement<IRowProps<T>>[] | ReactElement<IRowProps<T>>
  onCreate?: () => void
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
  onRowClick?: (id: number) => void
}

export type TTablePin = 'rows' | 'cols'
export interface ITableStyleProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  zebra?: boolean
  pin?: TTablePin[]
  checkbox?: boolean
  hover?: boolean
  className?: string
  footer?: boolean
  pagination?: boolean
}

// TODO: TableAction, handleCheckbox
export const Table: FC<ITableProps<TEntity> & ITableStyleProps> = ({
  data,
  title,
  resource,
  children,
  onCreate,
  onDelete,
  onEdit,
  onRowClick,

  size = 'sm',
  zebra,
  pin,
  checkbox,
  hover,
  className,
  footer = false,
  pagination = true,
  ...props
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handlePageChange = newPage => setPage(newPage)
  const handleRowChange = e => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const pinnedClass = pin?.map(p => (p === 'rows' ? 'table-pin-rows' : 'table-pin-cols')).join(' ')
  const paginatedData =
    data && data.length > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data

  return (
    <div>
      {title && (
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>}
        </div>
      )}

      <div className={cn('overflow-x-auto mb-2', className)} {...props}>
        <table
          className={cn(
            'table',
            size === 'xs' && 'table-xs',
            size === 'sm' && 'table-sm',
            size === 'md' && 'table-md',
            size === 'lg' && 'table-lg',
            zebra && 'table-zebra',
            pinnedClass,
          )}
        >
          <thead>
            <tr>
              {checkbox && (
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
              )}
              {React.Children.map(children, child => (
                <th>{child.props.colName}</th>
              ))}
              <th>
                {onCreate && (
                  <Button className="btn-success w-max" onClick={onCreate}>
                    <PlusIcon />
                    Tạo
                  </Button>
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={cn('', (hover || onRowClick) && 'hover cursor-pointer')}
                  onClick={() => onRowClick && onRowClick(Number(row.id))}
                >
                  {checkbox && (
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                  )}
                  {React.Children.map(children, child => React.cloneElement(child, { rowData: row }))}
                  <td>
                    <div className="flex gap-1">
                      {onEdit && (
                        <Button className="btn-outline" icon onClick={() => onEdit(Number(row.id))}>
                          <EditIcon />
                        </Button>
                      )}
                      {onDelete && (
                        <Button className="btn-outline btn-error" icon onClick={() => onDelete(Number(row.id))}>
                          <TrashIcon />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={React.Children.count(children) + 1} className="text-center">
                  Không có dữ liệu
                </th>
              </tr>
            )}
          </tbody>

          {footer && paginatedData && paginatedData.length > 0 && (
            <tfoot>
              <tr>
                {checkbox && <th></th>}
                {React.Children.map(children, child => (
                  <th>{child.props.colName}</th>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {pagination && data && (
        <Pagination
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page + 1}
          onPageChange={handlePageChange}
          handleChangeRowsPerPage={handleRowChange}
        />
      )}
    </div>
  )
}
