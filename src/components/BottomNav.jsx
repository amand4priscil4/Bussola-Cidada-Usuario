import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTop: '2px solid #000',
        display: 'flex',
        justifyContent: 'space-around',
        py: 2,
        zIndex: 1000,
      }}
    >
      <IconButton 
        onClick={() => navigate('/ranking')}
        sx={{ color: location.pathname === '/ranking' ? '#000' : '#999' }}
      >
        <TrophyIcon sx={{ fontSize: 32 }} />
      </IconButton>
      
      <IconButton 
        onClick={() => navigate('/')}
        sx={{ color: location.pathname === '/' ? '#000' : '#999' }}
      >
        <HomeIcon sx={{ fontSize: 32 }} />
      </IconButton>
      
      <IconButton 
        onClick={() => {
          // Limpar dados e fazer logout
          localStorage.removeItem('userHash');
          navigate('/login');
        }}
        sx={{ color: '#999' }}
      >
        <LogoutIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default BottomNav;