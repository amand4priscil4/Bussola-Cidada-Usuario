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

    if (hashFromQR) {
      // Salvar hash no localStorage
      localStorage.setItem('userHash', hashFromQR);
      // Redirecionar para Home (que vai verificar se precisa cadastro)
      navigate('/home', { replace: true });
    } else {
      // Sem hash na URL, verificar se tem no localStorage
      const savedHash = localStorage.getItem('userHash');

      if (savedHash) {
        // Tem hash salvo, ir para Home
        navigate('/home', { replace: true });
      } else {
        // Sem hash, mostrar instruções
        navigate('/instrucoes', { replace: true });
      }
    }
  }, [navigate]);

  return <LoadingScreen />;
};

export default QRHandler;
