import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  styled
} from '@mui/material';

// Styled component for background image
const BackgroundImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: 180,
  zIndex: 1, // Ensure this stays behind the text
  opacity: 0.3, // Reduced opacity for subtle background
}));

// Styled component for trophy image
const TrophyImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  right: 24,
  height: 100,
  zIndex: 2, // Make sure the trophy appears on top of background image
}));

const Achievement = () => {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'black',
        color: '#fff',
        borderRadius: 4,
        minWidth:350,
        boxShadow: 6,
        minHeight: 220,
        p: 3,
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 3 }}>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Helping Hands
        </Typography>

        <Typography variant="body1" sx={{ mt: 1, fontWeight: 300 }}>
          🎉 Congratulations!
        </Typography>

        <Typography variant="h3" sx={{ my: 2, fontWeight: 'bold' }}>
          420.8k
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
          Total sales this month
        </Typography>

        <Button variant="contained" color="secondary">
          View Report
        </Button>
      </CardContent>

      {/* Decorative Images
      <BackgroundImg src="/images/triangle.png" alt="background graphic" />*/}
      <TrophyImg src="/images/trophy.png" alt="trophy" /> 
    </Card>
  );
};

export default Achievement;
