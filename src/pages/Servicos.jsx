import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Chip,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  MyLocation as MyLocationIcon,
  DirectionsBus as BusIcon,
} from '@mui/icons-material';
import BottomNav from '../components/BottomNav';
import ServicoCard from '../components/ServicoCard';
import servicoService from '../services/servicoService';
import totemService from '../services/totemService';
import LoadingScreen from '../components/LoadingScreen';

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [servicosFiltrados, setServicosFiltrados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [totens, setTotens] = useState([]);
  const [totemSelecionado, setTotemSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [estatisticas, setEstatisticas] = useState(null);
  const [raioKm, setRaioKm] = useState(5);

  useEffect(() => {
    carregarTotens();
  }, []);

  useEffect(() => {
    if (totemSelecionado) {
      carregarServicos();
    }
  }, [totemSelecionado]);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroTipo, busca, servicos]);

  const carregarTotens = async () => {
    setLoading(true);
    try {
      const totensData = await totemService.listarTotens();
      setTotens(totensData);

      // Se houver totens, selecionar o primeiro (Suassuna - Senac)
      if (totensData && totensData.length > 0) {
        setTotemSelecionado(totensData[0]);
      }
    } catch (err) {
      console.error('Erro ao carregar totens:', err);
      setError('Não foi possível carregar os totens.');

      // Totem mock para desenvolvimento (Suassuna - Senac)
      const totemMock = {
        totem_id: 'totem_suassuna_001',
        nome: 'Parada Suassuna - Senac',
        localizacao: 'Av. Visconde de Suassuna, próximo ao Senac',
        latitude: -8.0476,
        longitude: -34.8770,
        ativo: true
      };
      setTotens([totemMock]);
      setTotemSelecionado(totemMock);
    } finally {
      setLoading(false);
    }
  };

  const carregarServicos = async () => {
    if (!totemSelecionado) return;

    setLoading(true);
    setError(null);

    try {
      // Carregar serviços próximos ao totem selecionado
      const servicosData = await servicoService.buscarProximosTotem(
        totemSelecionado.totem_id,
        raioKm
      );
      setServicos(servicosData);
      setServicosFiltrados(servicosData);

      // Carregar tipos disponíveis
      const tiposData = await servicoService.listarTipos();
      setTipos(tiposData);

      // Carregar estatísticas
      const statsData = await servicoService.obterEstatisticas();
      setEstatisticas(statsData);

    } catch (err) {
      console.error('Erro ao carregar serviços:', err);
      setError('Não foi possível carregar os serviços. Tente novamente mais tarde.');

      // Dados mockados dos serviços públicos próximos ao Senac
      const servicosMock = [
        {
          servico_id: 'deam_1',
          nome: 'Delegacia Especializada de Atendimento à Mulher (1ª DEAM)',
          tipo: 'Segurança',
          endereco: 'Rua do Pombal, Praça do Campo Santo, s/n - Santo Amaro',
          telefone: '(81) 3184-3356 / 3184-3359',
          descricao: 'Atendimento especializado à mulher',
          horario: 'Segunda a sexta 8h-18h',
          latitude: -8.0478,
          longitude: -34.8780,
          distancia_km: 0.3,
          ativo: true
        },
        {
          servico_id: 'deleg_cyber',
          nome: 'Delegacia de Repressão aos Crimes Cibernéticos',
          tipo: 'Segurança',
          endereco: 'Rua Gervásio Pires, 863 - Santo Amaro',
          telefone: 'Não informado',
          descricao: 'Crimes virtuais',
          horario: 'Segunda a sexta 8h-18h; Sábado e domingo 8h-16h',
          latitude: -8.0480,
          longitude: -34.8775,
          distancia_km: 0.4,
          ativo: true
        },
        {
          servico_id: 'deleg_estel',
          nome: 'Delegacia de Repressão ao Estelionato',
          tipo: 'Segurança',
          endereco: 'Av. Visconde de Suassuna - Santo Amaro',
          telefone: 'Não informado',
          descricao: 'Crimes patrimoniais',
          horario: 'Segunda a sexta 8h-18h',
          latitude: -8.0475,
          longitude: -34.8772,
          distancia_km: 0.2,
          ativo: true
        },
        {
          servico_id: 'policlinica',
          nome: 'Policlínica Waldemar de Oliveira',
          tipo: 'Saúde',
          endereco: 'R. do Pombal, 115 - Santo Amaro, Recife - PE, 50100-170',
          telefone: 'Não informado',
          descricao: 'Atendimento de saúde',
          horario: 'Segunda a sexta 8h-16h',
          latitude: -8.0479,
          longitude: -34.8781,
          distancia_km: 0.35,
          ativo: true
        },
        {
          servico_id: 'inss',
          nome: 'Gerência Executiva do INSS em Recife',
          tipo: 'Assistência Social',
          endereco: 'Av. Mário Melo, 343 - Santo Amaro, Recife - PE, 50040-010',
          telefone: 'Não informado',
          descricao: 'Serviços previdenciários',
          horario: 'Segunda a sexta 7h-17h',
          latitude: -8.0482,
          longitude: -34.8790,
          distancia_km: 0.5,
          ativo: true
        },
        {
          servico_id: 'crp',
          nome: 'Conselho Regional de Psicologia de Pernambuco - 2ª Região',
          tipo: 'Assistência Social',
          endereco: 'R. Treze de Maio, 47 - Santo Amaro, Recife - PE, 50100-160',
          telefone: 'Não informado',
          descricao: 'Atendimento psicológico',
          horario: 'Segunda a sexta 8h-16h',
          latitude: -8.0477,
          longitude: -34.8773,
          distancia_km: 0.25,
          ativo: true
        },
        {
          servico_id: 'ideres',
          nome: 'IDERES - Instituto de Desenvolvimento e Reintegração Social',
          tipo: 'Assistência Social',
          endereco: 'Av. Visc. de Suassuna, 330 - sala 2 - Santo Amaro, Recife - PE, 50050-540',
          telefone: 'Não informado',
          descricao: 'Reintegração social',
          horario: 'Segunda a sexta 9h-18h',
          latitude: -8.0474,
          longitude: -34.8771,
          distancia_km: 0.18,
          ativo: true
        },
        {
          servico_id: 'centro_pop',
          nome: 'Centro POP Glória',
          tipo: 'Assistência Social',
          endereco: 'R. do Sossego, 565 - Santo Amaro, Recife - PE, 52120-092',
          telefone: 'Não informado',
          descricao: 'Atendimento à população em situação de rua',
          horario: 'Segunda a sexta 8h-17h',
          latitude: -8.0490,
          longitude: -34.8795,
          distancia_km: 0.7,
          ativo: true
        },
        {
          servico_id: 'mppe',
          nome: 'Ministério Público de Pernambuco',
          tipo: 'Assistência Social',
          endereco: 'Av. Visc. de Suassuna, 99 - Santo Amaro, Recife - PE, 50050-540',
          telefone: 'Não informado',
          descricao: 'Serviços do Ministério Público',
          horario: 'Segunda a sexta 8h-17h',
          latitude: -8.0473,
          longitude: -34.8770,
          distancia_km: 0.15,
          ativo: true
        },
        {
          servico_id: 'mppe_promo',
          nome: 'MPPE - Promotorias Da Capital',
          tipo: 'Assistência Social',
          endereco: '99, Av. Visc. de Suassuna, 1 - Santo Amaro, Recife - PE, 50050-540',
          telefone: 'Não informado',
          descricao: 'Promotorias de justiça',
          horario: 'Segunda a sexta 8h-18h',
          latitude: -8.0473,
          longitude: -34.8770,
          distancia_km: 0.15,
          ativo: true
        },
        {
          servico_id: 'sms_ggti',
          nome: 'SMS Recife - GGTI',
          tipo: 'Saúde',
          endereco: 'R. dos Palmares, 441 - Santo Amaro, Recife - PE, 50100-060',
          telefone: 'Não informado',
          descricao: 'Gestão em saúde',
          horario: 'Segunda a sexta 8h-17h',
          latitude: -8.0481,
          longitude: -34.8785,
          distancia_km: 0.45,
          ativo: true
        }
      ];

      setServicos(servicosMock);
      setServicosFiltrados(servicosMock);
      setTipos(['Todos', 'Saúde', 'Segurança', 'Assistência Social']);

      // Estatísticas mockadas
      setEstatisticas({
        total_servicos: servicosMock.length,
        servicos_ativos: servicosMock.length,
        tipos_disponiveis: 3
      });
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...servicos];

    // Filtro por tipo
    if (filtroTipo !== 'todos') {
      resultado = resultado.filter(s => s.tipo === filtroTipo);
    }

    // Filtro por busca
    if (busca.trim()) {
      const termoBusca = busca.toLowerCase().trim();
      resultado = resultado.filter(s =>
        s.nome.toLowerCase().includes(termoBusca) ||
        (s.endereco && s.endereco.toLowerCase().includes(termoBusca)) ||
        (s.descricao && s.descricao.toLowerCase().includes(termoBusca))
      );
    }

    setServicosFiltrados(resultado);
  };

  const buscarProximosNovamente = async (novoRaio) => {
    if (!totemSelecionado) return;

    setRaioKm(novoRaio);
    setLoading(true);
    try {
      const servicosData = await servicoService.buscarProximosTotem(
        totemSelecionado.totem_id,
        novoRaio
      );
      setServicos(servicosData);
      setServicosFiltrados(servicosData);
    } catch (err) {
      setError('Erro ao buscar serviços próximos');
    } finally {
      setLoading(false);
    }
  };

  const handleTotemChange = (event) => {
    const totemId = event.target.value;
    const totem = totens.find(t => t.totem_id === totemId);
    setTotemSelecionado(totem);
  };

  if (loading && !totemSelecionado) {
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
          Serviços Públicos
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Encontre serviços próximos ao ponto de ônibus
        </Typography>
      </Box>

      <Box sx={{ px: 2.5, pt: 2 }}>
        {/* Card de Informação do Totem/Ponto de Ônibus */}
        {totemSelecionado && (
          <Card
            sx={{
              mb: 2,
              border: '2px solid #000',
              borderRadius: '12px',
              backgroundColor: '#FFD93D',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusIcon sx={{ fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Ponto de Ônibus
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {totemSelecionado.nome}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                {totemSelecionado.localizacao}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Seletor de Totem (caso haja mais de um no futuro) */}
        {totens.length > 1 && (
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Ponto de Ônibus</InputLabel>
              <Select
                value={totemSelecionado?.totem_id || ''}
                label="Ponto de Ônibus"
                onChange={handleTotemChange}
                startAdornment={
                  <InputAdornment position="start">
                    <BusIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                }
              >
                {totens.map((totem) => (
                  <MenuItem key={totem.totem_id} value={totem.totem_id}>
                    {totem.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Estatísticas */}
        {estatisticas && (
          <Box sx={{ mb: 2, p: 2, backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-around' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
                  {estatisticas.total_servicos}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {estatisticas.servicos_ativos}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ativos
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#4ECDC4' }}>
                  {servicosFiltrados.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Próximos
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Controle de Raio */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Raio de busca</InputLabel>
            <Select
              value={raioKm}
              label="Raio de busca"
              onChange={(e) => buscarProximosNovamente(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <MyLocationIcon sx={{ fontSize: 20 }} />
                </InputAdornment>
              }
            >
              <MenuItem value={1}>1 km do ponto</MenuItem>
              <MenuItem value={2}>2 km do ponto</MenuItem>
              <MenuItem value={5}>5 km do ponto</MenuItem>
              <MenuItem value={10}>10 km do ponto</MenuItem>
              <MenuItem value={20}>20 km do ponto</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Busca */}
        <TextField
          fullWidth
          placeholder="Buscar serviço..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          sx={{ mb: 2 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filtro por Tipo */}
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="Todos"
            onClick={() => setFiltroTipo('todos')}
            sx={{
              backgroundColor: filtroTipo === 'todos' ? '#000' : '#fff',
              color: filtroTipo === 'todos' ? '#fff' : '#000',
              border: '2px solid #000',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: filtroTipo === 'todos' ? '#000' : '#f5f5f5',
              }
            }}
          />
          {tipos.map((tipo) => (
            <Chip
              key={tipo}
              label={tipo}
              onClick={() => setFiltroTipo(tipo)}
              sx={{
                backgroundColor: filtroTipo === tipo ? '#000' : '#fff',
                color: filtroTipo === tipo ? '#fff' : '#000',
                border: '2px solid #000',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: filtroTipo === tipo ? '#000' : '#f5f5f5',
                }
              }}
            />
          ))}
        </Box>

        {/* Erro */}
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && servicos.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Contador de Resultados */}
        {!loading && (
          <Typography variant="body2" sx={{ mb: 2, color: '#666', fontWeight: 600 }}>
            {servicosFiltrados.length} {servicosFiltrados.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
            {totemSelecionado && ` próximo${servicosFiltrados.length === 1 ? '' : 's'} ao ponto ${totemSelecionado.nome}`}
          </Typography>
        )}

        {/* Lista de Serviços */}
        {servicosFiltrados.length > 0 ? (
          servicosFiltrados.map((servico) => (
            <ServicoCard key={servico.servico_id} servico={servico} />
          ))
        ) : !loading && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhum serviço encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Tente ajustar os filtros ou aumentar o raio de busca
            </Typography>
          </Box>
        )}
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Servicos;
