import React from "react";
import { TextField } from "@mui/material";

interface PhotoSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PhotoSearch: React.FC<PhotoSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search Photos"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mb: 3 }}
    />
  );
};

export default PhotoSearch;
