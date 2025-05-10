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
import { uploadPhoto, getDownloadUrl, addPhoto } from '../../slices/photoSlice';
import { AppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';



const AddPhotoComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem('token');
  const { albumId } = useParams<{ albumId: string }>();


  const dispatch = useDispatch<AppDispatch>();

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    const fileName = file.name;

    try {
      // 1. Upload photo to AWS
      if (!token) {
        throw new Error('Token is null. Cannot upload photo.');
      }
      const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file }));

      if (uploadResponse.meta.requestStatus === 'fulfilled') {
        // 2. Get the download URL
        
        if (!token) {
          throw new Error('Token is null. Cannot get download URL.');
        }
        const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }));

        if (downloadResponse.meta.requestStatus === 'fulfilled') {
          const downloadUrl = downloadResponse.payload as string;

          // 3. Add photo to the database
          const photoData = {
            url: downloadUrl,
            size: file.size,
            albumId: Number(albumId) || 0,
            name: fileName,
          };
          if (token) {
            await dispatch(addPhoto({ token, photo: photoData }));
          } else {
            console.error('Token is null. Cannot add photo.');
          }

          // Handle success (e.g., show a success message)
        } else {
          // If getting download URL failed, delete the uploaded photo
          if(token){
            // const uploadPayload = uploadResponse.payload as ;
            // await dispatch(deletePhoto({ token, id: Number(uploadPayload.fileName) }));
          }
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
