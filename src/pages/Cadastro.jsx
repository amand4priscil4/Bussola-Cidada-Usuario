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
  Person as PersonIcon,
  Email as EmailIcon,
  Cake as CakeIcon,
} from '@mui/icons-material';
import usuarioService from '../services/usuarioService';

const Cadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data_nascimento: '',
  });

  const userHash = localStorage.getItem('userHash') || '';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErro(null);
  };

  const validarFormulario = () => {
    if (!formData.nome.trim() || formData.nome.length < 2) {
      setErro('Nome deve ter pelo menos 2 caracteres');
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErro('Email inválido');
      return false;
    }

    if (!formData.data_nascimento) {
      setErro('Data de nascimento é obrigatória');
      return false;
    }

    // Validar idade mínima (13 anos)
    const dataNascimento = new Date(formData.data_nascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (idade < 13) {
      setErro('Você deve ter pelo menos 13 anos');
      return false;
    }

    if (dataNascimento > hoje) {
      setErro('Data de nascimento não pode ser futura');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      // Completar cadastro na API
      const resultado = await usuarioService.completarCadastro({
        vem_hash: userHash,
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        data_nascimento: formData.data_nascimento,
      });

      // Salvar dados do usuário no localStorage
      localStorage.setItem('userData', JSON.stringify(resultado));

      // Redirecionar para a Home
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Erro ao completar cadastro:', error);

      if (error.response?.status === 400) {
        setErro(error.response.data.detail || 'Dados inválidos');
      } else {
        setErro('Erro ao completar cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3 },
        boxSizing: 'border-box',
      }}
    >
      <Card
        sx={{
          maxWidth: { xs: '100%', sm: 450, md: 500 },
          width: '100%',
          border: '2px solid #000',
          borderRadius: '12px',
          boxShadow: { xs: '4px 4px 0px #000', sm: '6px 6px 0px #000' },
          margin: 'auto',
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
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 700,
              mb: 1
            }}
          >
            Bem-vindo!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            Complete seu cadastro para continuar
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          {erro && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {erro}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Nome */}
            <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: '0.875rem', sm: '0.9rem' }
                }}
              >
                Nome Completo *
              </Typography>
              <TextField
                fullWidth
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                disabled={loading}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: '#666' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: '2px solid #000',
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>

            {/* Email */}
            <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: '0.875rem', sm: '0.9rem' }
                }}
              >
                Email *
              </Typography>
              <TextField
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                disabled={loading}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: '#666' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: '2px solid #000',
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>

            {/* Data de Nascimento */}
            <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: '0.875rem', sm: '0.9rem' }
                }}
              >
                Data de Nascimento *
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: <CakeIcon sx={{ mr: 1, color: '#666' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: '2px solid #000',
                    borderRadius: '8px',
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Você deve ter pelo menos 13 anos
              </Typography>
            </Box>

            {/* Botão de Enviar */}
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
                'Completar Cadastro'
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
            Seus dados são protegidos e não serão compartilhados
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Cadastro;
