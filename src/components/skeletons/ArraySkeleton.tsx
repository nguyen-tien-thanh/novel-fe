// 'use client'

// import { Skeleton, SkeletonProps } from '@mui/material'

// export interface IArraySkeleton extends SkeletonProps {
//   count?: number
// }

// export const ArraySkeleton = ({ count = 1, variant = 'text', ...props }: IArraySkeleton) => {
//   const widths = [
//     '68%',
//     '91%',
//     '92%',
//     '64%',
//     '54%',
//     '55%',
//     '96%',
//     '32%',
//     '78%',
//     '46%',
//     '93%',
//     '69%',
//     '54%',
//     '44%',
//     '37%',
//     '62%',
//     '44%',
//     '38%',
//     '58%',
//     '48%',
//     '33%',
//     '86%',
//     '61%',
//     '79%',
//     '76%',
//     '35%',
//     '48%',
//     '67%',
//     '84%',
//     '70%',
//     '46%',
//     '73%',
//     '61%',
//     '36%',
//     '59%',
//     '75%',
//     '48%',
//     '70%',
//     '34%',
//     '92%',
//   ]

//   return Array.from({ length: count }).map((_, i) => (
//     <Skeleton key={i} sx={{ my: 2 }} variant={variant} width={widths[i % widths.length]} {...props} />
//   ))
// }
