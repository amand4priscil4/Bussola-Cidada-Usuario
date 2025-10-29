import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import BottomNav from '../components/BottomNav';
import LoadingScreen from '../components/LoadingScreen';
import usuarioService from '../services/usuarioService';

const Ranking = () => {
  const [userData, setUserData] = useState(null);
  const [conquistas, setConquistas] = useState([]);
  const [loading, setLoading] = useState(true);

  const userHash = localStorage.getItem('userHash') || '40ebb86c';

  useEffect(() => {
    loadRankingData();
  }, []);

  const loadRankingData = async () => {
    setLoading(true);
    try {
      // Buscar dados do usuário
      const userResponse = await usuarioService.getByHash(userHash);
      const user = userResponse.data;

      setUserData({
        vem_hash: user.vem_hash,
        nome: 'Ana Silva',
        pontuacao: user.pontuacao || 0,
        nivel: Math.floor((user.pontuacao || 0) / 25) + 1,
        foto: 'https://i.pravatar.cc/150?img=47',
        posicao: 12,
      });

      // Mock de conquistas baseado na pontuação
      const todasConquistas = [
        {
          id: 1,
          nome: 'Primeira Pesquisa',
          descricao: 'Respondeu sua primeira pesquisa',
          icone: '🎯',
          desbloqueada: user.pontuacao >= 10,
          pontosNecessarios: 10,
        },
        {
          id: 2,
          nome: 'Cidadão Ativo',
          descricao: 'Respondeu 5 pesquisas',
          icone: '🏆',
          desbloqueada: user.pontuacao >= 50,
          pontosNecessarios: 50,
        },
        {
          id: 3,
          nome: 'Super Cidadão',
          descricao: 'Alcançou 100 pontos',
          icone: '⭐',
          desbloqueada: user.pontuacao >= 100,
          pontosNecessarios: 100,
        },
        {
          id: 4,
          nome: 'Especialista',
          descricao: 'Alcançou 250 pontos',
          icone: '🔥',
          desbloqueada: user.pontuacao >= 250,
          pontosNecessarios: 250,
        },
      ];

      setConquistas(todasConquistas);

    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      
      setUserData({
        nome: 'Ana Silva',
        pontuacao: 100,
        nivel: 4,
        foto: 'https://i.pravatar.cc/150?img=47',
        posicao: 12,
      });

      setConquistas([
        {
          id: 1,
          nome: 'Primeira Pesquisa',
          descricao: 'Respondeu sua primeira pesquisa',
          icone: '🎯',
          desbloqueada: true,
          pontosNecessarios: 10,
        },
        {
          id: 2,
          nome: 'Cidadão Ativo',
          descricao: 'Respondeu 5 pesquisas',
          icone: '🏆',
          desbloqueada: true,
          pontosNecessarios: 50,
        },
        {
          id: 3,
          nome: 'Super Cidadão',
          descricao: 'Alcançou 100 pontos',
          icone: '⭐',
          desbloqueada: true,
          pontosNecessarios: 100,
        },
        {
          id: 4,
          nome: 'Especialista',
          descricao: 'Alcançou 250 pontos',
          icone: '🔥',
          desbloqueada: false,
          pontosNecessarios: 250,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userData) {
    return <LoadingScreen />;
  }

  const progressoNivel = ((userData.pontuacao % 25) / 25) * 100;

  return (
    <Box sx={{ pb: 10, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header preto centralizado */}
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          py: 4,
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" sx={{ mb: 0.5, fontWeight: 700 }}>
          Ranking
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Veja sua posição e conquistas
        </Typography>
      </Box>

      {/* Conteúdo centralizado e mais largo */}
      <Box sx={{ px: 3, maxWidth: 600, mx: 'auto', width: '100%' }}>
        {/* Card do Usuário */}
        <Box sx={{ mt: 3, mb: 3 }}>
          <Card sx={{ border: '2px solid #000' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={userData.foto} sx={{ width: 60, height: 60 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3" sx={{ fontSize: 18 }}>
                    {userData.nome}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip
                      label={`Nível ${userData.nivel}`}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip
                      label={`#${userData.posicao}`}
                      size="small"
                      icon={<TrophyIcon />}
                      sx={{ fontWeight: 600, backgroundColor: '#f59e0b20', color: '#f59e0b' }}
                    />
                  </Box>
                </Box>
                <Typography variant="h2" sx={{ fontSize: 28, fontWeight: 700 }}>
                  {userData.pontuacao}
                </Typography>
              </Box>

              {/* Progresso para próximo nível */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Progresso para Nível {userData.nivel + 1}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {userData.pontuacao % 25}/{25} pts
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressoNivel}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#10b981',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Conquistas */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            🏆 Conquistas
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {conquistas.map((conquista) => (
              <Card
                key={conquista.id}
                sx={{
                  border: '2px solid #000',
                  opacity: conquista.desbloqueada ? 1 : 0.5,
                  backgroundColor: conquista.desbloqueada ? '#10b98110' : '#fff',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: 40,
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: conquista.desbloqueada ? '#10b98120' : '#f5f5f5',
                        borderRadius: 2,
                        border: '2px solid #000',
                      }}
                    >
                      {conquista.icone}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h3" sx={{ fontSize: 16, mb: 0.5 }}>
                        {conquista.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {conquista.descricao}
                      </Typography>
                      {!conquista.desbloqueada && (
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                          Faltam {conquista.pontosNecessarios - userData.pontuacao} pontos
                        </Typography>
                      )}
                    </Box>
                    {conquista.desbloqueada && (
                      <Chip
                        label="✓"
                        size="small"
                        sx={{
                          backgroundColor: '#10b981',
                          color: '#fff',
                          fontWeight: 700,
                          border: '2px solid #000',
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Ranking;