import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByAlbumId } from "../../slices/photoSlice";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Masonry } from "@mui/lab";
import PhotoCard from "./PhotoCard";
import PhotoSearch from "./PhotoSearch";
import type { AppDispatch } from "../../store/store";
import type { Photo } from "../../types/photo";
import PhotoLightbox from "./PhotoLightBox";
import { red } from "@mui/material/colors";



const PhotoGallery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { photos, loading } = useSelector(
    (state: { photo: { photos: Photo[]; loading: boolean } }) => state.photo
  );
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
 const { albumId } = useParams<{ albumId: string }>();


  useEffect(() => {
    if (token && albumId !== undefined) {
      dispatch(getPhotosByAlbumId({ token, albumId: Number(albumId) }));
    } else {
      navigate("/auth");
    }
  }, [dispatch, token, albumId, navigate]);

  const handleOpenLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  const handleDeletePhoto = (_: number) => {
    // לוגיקה למחיקת התמונה
    handleCloseLightbox();
  };

  if (loading) {
    return (
      <Box sx={{ mt: 4 }}>
        {/* ניתן להוסיף קוד לסקלטון כאן */}
      </Box>
    );
  }

  const filteredPhotos = photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "rgba(63, 81, 181, 0.9)" }}>
          Photos
        </Typography>
        <Box>
          <PhotoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>
      </Box>

      {filteredPhotos.length === 0 ? (
        <Box>
          <Typography variant="h6" sx={{ color: "rgba(63, 81, 181, 0.9)" }}>No photos in this album</Typography>
        </Box>
      ) : (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onOpenLightbox={handleOpenLightbox} />
          ))}
        </Masonry>
      )}

      <PhotoLightbox open={openLightbox} photo={selectedPhoto} onClose={handleCloseLightbox} onDelete={handleDeletePhoto} />
    </Box>
  );
};

export default PhotoGallery;
