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
    <div style={{ minHeight: '100vh', padding: '16px', background: 'linear-gradient(90deg, #1a1f36, #3a4276)', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '16px' }} />
            </div>
          ))}
        </Slider>
      </div>
      <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>PhotoShare - ברוכים הבאים ל</Typography>
      <Typography variant="body1" style={{ color: '#d1e0ff', marginTop: '8px' }}> AI ניהול חכם של התמונות שלך בעזרת טכנולוגיית</Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
        {[{ icon: CloudUpload, color: '#00c6ff', text: 'העלה, ארגן ושתף תמונות בצורה קלה ונוחה' },
        { icon: FolderOpen, color: '#0072ff', text: 'ניהול אלבומים מתקדם עם אפשרויות תיוג וחיפוש חכם' },
        { icon: Group, color: '#7209b7', text: 'זיהוי פנים אוטומטי להקצאת שמות לאנשים בתמונות' },
        { icon: Label, color: '#d400ff', text: 'גיבוי מאובטח בענן ושמירה על הרגעים החשובים שלך' }
        ].map((item, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index} display="flex" alignItems="center" justifyContent="center" style={{ color: '#ffffff' }}>
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
