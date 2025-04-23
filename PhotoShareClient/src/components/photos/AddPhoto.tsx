// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
// import { CloudUpload } from '@mui/icons-material';
// import { Photo } from '../types/photo';

// interface AddPhotoProps {
//   albumId: number;
// }

// const AddPhoto: React.FC<AddPhotoProps> = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm<Photo>();

//   const onSubmit = (data: Photo) => {
//     console.log(data);
//     // Add your submit logic here
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         padding: '16px',
//         backgroundColor: '#f0f2f5',
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         הוספת תמונה
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Controller
//           name="url"
//           control={control}
//           defaultValue=""
//           rules={{ required: "URL is required" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="URL"
//               error={!!errors.url}
//               helperText={errors.url ? errors.url.message : ''}
//               required
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//           )}
//         />
//         <Controller
//           name="tags"
//           control={control}
//           defaultValue=""
//           rules={{ required: "Tags are required" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Tags"
//               error={!!errors.tags}
//               helperText={errors.tags ? errors.tags.message : ''}
//               required
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//           )}
//         />
//         <Controller
//           name="date"
//           control={control}
//           defaultValue=""
//           rules={{ required: "Date is required" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.date}
//               helperText={errors.date ? errors.date.message : ''}
//               required
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//           )}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           startIcon={<CloudUpload />}
//           sx={{ marginTop: 2 }}
//         >
//           הוסף תמונה
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default AddPhoto;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPhoto, getDownloadUrl, addPhoto, deletePhoto } from '../slices/photoSlice';
import { AppDispatch } from '../../store/store';



const AddPhotoComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem('token');

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    const fileName = file.name;

    try {
      // 1. Upload photo to AWS
      const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file }));

      if (uploadResponse.meta.requestStatus === 'fulfilled') {
        // 2. Get the download URL
        const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }));

        if (downloadResponse.meta.requestStatus === 'fulfilled') {
          const downloadUrl = downloadResponse.payload;

          // 3. Add photo to the database
          const photoData = {
            url: downloadUrl,
            size: file.size,
            albumId: parentId.toString(),
            name: fileName,
          };
          await dispatch(addPhoto({ token, photo: photoData }));

          // Handle success (e.g., show a success message)
        } else {
          // If getting download URL failed, delete the uploaded photo
          await dispatch(deletePhoto({ token, id: uploadResponse.payload.fileName }));
          // Handle error (e.g., show an error message)
        }
      }
    } catch (error) {
      console.error('Upload process failed:', error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Photo'}
      </button>
    </form>
  );
};

export default AddPhotoComponent;
