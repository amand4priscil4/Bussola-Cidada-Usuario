import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';
import LoadingScreen from '../components/LoadingScreen';

/**
 * Componente que lida com o redirecionamento do QR Code
 * Fluxo: QR Code → URL com hash → verifica se tem hash → redireciona
 */
const QRHandler = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Pegar hash da URL (vem do QR code escaneado)
    const urlParams = new URLSearchParams(window.location.search);
    let hashFromQR = urlParams.get('hash');

    // Se não encontrou na query string, verificar se o pathname é um hash válido
    // (ex: /8bf6fd03 em vez de /?hash=8bf6fd03)
    if (!hashFromQR && window.location.pathname !== '/') {
      const pathname = window.location.pathname.slice(1); // Remove a barra inicial
      // Verificar se o pathname parece ser um hash (8 caracteres alfanuméricos)
      if (/^[a-f0-9]{8}$/i.test(pathname)) {
        hashFromQR = pathname;
        console.log('QRHandler - Hash encontrado no pathname:', hashFromQR);
      }
    }

    console.log('QRHandler - Hash da URL:', hashFromQR);
    console.log('QRHandler - URL completa:', window.location.href);
    console.log('QRHandler - Pathname:', window.location.pathname);

    if (hashFromQR) {
      // Redirecionar para Home passando o hash na URL como query parameter
      navigate(`/home?hash=${hashFromQR}`, { replace: true });
    } else {
      // Sem hash na URL, mostrar instruções
      console.log('QRHandler - Sem hash, mostrando instruções');
      setChecking(false);
    }
  }, [navigate]);

  // Se está verificando, mostrar loading
  if (checking) {
    return <LoadingScreen />;
  }

  // Se não há hash, mostrar instruções
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          border: '2px solid #000',
          borderRadius: '12px',
          boxShadow: '6px 6px 0px #000',
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box
            component="img"
            src="/logo_nome.png"
            alt="Bússola Cidadã"
            sx={{
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              mx: 'auto',
              mb: 3,
            }}
          />
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Bem-vindo ao Bússola Cidadã!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            Para acessar o aplicativo, escaneie o QR Code disponível no totem ou acesse através do link com o hash do seu cartão VEM.
          </Typography>
          <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
            Exemplo: /?hash=seu_hash_aqui
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QRHandler;
