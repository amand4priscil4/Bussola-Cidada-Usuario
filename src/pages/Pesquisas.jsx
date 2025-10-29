import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
} from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import BottomNav from '../components/BottomNav';
import usuarioService from '../services/usuarioService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LoadingScreen from '../components/LoadingScreen';

const Pesquisas = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(true);

  const userHash = localStorage.getItem('userHash') || '40ebb86c';

  useEffect(() => {
    loadPesquisas();
  }, []);

  const loadPesquisas = async () => {
    setLoading(true);
    try {
      // Buscar interações do usuário
      const interacoesResponse = await usuarioService.getInteracoes(userHash);
      const interacoes = interacoesResponse.data || [];

      // Buscar todas as perguntas
      const perguntasResponse = await usuarioService.getPerguntas();
      const todasPerguntas = perguntasResponse.data || [];

      // Combinar dados
      const pesquisasCompletas = interacoes.map((interacao) => {
        const pergunta = todasPerguntas.find(p => p.pergunta_id === interacao.pergunta_id);
        
        return {
          id: interacao.pergunta_id,
          texto: pergunta?.texto || 'Pergunta não encontrada',
          resposta: interacao.resposta,
          data: interacao.data_criacao || interacao.created_at || new Date().toISOString(),
        };
      });

      // Ordenar por data (mais recentes primeiro)
      pesquisasCompletas.sort((a, b) => new Date(b.data) - new Date(a.data));

      setPesquisas(pesquisasCompletas);

    } catch (error) {
      console.error('Erro ao carregar pesquisas:', error);
      
      // Dados mocados em caso de erro
      setPesquisas([
        {
          id: '1',
          texto: 'Você está satisfeito com o transporte público?',
          resposta: 'sim',
          data: new Date().toISOString(),
        },
        {
          id: '2',
          texto: 'A parada de ônibus está limpa e conservada?',
          resposta: 'nao',
          data: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          texto: 'Os horários dos ônibus são respeitados?',
          resposta: 'sim',
          data: new Date(Date.now() - 172800000).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataISO) => {
    try {
      return format(new Date(dataISO), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch {
      return 'Data não disponível';
    }
  };

  if (loading || !userData) {
  return <LoadingScreen />;
}

  return (
    <Box sx={{ pb: 10, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderBottom: '2px solid #000',
          p: 2.5,
        }}
      >
        <Typography variant="h2">
          Minhas Pesquisas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Histórico de pesquisas respondidas
        </Typography>
      </Box>

      {/* Lista de Pesquisas */}
      <Box sx={{ p: 2.5 }}>
        {pesquisas.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Você ainda não respondeu nenhuma pesquisa
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <List sx={{ p: 0 }}>
            {pesquisas.map((pesquisa, index) => (
              <Box key={pesquisa.id + index}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                        Pesquisa nº {pesquisa.id.substring(0, 8)}
                      </Typography>
                      <Chip
                        label={pesquisa.resposta === 'sim' ? 'Sim' : 'Não'}
                        size="small"
                        icon={<CheckIcon />}
                        sx={{
                          backgroundColor: pesquisa.resposta === 'sim' ? '#10b98120' : '#ef444420',
                          color: pesquisa.resposta === 'sim' ? '#10b981' : '#ef4444',
                          fontWeight: 600,
                          border: 'none',
                        }}
                      />
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                      {pesquisa.texto}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Respondida em {formatarData(pesquisa.data)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </List>
        )}

        {/* Resumo */}
        {pesquisas.length > 0 && (
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip
              label={`Total: ${pesquisas.length} pesquisas`}
              sx={{ fontSize: 14, py: 2.5 }}
            />
            <Chip
              label={`Sim: ${pesquisas.filter(p => p.resposta === 'sim').length}`}
              sx={{
                fontSize: 14,
                py: 2.5,
                backgroundColor: '#10b98120',
                color: '#10b981',
              }}
            />
            <Chip
              label={`Não: ${pesquisas.filter(p => p.resposta === 'nao').length}`}
              sx={{
                fontSize: 14,
                py: 2.5,
                backgroundColor: '#ef444420',
                color: '#ef4444',
              }}
            />
          </Box>
        )}
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Pesquisas;