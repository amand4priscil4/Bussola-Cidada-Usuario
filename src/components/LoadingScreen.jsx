import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 3,
        zIndex: 9999,
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="/logo.png"
        alt="Bússola Cidadã"
        sx={{
          width: 120,
          height: 120,
          objectFit: 'contain',
          animation: 'bounce 1.5s ease-in-out infinite',
          '@keyframes bounce': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-20px)',
            },
          },
        }}
      />

      {/* Nome do App */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: '#000',
          textAlign: 'center',
        }}
      >
        Bússola Cidadã
      </Typography>

      {/* Texto Aguarde */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress 
          size={24} 
          sx={{ color: '#000' }}
        />
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            fontWeight: 500,
          }}
        >
          Aguarde...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;