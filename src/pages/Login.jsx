import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  QrCode2 as QrCodeIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import usuarioService from '../services/usuarioService';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [hashInput, setHashInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    if (!hashInput.trim()) {
      setErro('Digite seu código de acesso');
      return;
    }

    setLoading(true);

    try {
      // Verificar se o usuário existe
      const user = await usuarioService.verificarUsuario(hashInput.trim());

      // Salvar hash no localStorage
      localStorage.setItem('userHash', hashInput.trim());

      // Verificar se o cadastro está completo
      const cadastroCompleto = user.nome && user.email && user.cadastro_completo;

      if (!cadastroCompleto) {
        // Se não está completo, redirecionar para cadastro
        navigate('/cadastro');
      } else {
        // Se está completo, ir para Home
        navigate('/home');
      }

    } catch (error) {
      console.error('Erro ao fazer login:', error);

      if (error.response?.status === 404) {
        setErro('Código não encontrado. Verifique se você já escaneou o QR code no totem.');
      } else {
        setErro('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: { xs: 2, sm: 3 },
        paddingY: { xs: 2, sm: 3 },
      }}
    >
      {/* Logo acima do card */}
      <Box
        component="img"
        src="/logo_nome.png"
        alt="Bússola Cidadã"
        sx={{
          width: { xs: 200, sm: 250 },
          height: 'auto',
          mb: 3,
        }}
      />

      <Card
        sx={{
          maxWidth: { xs: 'calc(100vw - 32px)', sm: 450, md: 500 },
          width: '100%',
          border: '2px solid #000',
          borderRadius: '12px',
          boxShadow: { xs: '4px 4px 0px #000', sm: '6px 6px 0px #000' },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFD93D',
            borderBottom: '2px solid #000',
            p: { xs: 2.5, sm: 3 },
            textAlign: 'center',
          }}
        >
          <LoginIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 700,
              mb: 1
            }}
          >
            Login
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            Entre com seu código de acesso
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          {erro && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {erro}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Código de Acesso */}
            <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: '0.875rem', sm: '0.9rem' }
                }}
              >
                Código de Acesso *
              </Typography>
              <TextField
                fullWidth
                name="hash"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                placeholder="Digite seu código (ex: 40ebb86c)"
                disabled={loading}
                InputProps={{
                  startAdornment: <QrCodeIcon sx={{ mr: 1, color: '#666' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: '2px solid #000',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Você recebe esse código ao escanear o QR code no totem
              </Typography>
            </Box>

            {/* Botão de Login */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: { xs: 1.25, sm: 1.5 },
                backgroundColor: '#000',
                color: '#fff',
                fontWeight: 600,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                border: '2px solid #000',
                borderRadius: '8px',
                boxShadow: { xs: '2px 2px 0px #000', sm: '3px 3px 0px #000' },
                '&:hover': {
                  backgroundColor: '#333',
                  boxShadow: { xs: '3px 3px 0px #000', sm: '4px 4px 0px #000' },
                },
                '&:disabled': {
                  backgroundColor: '#d1d5db',
                  color: '#6b7280',
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Info */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: { xs: 2.5, sm: 3 },
              color: '#666',
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              px: { xs: 1, sm: 0 }
            }}
          >
            Escaneie o QR code no totem para obter seu código
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
