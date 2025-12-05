import { Box, Typography, Card, CardContent } from '@mui/material';
import { QrCode2 as QrCodeIcon } from '@mui/icons-material';

/**
 * Página de instruções quando não há QR code escaneado
 */
const Instrucoes = () => {
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
      {/* Logo */}
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
          <QrCodeIcon sx={{ fontSize: 60, mb: 1 }} />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 700,
              mb: 1
            }}
          >
            Bem-vindo à Bússola Cidadã!
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: 'center'
            }}
          >
            Como usar o aplicativo:
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              1. Encontre um totem da Bússola Cidadã
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ pl: 2, mb: 2 }}>
              Os totens estão localizados em pontos de ônibus pela cidade
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              2. Aproxime seu cartão VEM
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ pl: 2, mb: 2 }}>
              O totem irá identificar seu cartão e gerar um QR code
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              3. Escaneie o QR code
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ pl: 2, mb: 2 }}>
              Use a câmera do seu celular para escanear o código
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              4. Pronto!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>
              Você será direcionado automaticamente para o aplicativo
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#FFD93D',
              borderRadius: '8px',
              p: 2,
              border: '2px solid #000',
              textAlign: 'center'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              💡 Dica: Guarde este link para acessar depois!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Instrucoes;
