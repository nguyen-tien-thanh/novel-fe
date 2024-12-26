export function DashboardStats({ title, icon, value, description, colorIndex }) {
  const COLORS = ['primary', 'primary']

  const getDescStyle = () => {
    if (description.includes('↗︎')) return 'font-bold text-green-700 dark:text-green-300'
    else if (description.includes('↙')) return 'font-bold text-rose-500 dark:text-red-400'
    else return ''
  }

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className={`stat-figure text-base-content  text-${COLORS[colorIndex % 2]}`}>{icon}</div>
        <div className="stat-title text-base-content ">{title}</div>
        <div className={`stat-value text-base-content  text-${COLORS[colorIndex % 2]}`}>{value}</div>
        <div className={'stat-desc  ' + getDescStyle()}>{description}</div>
      </div>
    </div>
  )
}
