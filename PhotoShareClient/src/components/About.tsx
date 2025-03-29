// import { Typography, Grid, Button } from '@mui/material';
// import { CloudUpload, FolderOpen, Group, Label } from '@mui/icons-material';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from 'react-router-dom';

// const images = [
//   '/images/891.jpg',
//   '/images/Cloud-vs-Backup-qxtsl6o34aegolcqpk6a1l3w5gvmv09i6l2m982008.jpg',
//   '/images/GNS-1230-x-800-פיקסל-2.jpg',
//   '/images/v647.jpg',
//   '/images/גיבוי-בענן-לעסקים.jpg',
//   'images/אחסון-בענן-scaled.jpg'
// ];

// export default function About() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000
//   };

//   const navigate = useNavigate();

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '16px', backgroundColor: '#f0f2f5' }}>
//       <div style={{ width: '100%', maxWidth: '1200px', textAlign: 'center' }}>
//         <Slider {...settings}>
//           {images.map((image, index) => (
//             <div key={index}>
//               <img src={image} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '16px' }} />
//             </div>
//           ))}
//         </Slider>
//         <Typography variant="h4" style={{ color: '#3f51b5', fontWeight: 'bold', marginTop: '24px' }}>ברוכים הבאים ל-PhotoShare 📷</Typography>
//         <Typography variant="body1" style={{ color: '#4a5568', marginTop: '8px' }}>ניהול חכם של התמונות שלך בעזרת טכנולוגיית AI!</Typography>

//         <Grid container spacing={2} style={{ marginTop: '24px' }}>
//           <Grid item xs={12} display="flex" alignItems="center">
//             <CloudUpload style={{ color: '#4caf50', fontSize: '40px' }} />
//             <Typography style={{ marginLeft: '8px', color: '#4a5568' }}>העלה, ארגן ושתף תמונות בצורה קלה ונוחה</Typography>
//           </Grid>
//           <Grid item xs={12} display="flex" alignItems="center">
//             <FolderOpen style={{ color: '#2196f3', fontSize: '40px' }} />
//             <Typography style={{ marginLeft: '8px', color: '#4a5568' }}>ניהול אלבומים מתקדם עם אפשרויות תיוג וחיפוש חכם</Typography>
//           </Grid>
//           <Grid item xs={12} display="flex" alignItems="center">
//             <Group style={{ color: '#f44336', fontSize: '40px' }} />
//             <Typography style={{ marginLeft: '8px', color: '#4a5568' }}>זיהוי פנים אוטומטי להקצאת שמות לאנשים בתמונות</Typography>
//           </Grid>
//           <Grid item xs={12} display="flex" alignItems="center">
//             <Label style={{ color: '#ff9800', fontSize: '40px' }} />
//             <Typography style={{ marginLeft: '8px', color: '#4a5568' }}>גיבוי מאובטח בענן ושמירה על הרגעים החשובים שלך</Typography>
//           </Grid>
//         </Grid>

//         <Button 
//           variant="contained" 
//           color="primary" 
//           style={{ marginTop: '24px', fontWeight: 'bold' }} 
//           onClick={()=>navigate('/auth')}
//         >
//           !התחל עכשיו ונהל את הזיכרונות שלך במקום אחד
//         </Button>
//       </div>
//     </div>
//   );
// }
import { Typography, Grid, Button } from '@mui/material';
import { CloudUpload, FolderOpen, Group, Label } from '@mui/icons-material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const images = [
  '/images/891.jpg',
  '/images/Cloud-vs-Backup-qxtsl6o34aegolcqpk6a1l3w5gvmv09i6l2m982008.jpg',
  '/images/GNS-1230-x-800-פיקסל-2.jpg',
  '/images/v647.jpg',
  '/images/גיבוי-בענן-לעסקים.jpg',
  'images/אחסון-בענן-scaled.jpg'
];

export default function About() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const navigate = useNavigate();
  // background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)'
  return (
    <div style={{ minHeight: '100vh', padding: '16px',background: 'linear-gradient(90deg, #1a1f36, #3a4276)', textAlign: 'center' }}>
      {/* <Slider {...settings} style={{ maxWidth: '90%', margin: 'auto', borderRadius: '16px', overflow: 'hidden' }}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '16px' }} />
          </div>
        ))}
      </Slider> */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '16px' }} />
          </div>
        ))}
      </Slider>
      <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>PhotoShare - ברוכים הבאים ל</Typography>
      <Typography variant="body1" style={{ color: '#d1e0ff', marginTop: '8px' }}> AI ניהול חכם של התמונות שלך בעזרת טכנולוגיית</Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
        {[{ icon: CloudUpload, color: '#00c6ff', text: 'העלה, ארגן ושתף תמונות בצורה קלה ונוחה' },
        { icon: FolderOpen, color: '#0072ff', text: 'ניהול אלבומים מתקדם עם אפשרויות תיוג וחיפוש חכם' },
        { icon: Group, color: '#7209b7', text: 'זיהוי פנים אוטומטי להקצאת שמות לאנשים בתמונות' },
        { icon: Label, color: '#d400ff', text: 'גיבוי מאובטח בענן ושמירה על הרגעים החשובים שלך' }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} key={index} display="flex" alignItems="center" justifyContent="center" style={{ color: '#ffffff' }}>
            <item.icon style={{ color: item.color, fontSize: '50px' }} />
            <Typography style={{ marginLeft: '8px' }}>{item.text}</Typography>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        style={{ marginTop: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: '#fff', padding: '12px 24px', fontSize: '18px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' }}
        onClick={() => navigate('/auth')}
      >
        !התחל עכשיו ונהל את הזיכרונות שלך במקום אחד
      </Button>
    </div>
  );
}
