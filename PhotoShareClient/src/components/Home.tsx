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
//   // background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)'
//   return (
//     <div style={{ minHeight: '100vh', padding: '16px', background: 'linear-gradient(90deg, #1a1f36, #3a4276)', textAlign: 'center' }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <Slider {...settings}>
//           {images.map((image, index) => (
//             <div key={index}>
//               <img src={image} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '16px' }} />
//             </div>
//           ))}
//         </Slider>
//       </div>
//       <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>PhotoShare - ברוכים הבאים ל</Typography>
//       <Typography variant="body1" style={{ color: '#d1e0ff', marginTop: '8px' }}> AI ניהול חכם של התמונות שלך בעזרת טכנולוגיית</Typography>

//       <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
//         {[{ icon: CloudUpload, color: '#00c6ff', text: 'העלה, ארגן ושתף תמונות בצורה קלה ונוחה' },
//         { icon: FolderOpen, color: '#0072ff', text: 'ניהול אלבומים מתקדם עם אפשרויות תיוג וחיפוש חכם' },
//         { icon: Group, color: '#7209b7', text: 'זיהוי פנים אוטומטי להקצאת שמות לאנשים בתמונות' },
//         { icon: Label, color: '#d400ff', text: 'גיבוי מאובטח בענן ושמירה על הרגעים החשובים שלך' }
//         ].map((item, index) => (
//           <Grid size={{ xs: 12, sm: 6 }} key={index} display="flex" alignItems="center" justifyContent="center" style={{ color: '#ffffff' }}>
//             <item.icon style={{ color: item.color, fontSize: '50px' }} />
//             <Typography style={{ marginLeft: '8px' }}>{item.text}</Typography>
//           </Grid>
//         ))}
//       </Grid>

//       <Button
//         variant="contained"
//         style={{ marginTop: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: '#fff', padding: '12px 24px', fontSize: '18px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' }}
//         onClick={() => navigate('/auth')}
//       >
//         !התחל עכשיו ונהל את הזיכרונות שלך במקום אחד
//       </Button>
//     </div>
//   );
// }

import { Typography, Grid, Button, Box, Container, Paper } from "@mui/material"
import {
  CloudUpload,
  FolderOpen,
  Group,
  Label,
  PhotoLibrary,
  Search,
  Share,
  Security,
  Speed,
} from "@mui/icons-material"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const images = [
  "/images/891.jpg",
  "/images/Cloud-vs-Backup-qxtsl6o34aegolcqpk6a1l3w5gvmv09i6l2m982008.jpg",
  "/images/GNS-1230-x-800-פיקסל-2.jpg",
  "/images/v647.jpg",
  "/images/גיבוי-בענן-לעסקים.jpg",
  "images/אחסון-בענן-scaled.jpg",
]

const features = [
  {
    icon: CloudUpload,
    color: "#00c6ff",
    title: "Easy Upload",
    description: "Upload, organize and share photos with ease",
  },
  {
    icon: FolderOpen,
    color: "#0072ff",
    title: "Smart Albums",
    description: "Advanced album management with tagging and smart search",
  },
  {
    icon: Group,
    color: "#7209b7",
    title: "Face Recognition",
    description: "Automatic face detection to assign names to people in photos",
  },
  {
    icon: Label,
    color: "#d400ff",
    title: "Secure Backup",
    description: "Secure cloud backup to preserve your important moments",
  },
  {
    icon: PhotoLibrary,
    color: "#00c6ff",
    title: "Photo Organization",
    description: "Organize your photos by date, location, and custom categories",
  },
  {
    icon: Search,
    color: "#0072ff",
    title: "Smart Search",
    description: "Find any photo instantly with AI-powered search",
  },
  {
    icon: Share,
    color: "#7209b7",
    title: "Easy Sharing",
    description: "Share albums with friends and family with custom permissions",
  },
  {
    icon: Security,
    color: "#d400ff",
    title: "Privacy Controls",
    description: "Control who can see your photos with granular privacy settings",
  },
]

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    customPaging: () => (
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          display: "inline-block",
          transition: "all 0.3s ease",
          "&.slick-active": {
            backgroundColor: "#00c6ff",
            transform: "scale(1.2)",
          },
        }}
      />
    ),
  }

  const navigate = useNavigate()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <Container maxWidth="lg">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Box sx={{ py: 6 }}>
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                mb: 8,
              }}
            >
              <Slider {...settings}>
                {images.map((image, index) => (
                  <Box key={index} sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={image}
                      alt={`Slide ${index}`}
                      sx={{
                        width: "100%",
                        height: { xs: "300px", md: "500px" },
                        objectFit: "cover",
                        borderRadius: "24px",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(to top, rgba(26, 31, 54, 0.9), transparent 70%)",
                        borderRadius: "24px",
                      }}
                    />
                  </Box>
                ))}
              </Slider>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: { xs: 3, md: 6 },
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  }}
                >
                  Welcome to PhotoShare
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#d1e0ff",
                    mb: 3,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    maxWidth: "800px",
                  }}
                >
                  Intelligent photo management with AI technology
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/auth")}
                  startIcon={<Speed />}
                  sx={{
                    background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                    color: "#fff",
                    py: 1.5,
                    px: 4,
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 10px 25px rgba(0,0,0,0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started Now
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* Features Section */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 6,
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Powerful Features
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{xs:12, sm:6,md:3}} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: "16px",
                      background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
                      }}
                    >
                      <feature.icon sx={{ fontSize: 36, color: feature.color }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: "white", mb: 1, fontWeight: "bold" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d1e0ff", flexGrow: 1 }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                mt: 8,
                p: 6,
                borderRadius: "24px",
                background: "linear-gradient(135deg, rgba(0, 198, 255, 0.1), rgba(114, 9, 183, 0.1))",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                Ready to manage your photos smarter?
              </Typography>
              <Typography variant="h6" sx={{ color: "#d1e0ff", mb: 4, maxWidth: "800px", mx: "auto" }}>
                Join thousands of users who are already enjoying the benefits of AI-powered photo management.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/auth")}
                sx={{
                  background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                  color: "#fff",
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Start Your Free Account
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  )
}
