// import React from "react"
// import { Box, Typography, useTheme, alpha } from "@mui/material"
// import { motion } from "framer-motion"

// interface EmptyStateProps {
//   title: string
//   description: string
//   icon: React.ReactNode
//   action?: React.ReactNode
// }

// const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => {
//   const theme = useTheme()

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           py: 8,
//           px: 2,
//           borderRadius: "16px",
//           background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.default, 0.6)} 100%)`,
//           backdropFilter: "blur(8px)",
//           border: `1px dashed ${alpha(theme.palette.divider, 0.6)}`,
//         }}
//       >
//         <Box
//           sx={{
//             color: alpha(theme.palette.primary.main, 0.7),
//             mb: 3,
//             transform: "scale(1)",
//             animation: "pulse 2s infinite",
//             "@keyframes pulse": {
//               "0%": {
//                 transform: "scale(0.95)",
//                 opacity: 0.7,
//               },
//               "50%": {
//                 transform: "scale(1)",
//                 opacity: 1,
//               },
//               "100%": {
//                 transform: "scale(0.95)",
//                 opacity: 0.7,
//               },
//             },
//           }}
//         >
//           {icon}
//         </Box>

//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 600,
//             mb: 1,
//             color: theme.palette.text.primary,
//           }}
//         >
//           {title}
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             color: theme.palette.text.secondary,
//             maxWidth: "400px",
//             mb: action ? 3 : 0,
//           }}
//         >
//           {description}
//         </Typography>

//         {action && action}
//       </Box>
//     </motion.div>
//   )
// }

// export default EmptyState
