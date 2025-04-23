// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Button, LinearProgress, Typography } from '@mui/material';
// import { CloudUpload } from '@mui/icons-material';
// import Swal from 'sweetalert2';
// import { useForm, Controller } from 'react-hook-form';

// const PhotoUploader = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm();
//   const [files, setFiles] = useState<File[]>([]);
//   const [progress, setProgress] = useState(0);
// const[urlImage,setUrlImage]=useState<string|null>(null);

//   const getImageUrl = async (fileName: string) => {
//     console.log(fileName);

//     try {
//       const response = await axios.get(`http://localhost:5141/api/download/download-url/${fileName}`);
//       console.log(response);
//       console.log(response.data);
//       console.log("URL הושג בהצלחה!");
//       setUrlImage(response.data as string);
//       return response.data;
//     } catch (error) {
//       console.error('שגיאה בהבאת ה-URL:', error);
//     }
//   };
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };

//   const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };

//   const onSubmit = async () => {
//     if (files.length === 0) return;

//     try {
//       let totalProgress = 0;
//       for (const file of files) {
//         try {
//           // שלב 1: קבלת Presigned URL מהשרת
//           const response = await axios.get('http://localhost:5141/api/upload/presigned-url', {
//             params: { fileName: file.name }
//           });

//           const presignedUrl = (response.data as { url: string }).url;
//           console.log(presignedUrl, file);
          

//           // שלב 2: העלאת הקובץ ישירות ל-S3
//           await axios.put(presignedUrl, file, {
//             headers: {
//               'Content-Type': file.type,
//             },
//             onUploadProgress: (progressEvent: ProgressEvent) => {
//               const percent = Math.round(
//                 (progressEvent.loaded * 100) / (progressEvent.total || 1)
//               );
//               totalProgress += percent / files.length;
//               setProgress(Math.round(totalProgress));
//             },

//           });
//           const url=await getImageUrl(file.name);
//           console.log(url);
//         } catch (error) {
//           console.error('שגיאה בהעלאה:', error);
//           await Swal.fire({
//             icon: 'error',
//             title: 'שגיאה בהעלאה',
//             text: `התרחשה שגיאה במהלך העלאת הקובץ ${file.name}. נסה שוב מאוחר יותר.`,
//           });
//         }
//       }

//       setProgress(100);
//       await new Promise(resolve => setTimeout(resolve, 2000)); // הצגת 100% למשך 2 שניות
//       Swal.fire({
//         icon: 'success',
//         title: 'הקבצים הועלו בהצלחה!',
//         showConfirmButton: false,
//         timer: 1500
//       });

//       setProgress(0); // איפוס פס ההתקדמות
//       setFiles([]); // איפוס הקבצים שנבחרו
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'שגיאה בהעלאה',
//         text: 'התרחשה שגיאה במהלך העלאת הקבצים. נסה שוב מאוחר יותר.',
//       });
//     }
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
//         העלאת תמונה
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Controller
//           name="file"
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <input
//               {...field}
//               accept="image/*"
//               style={{ display: 'none' }}
//               id="upload-file"
//               type="file"
//               onChange={(e) => {
//                 handleFileChange(e);
//                 field.onChange(e);
//               }}
//             />
//           )}
//         />
//         <label htmlFor="upload-file">
//           <Button
//             variant="contained"
//             color="primary"
//             component="span"
//             startIcon={<CloudUpload />}
//             sx={{ marginTop: 2 }}
//           >
//             בחר קבצים
//           </Button>
//         </label>
//         <Controller
//           name="folder"
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <input
//               {...field}
//               accept="image/*"
//               style={{ display: 'none' }}
//               id="upload-folder"
//               type="file"
//               multiple
//               webkitdirectory="true"
//               onChange={(e) => {
//                 handleFolderChange(e);
//                 field.onChange(e);
//               }}
//             />
//           )}
//         />
//         <label htmlFor="upload-folder">
//           <Button
//             variant="contained"
//             color="primary"
//             component="span"
//             startIcon={<CloudUpload />}
//             sx={{ marginTop: 2 }}
//           >
//             בחר תיקיה
//           </Button>
//         </label>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           disabled={files.length === 0}
//           startIcon={<CloudUpload />}
//           sx={{ marginTop: 2 }}
//         >
//           העלה קבצים
//         </Button>
//       </form>
//       {progress > 0 && (
//         <Box sx={{ width: '50%', marginTop: 2, textAlign: 'center', position: 'relative' }}>
//           <LinearProgress variant="determinate" value={progress} />
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             align="center"
//             sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '100%', // הרחבת השורה
//             }}
//           >
//             {progress}%
//           </Typography>
//         </Box>
//       )}
//       {urlImage && <img src={urlImage} alt="uploaded" />}
//     </Box>
//   );
// };

// export default PhotoUploader;