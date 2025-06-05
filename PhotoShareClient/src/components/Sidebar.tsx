// // import type React from "react"
// // import {
// //   Box,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Typography,
// //   Button,
// //   Drawer,
// //   useMediaQuery,
// //   useTheme,
// // } from "@mui/material"
// // import {
// //   Home,
// //   PhotoAlbum,
// //   Share,
// //   Delete,
// //   DarkMode,
// //   LightMode,
// //   AddPhotoAlternate,
// //   CreateNewFolder,
// // } from "@mui/icons-material"
// // import { useLocation, useNavigate } from "react-router-dom"
// // import { useTheme as useAppTheme } from './themeProvider';
// // import { useEffect } from "react"

// // interface SidebarProps {
// //   open: boolean
// //   onClose: () => void
// //   onOpenAddAlbum: () => void
// //   onOpenUploadPhoto: () => void
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onOpenAddAlbum, onOpenUploadPhoto }) => {
// //   const { theme, setTheme } = useAppTheme();
// //   const muiTheme = useTheme();
// //   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     console.log(`Theme changed to: ${theme}`);
// //   }, [theme]);

// //   const menuItems = [
// //     { text: "Home", icon: <Home />, path: "/" },
// //     { text: "My Albums", icon: <PhotoAlbum />, path: "/albums/0" },
// //     { text: "Shared Albums", icon: <Share />, path: "/myShares" },
// //     { text: "Shared Photo", icon: <Share />, path: "/shared-photos" },
// //     { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" }
// //   ];

// //   const isActive = (path: string) => {
// //     if (path === "/albums/0" && location.pathname.startsWith("/albums/")) {
// //       return true;
// //     }
// //     return location.pathname === path;
// //   };

// //   const handleNavigate = (path: string) => {
// //     navigate(path);
// //     if (isMobile) {
// //       onClose();
// //     }
// //   };

// //   const drawerContent = (
// //     <Box
// //       sx={{
// //         width: 250,
// //         height: "calc(100vh - 64px)", // גובה מינוס הדר
// //         background: "linear-gradient(180deg, #1a1f36, #252a4b)",
// //         color: "white",
// //         display: "flex",
// //         flexDirection: "column",
// //         overflow: "hidden", // מונע גלילה
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           p: 2,
// //           borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
// //           flexShrink: 0, // מונע התכווצות
// //         }}
// //       >
// //         <img src="/logo-blue-small.jpg" alt="PhotoShare Logo" style={{ height: "60px", marginBottom: "10px" }} />
// //         <Typography
// //           variant="h6"
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             margin: 0,
// //             padding: 0,
// //             whiteSpace: "nowrap", // מונע שבירת שורה
// //           }}
// //         >
// //           <span style={{ color: "white" }}>Photo</span>
// //           <span
// //             style={{
// //               background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
// //               backgroundClip: "text",
// //               WebkitBackgroundClip: "text",
// //               WebkitTextFillColor: "transparent",
// //               fontWeight: "bold",
// //               fontSize: "30px",
// //               display: "inline-block",
// //             }}
// //           >
// //             Share
// //           </span>
// //         </Typography>
// //         <Typography variant="subtitle2" sx={{ color: "#d1e0ff", mb: 2 }}>
// //           my moment
// //         </Typography>
// //       </Box>

// //       <Box sx={{ p: 2, flexShrink: 0 }}>
// //         <Button
// //           variant="contained"
// //           fullWidth
// //           startIcon={<CreateNewFolder />}
// //           onClick={onOpenAddAlbum}
// //           sx={{
// //             mb: 2,
// //             background: "linear-gradient(135deg, #00c6ff, #0072ff)",
// //             color: "white",
// //             "&:hover": {
// //               background: "linear-gradient(135deg, #0072ff, #00c6ff)",
// //             },
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           New Album
// //         </Button>

// //         <Button
// //           variant="contained"
// //           fullWidth
// //           startIcon={<AddPhotoAlternate />}
// //           onClick={onOpenUploadPhoto}
// //           sx={{
// //             mb: 3,
// //             background: "linear-gradient(135deg, #7209b7, #d400ff)",
// //             color: "white",
// //             "&:hover": {
// //               background: "linear-gradient(135deg, #d400ff, #7209b7)",
// //             },
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           Upload Photo
// //         </Button>
// //       </Box>

// //       <List sx={{ 
// //         p: 2, 
// //         flexGrow: 1, 
// //         overflowY: "auto", 
// //         overflowX: "hidden",
// //         "&::-webkit-scrollbar": {
// //           width: "6px",
// //         },
// //         "&::-webkit-scrollbar-track": {
// //           background: "rgba(255, 255, 255, 0.1)",
// //         },
// //         "&::-webkit-scrollbar-thumb": {
// //           background: "rgba(255, 255, 255, 0.3)",
// //           borderRadius: "3px",
// //         },
// //       }}>
// //         {menuItems.map((item) => (
// //           <ListItem
// //             component="button"
// //             key={item.text}
// //             onClick={() => handleNavigate(item.path)}
// //             sx={{
// //               mb: 1,
// //               borderRadius: "8px",
// //               backgroundColor: isActive(item.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
// //               "&:hover": {
// //                 backgroundColor: "rgba(255, 255, 255, 0.05)",
// //               },
// //               border: 'none',
// //               cursor: 'pointer',
// //               width: '100%',
// //               textAlign: 'left',
// //               padding: '8px 12px',
// //               minHeight: '48px',
// //             }}
// //           >
// //             <ListItemIcon sx={{ 
// //               color: isActive(item.path) ? "#00c6ff" : "white", 
// //               minWidth: 40,
// //               flexShrink: 0,
// //             }}>
// //               {item.icon}
// //             </ListItemIcon>
// //             <ListItemText
// //               primary={item.text}
// //               primaryTypographyProps={{
// //                 fontWeight: isActive(item.path) ? "bold" : "normal",
// //                 color: isActive(item.path) ? "#00c6ff" : "white",
// //                 whiteSpace: "nowrap",
// //                 overflow: "hidden",
// //                 textOverflow: "ellipsis",
// //               }}
// //             />
// //           </ListItem>
// //         ))}
// //       </List>

// //       <Box
// //         sx={{
// //           mt: "auto",
// //           p: 2,
// //           borderTop: "1px solid rgba(255, 255, 255, 0.1)",
// //           display: "flex",
// //           justifyContent: "center",
// //           flexShrink: 0,
// //         }}
// //       >
// //         <Button
// //           variant="contained"
// //           startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
// //           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// //           sx={{
// //             width: "100%",
// //             background: "rgba(255, 255, 255, 0.1)",
// //             color: "white",
// //             "&:hover": {
// //               background: "rgba(255, 255, 255, 0.2)",
// //             },
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           {theme === "dark" ? "Light Mode" : "Dark Mode"}
// //         </Button>
// //       </Box>
// //     </Box>
// //   );

// //   return (
// //     <Drawer
// //       variant={isMobile ? "temporary" : "persistent"}
// //       open={open}
// //       onClose={onClose}
// //       sx={{
// //         width: open ? 250 : 0,
// //         flexShrink: 0,
// //         "& .MuiDrawer-paper": {
// //           width: 250,
// //           boxSizing: "border-box",
// //           border: "none",
// //           position: "fixed",
// //           top: 64, // מתחיל מתחת להדר
// //           left: 0,
// //           height: "calc(100vh - 64px)", // גובה מינוס הדר
// //           overflow: "hidden",
// //         },
// //       }}
// //     >
// //       {drawerContent}
// //     </Drawer>
// //   );
// // }

// // export default Sidebar;



// import type React from "react"
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Button,
//   Drawer,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material"
// import {
//   Home,
//   PhotoAlbum,
//   Share,
//   Delete,
//   DarkMode,
//   LightMode,
//   AddPhotoAlternate,
//   CreateNewFolder,
// } from "@mui/icons-material"
// import { useLocation, useNavigate } from "react-router-dom"
// import { useTheme as useAppTheme } from './themeProvider';
// import { useEffect } from "react"

// interface SidebarProps {
//   open: boolean
//   onClose: () => void
//   onOpenAddAlbum: () => void
//   onOpenUploadPhoto: () => void
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onOpenAddAlbum, onOpenUploadPhoto }) => {
//   const { theme, setTheme } = useAppTheme();
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(`Theme changed to: ${theme}`);
//   }, [theme]);

//   const menuItems = [
//     { text: "Home", icon: <Home />, path: "/" },
//     { text: "My Albums", icon: <PhotoAlbum />, path: "/albums/0" },
//     { text: "Shared Albums", icon: <Share />, path: "/myShares" },
//     { text: "Shared Photo", icon: <Share />, path: "/shared-photos" },
//     { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" }
//   ];

//   const isActive = (path: string) => {
//     if (path === "/albums/0" && location.pathname.startsWith("/albums/")) {
//       return true;
//     }
//     return location.pathname === path;
//   };

//   const handleNavigate = (path: string) => {
//     navigate(path);
//     if (isMobile) {
//       onClose();
//     }
//   };

//   const drawerContent = (
//     <Box
//       sx={{
//         width: 250,
//         height: "100%",
//         background: "linear-gradient(180deg, #1a1f36, #252a4b)",
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           p: 2,
//           borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
//         }}
//       >
//         <img src="/logo-blue-small.jpg" alt="PhotoShare Logo" style={{ height: "60px", marginBottom: "10px" }} />
//         <Typography
//           variant="h6"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             margin: 0,
//             padding: 0,
//           }}
//         >
//           <span style={{ color: "white" }}>Photo</span>
//           <span
//             style={{
//               background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontWeight: "bold",
//               fontSize: "30px",
//               display: "inline-block",
//             }}
//           >
//             Share
//           </span>
//         </Typography>
//         <Typography variant="subtitle2" sx={{ color: "#d1e0ff", mb: 2 }}>
//           my moment
//         </Typography>
//       </Box>

//       <Box sx={{ p: 2 }}>
//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<CreateNewFolder />}
//           onClick={onOpenAddAlbum}
//           sx={{
//             mb: 2,
//             background: "linear-gradient(135deg, #00c6ff, #0072ff)",
//             color: "white",
//             "&:hover": {
//               background: "linear-gradient(135deg, #0072ff, #00c6ff)",
//             },
//           }}
//         >
//           New Album
//         </Button>

//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<AddPhotoAlternate />}
//           onClick={onOpenUploadPhoto}
//           sx={{
//             mb: 3,
//             background: "linear-gradient(135deg, #7209b7, #d400ff)",
//             color: "white",
//             "&:hover": {
//               background: "linear-gradient(135deg, #d400ff, #7209b7)",
//             },
//           }}
//         >
//           Upload Photo
//         </Button>
//       </Box>

//       <List sx={{ p: 2, flexGrow: 1 }}>
//         {menuItems.map((item) => (
//           <ListItem
//             component="button"
//             key={item.text}
//             onClick={() => handleNavigate(item.path)}
//             sx={{
//               mb: 1,
//               borderRadius: "8px",
//               backgroundColor: isActive(item.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.05)",
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: isActive(item.path) ? "#00c6ff" : "white", minWidth: 40 }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.text}
//               primaryTypographyProps={{
//                 fontWeight: isActive(item.path) ? "bold" : "normal",
//                 color: isActive(item.path) ? "#00c6ff" : "white",
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>

//       <Box
//         sx={{
//           mt: "auto",
//           p: 2,
//           borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Button
//           variant="contained"
//           startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
//           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           sx={{
//             width: "100%",
//             background: "rgba(255, 255, 255, 0.1)",
//             color: "white",
//             "&:hover": {
//               background: "rgba(255, 255, 255, 0.2)",
//             },
//           }}
//         >
//           {theme === "dark" ? "Light Mode" : "Dark Mode"}
//         </Button>
//       </Box>
//     </Box>
//   );

//   return (
//     <Drawer
//       variant={isMobile ? "temporary" : "persistent"}
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: 250,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 250,
//           boxSizing: "border-box",
//           border: "none",
//         },
//       }}
//     >
//       {drawerContent}
//     </Drawer>
//   );
// }

// export default Sidebar;

import type React from "react"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Home,
  PhotoAlbum,
  Share,
  Delete,
  DarkMode,
  LightMode,
  AddPhotoAlternate,
  CreateNewFolder,
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { useTheme as useAppTheme } from './themeProvider';
import { useEffect } from "react"

interface SidebarProps {
  open: boolean
  onClose: () => void
  onOpenAddAlbum: () => void
  onOpenUploadPhoto: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, onOpenAddAlbum, onOpenUploadPhoto }) => {
  const { theme, setTheme } = useAppTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("lg"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Theme changed to: ${theme}`);
  }, [theme]);

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "My Albums", icon: <PhotoAlbum />, path: "/albums/0" },
    { text: "Shared Albums", icon: <Share />, path: "/myShares" },
    { text: "Shared Photo", icon: <Share />, path: "/shared-photos" },
    { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" }
  ];

  const isActive = (path: string) => {
    if (path === "/albums/0" && location.pathname.startsWith("/albums/")) {
      return true;
    }
    return location.pathname === path;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: "100%",
        background: 'transparent',
        color: theme === "dark" ? "white" : "#1e293b",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Action Buttons */}
      <Box sx={{ p: 3, flexShrink: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<CreateNewFolder />}
          onClick={onOpenAddAlbum}
          sx={{
            mb: 2,
            background: theme === "dark" 
              ? "linear-gradient(135deg, #00c6ff, #0072ff)"
              : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            color: "white",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: theme === "dark"
              ? "0 4px 15px rgba(0, 198, 255, 0.3)"
              : "0 4px 15px rgba(59, 130, 246, 0.3)",
            "&:hover": {
              background: theme === "dark"
                ? "linear-gradient(135deg, #0072ff, #00c6ff)"
                : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              transform: "translateY(-1px)",
              boxShadow: theme === "dark"
                ? "0 6px 20px rgba(0, 198, 255, 0.4)"
                : "0 6px 20px rgba(59, 130, 246, 0.4)",
            },
            transition: "all 0.2s ease-in-out",
            whiteSpace: "nowrap",
          }}
        >
          New Album
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<AddPhotoAlternate />}
          onClick={onOpenUploadPhoto}
          sx={{
            mb: 2,
            background: theme === "dark"
              ? "linear-gradient(135deg, #7209b7, #d400ff)"
              : "linear-gradient(135deg, #8b5cf6, #a855f7)",
            color: "white",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: theme === "dark"
              ? "0 4px 15px rgba(212, 0, 255, 0.3)"
              : "0 4px 15px rgba(139, 92, 246, 0.3)",
            "&:hover": {
              background: theme === "dark"
                ? "linear-gradient(135deg, #d400ff, #7209b7)"
                : "linear-gradient(135deg, #a855f7, #8b5cf6)",
              transform: "translateY(-1px)",
              boxShadow: theme === "dark"
                ? "0 6px 20px rgba(212, 0, 255, 0.4)"
                : "0 6px 20px rgba(139, 92, 246, 0.4)",
            },
            transition: "all 0.2s ease-in-out",
            whiteSpace: "nowrap",
          }}
        >
          Upload Photo
        </Button>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ 
        px: 2, 
        flexGrow: 1, 
        overflowY: "auto", 
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
          borderRadius: "3px",
          "&:hover": {
            background: theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
          },
        },
      }}>
        {menuItems.map((item) => (
          <ListItem
            component="button"
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              backgroundColor: isActive(item.path) 
                ? theme === "dark" 
                  ? "rgba(0, 198, 255, 0.15)" 
                  : "rgba(59, 130, 246, 0.15)"
                : "transparent",
              border: isActive(item.path) 
                ? theme === "dark"
                  ? "1px solid rgba(0, 198, 255, 0.3)"
                  : "1px solid rgba(59, 130, 246, 0.3)"
                : "1px solid transparent",
              "&:hover": {
                backgroundColor: theme === "dark" 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "rgba(0, 0, 0, 0.05)",
                transform: "translateX(4px)",
              },
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              minHeight: '52px',
              transition: "all 0.2s ease-in-out",
            }}
          >
            <ListItemIcon
             sx={{ 
              color: isActive(item.path) 
                ? theme === "dark" ? "#00c6ff" : "#3b82f6"
                : theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "#64748b", 
              minWidth: 40,
              flexShrink: 0,
            }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 600 : 500,
                color: isActive(item.path) 
                  ? theme === "dark" ? "#00c6ff" : "#3b82f6"
                  : theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "#374151",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "0.95rem",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: "auto",
          p: 3,
          borderTop: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Button
          variant="outlined"
          startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          sx={{
            width: "100%",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            border: `2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
            color: theme === "dark" ? "white" : "#374151",
            "&:hover": {
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              border: `2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"}`,
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease-in-out",
            whiteSpace: "nowrap",
          }}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;