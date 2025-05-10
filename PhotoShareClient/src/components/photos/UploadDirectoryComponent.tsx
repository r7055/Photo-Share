// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { uploadPhoto, getDownloadUrl, addPhoto, deletePhoto } from '../slices/photoSlice';
// import { AppDispatch } from '../store/store';
// import { Box, Button, Typography, CircularProgress } from '@mui/material';
// import { useParams } from 'react-router-dom';

// interface UploadDirectoryComponentProps {
//   open: boolean;
//   onClose: () => void;
// }

// const UploadDirectoryComponent: React.FC<UploadDirectoryComponentProps> = ({ open, onClose }) => {
//   const { albumId } = useParams<{ albumId: string }>(); // חילוץ ה-albumId מה-URL
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const token = sessionStorage.getItem('token');
//   const dispatch = useDispatch<AppDispatch>();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(event.target.files || []);
//     setFiles(selectedFiles);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (files.length === 0) return;

//     setLoading(true);
//     const newImageUrls: string[] = [];

//     try {
//       for (const file of files) {
//         const fileName = file.name;

//         if (!token) {
//           throw new Error('Token is missing. Please log in again.');
//         }
//         const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file })) as { meta: { requestStatus: string }, payload: { fileName: string } };

//         if (uploadResponse.meta.requestStatus === 'fulfilled') {
//           const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }));

//           if (downloadResponse.meta.requestStatus === 'fulfilled') {
//             const downloadUrl = downloadResponse.payload as string;
//             newImageUrls.push(downloadUrl);
//             const photoData = {
//               url: downloadUrl,
//               size: file.size,
//               albumId: albumId || '',
//               name: fileName,
//             };
//             await dispatch(addPhoto({ token, photo: photoData }));
//           } else {
//             await dispatch(deletePhoto({ token, id: Number((uploadResponse.payload as { fileName: string }).fileName) }));
//           }
//         }
//       }
//       setImageUrls(newImageUrls);
//     } catch (error) {
//       console.error('Upload process failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (!open) return null;

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto', background: 'linear-gradient(90deg, #1a1f36, #252a4b)', borderRadius: '8px' }}>
//       <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>Upload Directory</Typography>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
//         <input
//           type="file"
//           webkitdirectory="true"
//           onChange={handleFileChange}
//           required
//           multiple
//           style={{ marginBottom: '10px', display: 'none' }}
//           id="file-upload"
//         />
//         <label htmlFor="file-upload">
//           <Button variant="contained" component="span" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white', marginBottom: '10px' }}>
//             Choose Files
//           </Button>
//         </label>
//         <Button type="submit" disabled={loading} variant="contained" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white' }}>
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Files'}
//         </Button>
//       </form>
//       {imageUrls.length > 0 && (
//         <Box sx={{ marginTop: '20px' }}>
//           <Typography variant="h6" sx={{ color: 'white' }}>Uploaded Images:</Typography>
//           {imageUrls.map((url, index) => (
//             <img key={index} src={url} alt={`Uploaded ${index}`} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', margin: '5px' }} />
//           ))}
//         </Box>
//       )}
//       <Button
//         onClick={onClose}
//         variant="contained"
//         sx={{
//           background: 'linear-gradient(100deg,#00ffff,#1709b7,#d400ff)',
//           color: 'white',
//           marginTop: '20px',
//           '&:hover': {
//             background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
//           },
//           borderRadius: '8px',
//           padding: '10px 20px',
//           fontWeight: 'bold', 
//         }}
//       >
//         סגור
//       </Button>
//     </Box>
//   );
// };

// export default UploadDirectoryComponent;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPhoto } from '../../slices/photoSlice';
import { AppDispatch } from '../../store/store';
import { Box, Button, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface UploadDirectoryComponentProps {
  open: boolean;
  onClose: () => void;
}

const UploadDirectoryComponent: React.FC<UploadDirectoryComponentProps> = ({ open, onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length === 0) return;

    setLoading(true);
    const newImageUrls: string[] = [];

    try {
      for (const file of files) {
        const fileName = file.name;

        if (!token) {
          throw new Error('Token is missing. Please log in again.');
        }
        const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file })) as { meta: { requestStatus: string }, payload: { fileName: string } };

        if (uploadResponse.meta.requestStatus === 'fulfilled') {
          // const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }));

          // if (downloadResponse.meta.requestStatus === 'fulfilled') {
          //   const downloadUrl = downloadResponse.payload as string;
          //   newImageUrls.push(downloadUrl);
          //   await dispatch(addPhoto({ token, photo: { url: downloadUrl, size: file.size, albumId: albumId || '', name: fileName } }));
          // } else {
          //   await dispatch(deletePhoto({
          //     token, id: ,
          //     albumId: albumId ? Number(albumId) : undefined,
          //   }));
          // }
        }
      }
      setImageUrls(newImageUrls);
    } catch (error) {
      console.error('Upload process failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)', color: 'white' }}>
        <Typography variant="h5">Upload Directory</Typography>
      </DialogTitle>
      <DialogContent sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="file"
            // webkitdirectory="true"
            onChange={handleFileChange}
            required
            multiple
            style={{ marginBottom: '10px', display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white', marginBottom: '10px' }}>
              Choose Files
            </Button>
          </label>
          <Button type="submit" disabled={loading} variant="contained" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white' }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Files'}
          </Button>
        </form>
        {imageUrls.length > 0 && (
          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Uploaded Images:</Typography>
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded ${index}`} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', margin: '5px' }} />
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: 'linear-gradient(100deg,#00ffff,#1709b7,#d400ff)',
            color: 'white',
            marginTop: '20px',
            '&:hover': {
              background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
            },
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: 'bold',
          }}
        >
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDirectoryComponent;
