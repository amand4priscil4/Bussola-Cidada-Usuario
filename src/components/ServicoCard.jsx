import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
  Place as PlaceIcon,
} from '@mui/icons-material';

const ServicoCard = ({ servico }) => {
  // Ícone baseado no tipo de serviço
  const getTipoColor = (tipo) => {
    const cores = {
      'Saúde': '#FF6B6B',
      'Transporte': '#4ECDC4',
      'Educação': '#FFD93D',
      'Segurança': '#6C5CE7',
      'Assistência Social': '#A8E6CF',
      'Cultura': '#FF8B94',
      'Esporte': '#95E1D3',
    };
    return cores[tipo] || '#95A5A6';
  };

  return (
    <Card
      sx={{
        mb: 2,
        border: '2px solid #000',
        borderRadius: '12px',
        boxShadow: '4px 4px 0px #000',
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s',
        }
      }}
    >
      <CardContent>
        {/* Nome e Tipo */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              flex: 1,
              mr: 1
            }}
          >
            {servico.nome}
          </Typography>
          <Chip
            label={servico.tipo}
            size="small"
            sx={{
              backgroundColor: getTipoColor(servico.tipo),
              color: '#000',
              fontWeight: 600,
              border: '2px solid #000',
            }}
          />
        </Box>

        {/* Distância (se disponível) */}
        {servico.distancia_km !== null && servico.distancia_km !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PlaceIcon sx={{ fontSize: 18, mr: 0.5, color: '#FF6B6B' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#FF6B6B' }}>
              {servico.distancia_km} km de distância
            </Typography>
          </Box>
        )}

        {/* Endereço */}
        {servico.endereco && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <LocationIcon sx={{ fontSize: 18, mr: 0.5, mt: 0.2 }} />
            <Typography variant="body2" sx={{ color: '#555' }}>
              {servico.endereco}
            </Typography>
          </Box>
        )}

        {/* Telefone */}
        {servico.telefone && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneIcon sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: '#555' }}>
              {servico.telefone}
            </Typography>
          </Box>
        )}

        {/* Horário */}
        {servico.horario_funcionamento && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ClockIcon sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: '#555' }}>
              {servico.horario_funcionamento}
            </Typography>
          </Box>
        )}

        {/* Descrição */}
        {servico.descricao && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: '#666',
              fontStyle: 'italic',
              borderLeft: '3px solid #000',
              pl: 1.5,
            }}
          >
            {servico.descricao}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicoCard;
