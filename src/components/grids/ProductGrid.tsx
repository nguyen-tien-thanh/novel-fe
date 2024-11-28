// import { Box, Link, Skeleton, Typography } from '@mui/material'
// import React from 'react'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import { Star } from '@mui/icons-material'
// import { IProduct } from '@/types'
// import Image from 'next/image'
// import { cn } from '@/lib'

// export interface IProductGrid {
//   products: IProduct[]
//   limit?: number
//   loading?: boolean
//   showInfo?: boolean
// }

// export const ProductGrid = ({ products, limit = 12, loading, showInfo = false }: IProductGrid) => {
//   return (
//     <Box className="grid grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-6 gap-1 sm:gap-2">
//       {!products || loading
//         ? Array.from({ length: limit }).map((_, i) => (
//             <Box
//               key={i}
//               sx={{
//                 height: {
//                   xs: 180,
//                   md: 270,
//                   xl: 360,
//                 },
//               }}
//             >
//               <Skeleton variant="rounded" width="100%" height="100%" />
//             </Box>
//           ))
//         : products.slice(0, limit).map(prod => {
//             return (
//               <Box key={prod.id} sx={{ overflow: 'hidden' }}>
//                 <Link href={`/product/${prod.id}`} className="relative group">
//                   <Box
//                     sx={{
//                       height: {
//                         xs: 180,
//                         md: 270,
//                         xl: 360,
//                       },
//                     }}
//                   >
//                     {prod.image ? (
//                       <Image
//                         className={cn(
//                           'object-cover w-full h-full object-center',
//                           !showInfo && `group-hover:scale-105 transition-all `,
//                         )}
//                         fill={true}
//                         src={prod.image}
//                         alt={prod.name}
//                         loading="lazy"
//                       />
//                     ) : null}
//                   </Box>

//                   {!showInfo && (
//                     <Box className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-2 text-center backdrop-blur-sm group-hover:py-5 group-hover:backdrop-blur-lg transition-all">
//                       <Typography variant="body1" className="text-[#f0f0f0]">
//                         {prod.name}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Link>

//                 {showInfo && (
//                   <Box className="w-full">
//                     <Box className="py-2 flex flex-wrap justify-between items-center gap-2">
//                       <Typography className="font-semibold">{prod.name}</Typography>
//                     </Box>
//                     <Box className="text-gray-400 flex flex-wrap justify-between items-center gap-2">
//                       <Typography>{prod.chapterCount} chương</Typography>
//                       <Box className="text-gray-400 flex items-center space-x-1">
//                         {prod.viewCount! > 0 && (
//                           <>
//                             <Typography>{prod.viewCount}</Typography>
//                             <VisibilityIcon fontSize="small" />
//                           </>
//                         )}
//                         {prod.averageRate! > 0 && (
//                           <>
//                             <Typography>{prod.averageRate}</Typography>
//                             <Star fontSize="small" />
//                           </>
//                         )}
//                       </Box>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             )
//           })}
//     </Box>
//   )
// }
