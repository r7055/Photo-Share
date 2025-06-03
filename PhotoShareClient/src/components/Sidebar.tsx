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
// import { useTheme as useAppTheme } from './themeProvider'; // ייבוא ההוק
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

//  useEffect(() => {
//     // ניתן להוסיف לוגיקה כאן אם צריך להגיב לשינוי ב-theme
//     console.log(`Theme changed to: ${theme}`);
//   }, [theme]); // האזנה לשינויים ב-theme

//   const menuItems = [
//     { text: "Home", icon: <Home />, path: "/" }, // ✅ תוקן - עכשיו מוביל לדף הבית
//     { text: "My Albums", icon: <PhotoAlbum />, path: "/albums/0" },
//     { text: "Shared Albums", icon: <Share />, path: "/myShares" },
//     { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" },
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
//             component="button" // ✅ תוקן - עכשיו משתמש ב-button במקום circle
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
  Typography,
  Button,
  Drawer,
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

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onOpenAddAlbum, onOpenUploadPhoto }) => {
  const { theme, setTheme } = useAppTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
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

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background: "linear-gradient(180deg, #1a1f36, #252a4b)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <img src="/logo-blue-small.jpg" alt="PhotoShare Logo" style={{ height: "60px", marginBottom: "10px" }} />
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <span style={{ color: "white" }}>Photo</span>
          <span
            style={{
              background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: "30px",
              display: "inline-block",
            }}
          >
            Share
          </span>
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#d1e0ff", mb: 2 }}>
          my moment
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<CreateNewFolder />}
          onClick={onOpenAddAlbum}
          sx={{
            mb: 2,
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #0072ff, #00c6ff)",
            },
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
            mb: 3,
            background: "linear-gradient(135deg, #7209b7, #d400ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #d400ff, #7209b7)",
            },
          }}
        >
          Upload Photo
        </Button>
      </Box>

      <List sx={{ p: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            component="button"
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: "8px",
              backgroundColor: isActive(item.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? "#00c6ff" : "white", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? "bold" : "normal",
                color: isActive(item.path) ? "#00c6ff" : "white",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          sx={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={onClose}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;
