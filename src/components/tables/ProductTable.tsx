import { formatTimeAgo } from '@/lib'
import { IProduct, PRODUCT_STATUS } from '@/types'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export interface ProductTableProps {
  products: IProduct[]
}

export const ProductTable: FC<ProductTableProps> = props => {
  const { products } = props
  const router = useRouter()

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tác giả</th>
            <th>Trạng thái</th>
            <th>Ngày đăng</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr
              key={product.id}
              role="button"
              onClick={() => router.push(`/product/${product.id}`)}
              className="hover:bg-base-200"
            >
              <th>{product.name}</th>
              <td>{product.authorName}</td>
              <td>
                {product.status === PRODUCT_STATUS.DONE ? (
                  <div className="badge badge-success w-max">Hoàn thành</div>
                ) : (
                  <div className="badge">Chương {product.chapterCount}</div>
                )}
              </td>
              <td>{product.updatedAt && formatTimeAgo(product.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
