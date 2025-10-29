import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  LinearProgress,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import BottomNav from '../components/BottomNav';
import usuarioService from '../services/usuarioService';

const Ranking = () => {
  const [userData, setUserData] = useState(null);
  const [ranking, setRanking] = useState([]);
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
        posicao: 12, // Mock - calcular depois com todos os usuários
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

      // Mock de ranking (será da API depois)
      setRanking([
        { posicao: 1, nome: 'João Silva', pontuacao: 450, foto: 'https://i.pravatar.cc/150?img=12' },
        { posicao: 2, nome: 'Maria Santos', pontuacao: 380, foto: 'https://i.pravatar.cc/150?img=45' },
        { posicao: 3, nome: 'Pedro Costa', pontuacao: 320, foto: 'https://i.pravatar.cc/150?img=33' },
        { posicao: 4, nome: 'Ana Oliveira', pontuacao: 280, foto: 'https://i.pravatar.cc/150?img=20' },
        { posicao: 5, nome: 'Carlos Lima', pontuacao: 250, foto: 'https://i.pravatar.cc/150?img=51' },
      ]);

    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      
      // Dados mocados
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

      setRanking([
        { posicao: 1, nome: 'João Silva', pontuacao: 450, foto: 'https://i.pravatar.cc/150?img=12' },
        { posicao: 2, nome: 'Maria Santos', pontuacao: 380, foto: 'https://i.pravatar.cc/150?img=45' },
        { posicao: 3, nome: 'Pedro Costa', pontuacao: 320, foto: 'https://i.pravatar.cc/150?img=33' },
        { posicao: 4, nome: 'Ana Oliveira', pontuacao: 280, foto: 'https://i.pravatar.cc/150?img=20' },
        { posicao: 5, nome: 'Carlos Lima', pontuacao: 250, foto: 'https://i.pravatar.cc/150?img=51' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  const proximoNivel = (userData.nivel * 25);
  const progressoNivel = ((userData.pontuacao % 25) / 25) * 100;

  return (
    <Box sx={{ pb: 10, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          p: 2.5,
          pb: 4,
        }}
      >
        <Typography variant="h2" sx={{ mb: 1 }}>
          Ranking
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Veja sua posição e conquistas
        </Typography>
      </Box>

      {/* Card do Usuário */}
      <Box sx={{ px: 2.5, mt: -3, mb: 3 }}>
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
      <Box sx={{ px: 2.5, mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          🏆 Conquistas
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {conquistas.map((conquista) => (
            <Card
              key={conquista.id}
              sx={{
                opacity: conquista.desbloqueada ? 1 : 0.5,
                border: conquista.desbloqueada ? '2px solid #10b981' : 'none',
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
                      <Typography variant="caption" color="primary">
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
                      }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Top 5 Ranking */}
      <Box sx={{ px: 2.5, mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          🥇 Top 5 Cidadãos
        </Typography>

        <Card>
          <List sx={{ p: 0 }}>
            {ranking.map((usuario, index) => (
              <ListItem
                key={usuario.posicao}
                sx={{
                  borderBottom: index < ranking.length - 1 ? '1px solid #e0e0e0' : 'none',
                  py: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: 24,
                      fontWeight: 700,
                      width: 30,
                      color: usuario.posicao <= 3 ? '#f59e0b' : '#666',
                    }}
                  >
                    {usuario.posicao}
                  </Typography>
                  <Avatar src={usuario.foto} sx={{ width: 40, height: 40 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {usuario.nome}
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: 18, fontWeight: 700 }}>
                    {usuario.pontuacao}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Ranking;