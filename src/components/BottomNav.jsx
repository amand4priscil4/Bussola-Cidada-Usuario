import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Place as PlaceIcon,
} from '@mui/icons-material';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Salvar hash no localStorage quando disponível na URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('hash');
    if (hash) {
      localStorage.setItem('userHash', hash);
    }
  }, [location.search]);

  // Função para obter o hash (da URL ou do localStorage)
  const getHash = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hashFromURL = urlParams.get('hash');
    return hashFromURL || localStorage.getItem('userHash') || '';
  };

  const handleNavigateHome = () => {
    const hash = getHash();
    if (hash) {
      navigate(`/home?hash=${hash}`);
    } else {
      navigate('/home');
    }
  };

  const handleNavigateRanking = () => {
    const hash = getHash();
    if (hash) {
      navigate(`/ranking?hash=${hash}`);
    } else {
      navigate('/ranking');
    }
  };

  const handleNavigateServicos = () => {
    const hash = getHash();
    if (hash) {
      navigate(`/servicos?hash=${hash}`);
    } else {
      navigate('/servicos');
    }
  };

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
        onClick={handleNavigateRanking}
        sx={{ color: location.pathname === '/ranking' ? '#000' : '#999' }}
      >
        <TrophyIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={handleNavigateHome}
        sx={{ color: location.pathname === '/home' ? '#000' : '#999' }}
      >
        <HomeIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={handleNavigateServicos}
        sx={{ color: location.pathname === '/servicos' ? '#000' : '#999' }}
      >
        <PlaceIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={() => {
          // Fazer logout - limpar hash e redirecionar para página inicial
          localStorage.removeItem('userHash');
          navigate('/');
        }}
        sx={{ color: '#999' }}
      >
        <LogoutIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default BottomNav;