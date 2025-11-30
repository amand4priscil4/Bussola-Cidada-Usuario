import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  Chip,
  TextField,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  QrCode2 as QrCodeIcon,
} from '@mui/icons-material';

const TestQRCodes = () => {
  const [urlBase, setUrlBase] = useState(window.location.origin);
  const [copiado, setCopiado] = useState(null);
  const [hashCustom, setHashCustom] = useState('');

  // Hashes de teste pré-definidos
  const hashesTest = [
    { hash: 'teste123', nome: 'Usuário Teste 1', cor: '#4ECDC4' },
    { hash: 'usuario001', nome: 'Usuário Teste 2', cor: '#FFD93D' },
    { hash: 'demo456', nome: 'Usuário Demo', cor: '#FF6B9D' },
    { hash: '40ebb86c', nome: 'Usuário Padrão', cor: '#95E1D3' },
  ];

  const copiarURL = (hash) => {
    const url = `${urlBase}/?hash=${hash}`;
    navigator.clipboard.writeText(url);
    setCopiado(hash);
    setTimeout(() => setCopiado(null), 2000);
  };

  const gerarQRCodeURL = (hash) => {
    const url = `${urlBase}/?hash=${hash}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
  };

  const abrirComHash = (hash) => {
    window.open(`${urlBase}/?hash=${hash}`, '_blank');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4, px: 2 }}>
      {/* Header */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4 }}>
        <Box
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            p: 3,
            borderRadius: '12px',
            border: '2px solid #000',
            boxShadow: '6px 6px 0px #FFD93D',
            mb: 3,
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 1 }}>
            <QrCodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            QR Codes de Teste
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Use estes QR codes para testar o sistema sem precisar do totem
          </Typography>
        </Box>

        {/* Configuração de URL Base */}
        <Card
          sx={{
            border: '2px solid #000',
            borderRadius: '12px',
            boxShadow: '4px 4px 0px #000',
            mb: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Configuração
            </Typography>
            <TextField
              fullWidth
              label="URL Base do App"
              value={urlBase}
              onChange={(e) => setUrlBase(e.target.value)}
              placeholder="https://seu-app.vercel.app"
              sx={{
                '& .MuiOutlinedInput-root': {
                  border: '2px solid #000',
                  borderRadius: '8px',
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Altere para a URL do seu deploy em produção (ex: https://seu-app.vercel.app)
            </Typography>
          </CardContent>
        </Card>

        {/* Mensagem de Sucesso */}
        {copiado && (
          <Alert severity="success" sx={{ mb: 3 }}>
            URL copiada para a área de transferência!
          </Alert>
        )}
      </Box>

      {/* Grid de QR Codes */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
          {hashesTest.map((item) => (
            <Grid item xs={12} sm={6} md={6} key={item.hash}>
              <Card
                sx={{
                  border: '2px solid #000',
                  borderRadius: '12px',
                  boxShadow: '4px 4px 0px #000',
                  '&:hover': {
                    boxShadow: '6px 6px 0px #000',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: item.cor,
                    borderBottom: '2px solid #000',
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {item.nome}
                  </Typography>
                  <Chip
                    label={`Hash: ${item.hash}`}
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: '#fff',
                      border: '1px solid #000',
                      fontWeight: 600,
                      fontFamily: 'monospace',
                    }}
                  />
                </Box>

                <CardContent>
                  {/* QR Code Image */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      p: 2,
                      backgroundColor: '#fff',
                      border: '2px solid #000',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={gerarQRCodeURL(item.hash)}
                      alt={`QR Code ${item.nome}`}
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: 'auto',
                      }}
                    />
                  </Box>

                  {/* URL */}
                  <Box
                    sx={{
                      backgroundColor: '#f5f5f5',
                      border: '2px solid #000',
                      borderRadius: '8px',
                      p: 1.5,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        wordBreak: 'break-all',
                      }}
                    >
                      {urlBase}/?hash={item.hash}
                    </Typography>
                  </Box>

                  {/* Botões */}
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CopyIcon />}
                      onClick={() => copiarURL(item.hash)}
                      sx={{
                        py: 1.5,
                        backgroundColor: '#000',
                        color: '#fff',
                        fontWeight: 600,
                        border: '2px solid #000',
                        borderRadius: '8px',
                        boxShadow: '2px 2px 0px #000',
                        '&:hover': {
                          backgroundColor: '#333',
                          boxShadow: '3px 3px 0px #000',
                        },
                      }}
                    >
                      Copiar URL
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => abrirComHash(item.hash)}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        border: '2px solid #000',
                        borderRadius: '8px',
                        color: '#000',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                          border: '2px solid #000',
                        },
                      }}
                    >
                      Testar Agora
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* QR Code Customizado */}
        <Card
          sx={{
            border: '2px solid #000',
            borderRadius: '12px',
            boxShadow: '4px 4px 0px #000',
            mt: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#95E1D3',
              borderBottom: '2px solid #000',
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Criar QR Code Customizado
            </Typography>
          </Box>

          <CardContent>
            <TextField
              fullWidth
              label="Digite um hash customizado"
              value={hashCustom}
              onChange={(e) => setHashCustom(e.target.value)}
              placeholder="meu-hash-teste"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  border: '2px solid #000',
                  borderRadius: '8px',
                }
              }}
            />

            {hashCustom && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    p: 2,
                    backgroundColor: '#fff',
                    border: '2px solid #000',
                    borderRadius: '8px',
                  }}
                >
                  <img
                    src={gerarQRCodeURL(hashCustom)}
                    alt="QR Code Customizado"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CopyIcon />}
                    onClick={() => copiarURL(hashCustom)}
                    sx={{
                      py: 1.5,
                      backgroundColor: '#000',
                      color: '#fff',
                      fontWeight: 600,
                      border: '2px solid #000',
                      borderRadius: '8px',
                      boxShadow: '2px 2px 0px #000',
                      '&:hover': {
                        backgroundColor: '#333',
                        boxShadow: '3px 3px 0px #000',
                      },
                    }}
                  >
                    Copiar URL
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => abrirComHash(hashCustom)}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      border: '2px solid #000',
                      borderRadius: '8px',
                      color: '#000',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        border: '2px solid #000',
                      },
                    }}
                  >
                    Testar Agora
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        {/* Instruções */}
        <Card
          sx={{
            border: '2px solid #000',
            borderRadius: '12px',
            boxShadow: '4px 4px 0px #000',
            mt: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#FFD93D',
              borderBottom: '2px solid #000',
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Como Usar
            </Typography>
          </Box>

          <CardContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Opção 1: Escanear QR Code</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
              1. Abra a câmera do seu celular<br />
              2. Aponte para um dos QR codes acima<br />
              3. Toque na notificação para abrir o app
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Opção 2: Copiar URL</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
              1. Clique em "Copiar URL"<br />
              2. Cole no navegador do celular ou computador<br />
              3. O app abrirá com o hash do usuário
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Opção 3: Testar Diretamente</strong>
            </Typography>
            <Typography variant="body2" sx={{ pl: 2 }}>
              Clique em "Testar Agora" para abrir o app em uma nova aba com o hash já configurado
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TestQRCodes;
