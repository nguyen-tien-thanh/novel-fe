import { ICategory, IProduct, List, PRODUCT_STATUS, STATE } from '@/types'
import Dashboard from './dashboard'
import { get } from '@/lib'
import { PushNotificationManager } from './NotificationManager'

export default async function Home() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const oneMonthAgo = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000)

  const [
    { data: recommend },
    { data: updated },
    { data: topRatedResp },
    { data: completed },
    { data: weeklyTop },
    { data: monthlyTop },
    { data: categories },
  ] = await Promise.all([
    get<List<IProduct>>('/product', { take: 10, where: { state: STATE.ACTIVE }, orderBy: { viewCount: 'desc' } }),
    get<List<IProduct>>('/product', { take: 14, where: { state: STATE.ACTIVE }, orderBy: { updatedAt: 'desc' } }),
    get<List<IProduct>>('/product', { take: 14, where: { state: STATE.ACTIVE }, include: { rates: true } }),
    get<List<IProduct>>('/product', { take: 14, where: { AND: { state: STATE.ACTIVE, status: PRODUCT_STATUS.DONE } } }),
    get<List<IProduct>>('/product', {
      take: 10,
      where: { AND: { state: STATE.ACTIVE, updatedAt: { gte: oneWeekAgo } } },
      orderBy: { viewCount: 'desc' },
    }),
    get<List<IProduct>>('/product', {
      take: 10,
      where: { AND: { state: STATE.ACTIVE, updatedAt: { gte: oneMonthAgo } } },
      orderBy: { viewCount: 'desc' },
    }),
    get<List<ICategory>>('/category', { take: 30, where: { state: STATE.ACTIVE }, orderBy: { updatedAt: 'desc' } }),
  ])

  const topRated = topRatedResp
    .map(product => {
      const avgRating =
        product.rates && product.rates.length > 0
          ? product.rates.reduce((sum, rate) => sum + rate.rating, 0) / product.rates.length
          : 0
      return { ...product, avgRating }
    })
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0)) as IProduct[]

  return (
    <>
      <PushNotificationManager />
      <Dashboard
        products={{ recommend, updated, topRated, completed, weeklyTop, monthlyTop }}
        categories={categories}
      />
    </>
  )
}
