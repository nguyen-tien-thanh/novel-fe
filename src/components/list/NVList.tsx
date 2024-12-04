'use client'
import React, { ReactElement, ReactNode, useState } from 'react'
import Link from 'next/link'
import { ICategory, IChapter, IProduct } from '@/types'
import { EditIcon, TrashIcon } from '../icons'
import { Pagination } from './NVPagination'

interface NVListColumnProps<T extends IProduct | ICategory | IChapter> {
  headerName: string
  name: keyof T
  render?: (value: T[keyof T], row: T) => ReactNode
  rowData?: T
}

interface NVListProps {
  data: IProduct[] | ICategory[] | IChapter[]
  title: string
  onAdd: () => void
  children: ReactElement<NVListColumnProps<IProduct | ICategory | IChapter>>[]
  onDel?: (id: number) => void
  isEdit?: boolean
  resource: string
}

export const NVList = ({ data, title, onAdd, children, onDel, isEdit, resource }: NVListProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedData = rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button className="btn btn-primary" onClick={onAdd}>
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {React.Children.map(children, child => (
                <th>{child.props.headerName}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row: IProduct | ICategory | IChapter, index: number) => (
              <tr key={index} className="h-5 leading-5">
                {React.Children.map(children, child => React.cloneElement(child, { rowData: row }))}
                <td>
                  <div className="flex gap-2">
                    {isEdit && (
                      <Link href={`/admin/${resource}/${row.id}`}>
                        <button className="btn btn-sm btn-outline">
                          <EditIcon />
                        </button>
                      </Link>
                    )}
                    {onDel && (
                      <button className="btn btn-sm btn-outline btn-error" onClick={() => onDel(row.id)}>
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center w-full">
        <Pagination
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}
