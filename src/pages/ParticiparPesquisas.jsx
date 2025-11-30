import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import BottomNav from '../components/BottomNav';
import usuarioService from '../services/usuarioService';
import LoadingScreen from '../components/LoadingScreen';

const ParticiparPesquisas = () => {
  const [pesquisasDisponiveis, setPesquisasDisponiveis] = useState([]);
  const [pesquisasRespondidas, setPesquisasRespondidas] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [votando, setVotando] = useState(null);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const userHash = localStorage.getItem('userHash') || '40ebb86c';

  useEffect(() => {
    carregarPesquisas();
  }, []);

  const carregarPesquisas = async () => {
    setLoading(true);
    setErro(null);

    try {
      // Buscar todas as perguntas disponíveis
      const perguntasResponse = await usuarioService.getPerguntas();
      const todasPerguntas = perguntasResponse.data || [];

      // Buscar interações do usuário (pesquisas já respondidas)
      const interacoesResponse = await usuarioService.getInteracoes(userHash);
      const interacoes = interacoesResponse.data || [];

      // Criar Set com IDs das pesquisas já respondidas
      const idsRespondidas = new Set(interacoes.map(i => i.pergunta_id));
      setPesquisasRespondidas(idsRespondidas);

      // Filtrar apenas pesquisas NÃO respondidas
      const pesquisasNaoRespondidas = todasPerguntas.filter(
        pergunta => !idsRespondidas.has(pergunta.pergunta_id) && pergunta.ativa !== false
      );

      setPesquisasDisponiveis(pesquisasNaoRespondidas);

    } catch (error) {
      console.error('Erro ao carregar pesquisas:', error);
      setErro('Erro ao carregar pesquisas disponíveis. Tente novamente.');

      // Dados mock para desenvolvimento
      setPesquisasDisponiveis([
        {
          pergunta_id: 'mock_1',
          texto: 'O transporte público atende suas necessidades?',
          categoria: 'Transporte',
          ativa: true,
        },
        {
          pergunta_id: 'mock_2',
          texto: 'A iluminação pública é adequada?',
          categoria: 'Segurança',
          ativa: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const responderPesquisa = async (perguntaId, resposta) => {
    setVotando(perguntaId);
    setErro(null);
    setSucesso(null);

    try {
      // Enviar resposta para a API
      await usuarioService.responderPergunta({
        vem_hash: userHash,
        pergunta_id: perguntaId,
        resposta: resposta, // 'sim' ou 'nao'
      });

      // Adicionar pontos ao usuário (10 pontos por resposta)
      await usuarioService.registrarVoto(userHash, 10);

      // Adicionar ao Set de respondidas
      setPesquisasRespondidas(prev => new Set([...prev, perguntaId]));

      // Remover da lista de disponíveis
      setPesquisasDisponiveis(prev => prev.filter(p => p.pergunta_id !== perguntaId));

      // Mostrar mensagem de sucesso
      setSucesso('Voto registrado com sucesso! +10 pontos');

      // Limpar mensagem após 3 segundos
      setTimeout(() => setSucesso(null), 3000);

    } catch (error) {
      console.error('Erro ao responder pesquisa:', error);
      setErro('Erro ao enviar sua resposta. Tente novamente.');
    } finally {
      setVotando(null);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ pb: 10, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          py: 3,
          px: 2.5,
          borderBottom: '2px solid #000',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '1.8rem', fontWeight: 700, mb: 1 }}>
          Participar de Pesquisas
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Responda pesquisas e ganhe pontos
        </Typography>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Mensagens de Feedback */}
        {sucesso && (
          <Alert severity="success" sx={{ mb: 2 }} icon={<CheckIcon />}>
            {sucesso}
          </Alert>
        )}

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {erro}
          </Alert>
        )}

        {/* Contador de Pesquisas */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip
            label={`${pesquisasDisponiveis.length} disponíveis`}
            sx={{
              fontSize: 14,
              py: 2.5,
              backgroundColor: '#4ECDC4',
              color: '#000',
              border: '2px solid #000',
              fontWeight: 600,
            }}
          />
          <Chip
            label={`${pesquisasRespondidas.size} respondidas`}
            sx={{
              fontSize: 14,
              py: 2.5,
              backgroundColor: '#10b981',
              color: '#fff',
              border: '2px solid #000',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Lista de Pesquisas Disponíveis */}
        {pesquisasDisponiveis.length === 0 ? (
          <Card sx={{ border: '2px solid #000', borderRadius: '12px' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                🎉 Parabéns!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Você respondeu todas as pesquisas disponíveis
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Volte em breve para mais pesquisas
              </Typography>
            </CardContent>
          </Card>
        ) : (
          pesquisasDisponiveis.map((pesquisa, index) => (
            <Card
              key={pesquisa.pergunta_id}
              sx={{
                mb: 2,
                border: '2px solid #000',
                borderRadius: '12px',
                boxShadow: '4px 4px 0px #000',
              }}
            >
              <CardContent>
                {/* Cabeçalho */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label={`Pesquisa ${index + 1}`}
                    size="small"
                    sx={{
                      backgroundColor: '#FFD93D',
                      color: '#000',
                      fontWeight: 600,
                      border: '1px solid #000',
                    }}
                  />
                  {pesquisa.categoria && (
                    <Chip
                      label={pesquisa.categoria}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </Box>

                {/* Pergunta */}
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    lineHeight: 1.4,
                  }}
                >
                  {pesquisa.texto}
                </Typography>

                {/* Botões de Resposta */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ThumbUpIcon />}
                    onClick={() => responderPesquisa(pesquisa.pergunta_id, 'sim')}
                    disabled={votando === pesquisa.pergunta_id}
                    sx={{
                      py: 1.5,
                      backgroundColor: '#10b981',
                      color: '#fff',
                      fontWeight: 600,
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0px #000',
                      '&:hover': {
                        backgroundColor: '#059669',
                        boxShadow: '3px 3px 0px #000',
                      },
                      '&:disabled': {
                        backgroundColor: '#d1d5db',
                        color: '#6b7280',
                      }
                    }}
                  >
                    {votando === pesquisa.pergunta_id ? <CircularProgress size={20} /> : 'Sim'}
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ThumbDownIcon />}
                    onClick={() => responderPesquisa(pesquisa.pergunta_id, 'nao')}
                    disabled={votando === pesquisa.pergunta_id}
                    sx={{
                      py: 1.5,
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      fontWeight: 600,
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0px #000',
                      '&:hover': {
                        backgroundColor: '#dc2626',
                        boxShadow: '3px 3px 0px #000',
                      },
                      '&:disabled': {
                        backgroundColor: '#d1d5db',
                        color: '#6b7280',
                      }
                    }}
                  >
                    {votando === pesquisa.pergunta_id ? <CircularProgress size={20} /> : 'Não'}
                  </Button>
                </Box>

                {/* Info de Pontos */}
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    mt: 2,
                    color: '#666',
                    fontWeight: 600,
                  }}
                >
                  +10 pontos por resposta
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      <BottomNav />
    </Box>
  );
};

export default ParticiparPesquisas;
