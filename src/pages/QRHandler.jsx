import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

/**
 * Componente que lida com o redirecionamento do QR Code
 * Fluxo: QR Code → URL com hash → verifica se tem hash → redireciona
 */
const QRHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Pegar hash da URL (vem do QR code escaneado)
    const urlParams = new URLSearchParams(window.location.search);
    const hashFromQR = urlParams.get('hash');

    console.log('QRHandler - Hash da URL:', hashFromQR);
    console.log('QRHandler - URL completa:', window.location.href);

    if (hashFromQR) {
      // Redirecionar para Home passando o hash na URL
      navigate(`/home?hash=${hashFromQR}`, { replace: true });
    } else {
      // Sem hash na URL, redirecionar para página inicial
      console.log('QRHandler - Sem hash, indo para página inicial');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <LoadingScreen />;
};

export default QRHandler;
