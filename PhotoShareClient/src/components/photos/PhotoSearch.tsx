import React from "react";
import { TextField, useTheme } from "@mui/material";

interface PhotoSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PhotoSearch: React.FC<PhotoSearchProps> = ({ searchTerm, setSearchTerm }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <TextField
      label="Search Photos"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ 
        mb: 3,
        ...(isDarkMode && {
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.paper,
          }
        })
      }}
    />
  );
};

export default PhotoSearch;