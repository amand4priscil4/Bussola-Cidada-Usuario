import { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import usuarioService from '../services/usuarioService';
import LoadingScreen from '../components/LoadingScreen';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [ultimaPesquisa, setUltimaPesquisa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hash do cartão RFID (vem do QR Code escaneado)
  // Fluxo: Usuário aproxima cartão → vota no totem → totem gera QR Code com hash
  // → usuário escaneia QR Code → hash é passado via URL ou localStorage
  const userHash = new URLSearchParams(window.location.search).get('hash') ||
                   localStorage.getItem('userHash');

  useEffect(() => {
    // Se não há hash, redirecionar para login
    if (!userHash) {
      navigate('/');
      return;
    }

    // Salvar hash no localStorage para manter sessão
    localStorage.setItem('userHash', userHash);
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Verificar/criar usuário automaticamente pelo hash do QR Code
      const user = await usuarioService.verificarUsuario(userHash);

      // Buscar interações do usuário
      const interacoesResponse = await usuarioService.getInteracoes(userHash);
      const interacoes = interacoesResponse.data || [];

      // Processar última pesquisa
      if (interacoes.length > 0) {
        const ultima = interacoes[0];

        // Buscar pergunta
        const perguntasResponse = await usuarioService.getPerguntas();
        const perguntas = perguntasResponse.data || [];
        const pergunta = perguntas.find(p => p.pergunta_id === ultima.pergunta_id);

        // Calcular estatísticas
        const sim = interacoes.filter(i => i.resposta === 'sim').length;
        const nao = interacoes.filter(i => i.resposta === 'nao').length;

        setUltimaPesquisa({
          id: ultima.pergunta_id?.substring(0, 5) || '00000',
          texto: pergunta?.texto || 'Pesquisa não encontrada',
          respostas: [
            { name: 'Sim', value: sim, color: '#10b981' },
            { name: 'Não', value: nao, color: '#ef4444' },
          ],
        });
      }

      setUserData({
        vem_hash: user.vem_hash,
        nome: user.nome || 'Usuário',
        nivel: Math.floor((user.pontuacao || 0) / 25) + 1,
        pontuacao: user.pontuacao || 0,
        idade: user.idade,
        foto: 'https://i.pravatar.cc/150?img=47',
        localizacao: 'Parada Cond. da Boa Vista', // Mock - pode vir do totem depois
      });

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Usar dados mocados em caso de erro
      setUserData({
        vem_hash: userHash,
        nome: 'Ana Silva',
        nivel: 4,
        pontuacao: 100,
        foto: 'https://i.pravatar.cc/150?img=47',
        localizacao: 'Parada Cond. da Boa Vista',
      });

      setUltimaPesquisa({
        id: '42516',
        texto: 'Você está satisfeito com o transporte público?',
        respostas: [
          { name: 'Sim', value: 35, color: '#10b981' },
          { name: 'Não', value: 25, color: '#ef4444' },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

 if (loading || !userData) {
  return <LoadingScreen />;
}

  return (
    <Box sx={{ pb: 10, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header com ilustração */}
      <Box
     sx={{
       height: 150,
       backgroundImage: 'url(/banner-onibus.jpg)', // ← nome do arquivo
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       borderBottom: '2px solid #000',
       position: 'relative',
     }}
   >
        {/* Avatar */}
        <Avatar
          src={userData.foto}
          sx={{
            width: 80,
            height: 80,
            border: '4px solid #fff',
            position: 'absolute',
            bottom: -40,
            left: 20,
          }}
        />
      </Box>

      {/* Perfil */}
      <Box sx={{ px: 2.5, pt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h2">
            {userData.nome}!
          </Typography>
          <Chip
            label={`${userData.pontuacao} pt`}
            sx={{
              backgroundColor: '#fff',
              border: '2px solid #000',
              fontWeight: 700,
              fontSize: 16,
            }}
          />
        </Box>

        <Chip
          label={`Nível ${userData.nivel}`}
          size="small"
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #000',
            fontWeight: 600,
            mb: 1.5,
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <LocationIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2" color="text.secondary">
            {userData.localizacao}
          </Typography>
        </Box>

        {/* Botão Ver Resultado */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/pesquisas')}
          sx={{
            mb: 2,
            py: 1.5,
            borderColor: '#000',
            color: '#000',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#000',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Veja o resultado da última pesquisa
        </Button>

        {/* Card da Última Pesquisa */}
        {ultimaPesquisa && (
          <Card sx={{ mb: 3, border: '2px solid #000' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Pesquisa nº {ultimaPesquisa.id}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {ultimaPesquisa.texto}
              </Typography>

              {/* Gráfico de Barras */}
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ultimaPesquisa.respostas}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: 14, fontWeight: 600 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: 12 }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {ultimaPesquisa.respostas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legenda */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#10b981', borderRadius: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Sim: {ultimaPesquisa.respostas.find(r => r.name === 'Sim')?.value || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#ef4444', borderRadius: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Não: {ultimaPesquisa.respostas.find(r => r.name === 'Não')?.value || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Botão Ver Outras Pesquisas */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('/participar-pesquisas')}
          sx={{
            py: 1.5,
            backgroundColor: '#000',
            fontWeight: 600,
            mb: 3,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Confira outras pesquisas!
        </Button>

        {/* Serviços Próximos */}
        <Card sx={{ border: '2px solid #000' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Procura algum serviço próximo?
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Encontre serviços públicos próximos ao seu ponto de ônibus
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/servicos')}
              sx={{
                py: 1.5,
                backgroundColor: '#000',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Ver todos os serviços próximos
            </Button>
          </CardContent>
        </Card>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Home;