import api from './api';

/**
 * Serviço para gerenciar usuários
 */
const usuarioService = {
  /**
   * Verificar usuário por QR Code (hash do VEM)
   * Se não existir, cria automaticamente
   */
  verificarUsuario: async (vemHash) => {
    try {
      const response = await api.post(`/usuarios/verificar/${vemHash}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      throw error;
    }
  },

  /**
   * Buscar dados do usuário por hash
   */
  getByHash: async (vemHash) => {
    try {
      const response = await api.get(`/usuarios/${vemHash}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },

  /**
   * Completar cadastro do usuário
   */
  completarCadastro: async (dados) => {
    try {
      const response = await api.post('/usuarios/cadastrar', dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao completar cadastro:', error);
      throw error;
    }
  },

  /**
   * Atualizar dados parciais do usuário
   */
  atualizarDados: async (vemHash, campos) => {
    try {
      const response = await api.patch(`/usuarios/${vemHash}/atualizar`, campos);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error;
    }
  },

  /**
   * Buscar ranking de usuários
   */
  getRanking: async (limite = 10, ordem = 'desc') => {
    try {
      const response = await api.get('/usuarios/ranking', {
        params: { limite, ordem }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
      throw error;
    }
  },

  /**
   * Obter estatísticas gerais
   */
  getEstatisticas: async () => {
    try {
      const response = await api.get('/usuarios/estatisticas');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },

  /**
   * Registrar voto e adicionar pontos
   */
  registrarVoto: async (vemHash, pontos = 10) => {
    try {
      const response = await api.post(`/usuarios/${vemHash}/votar`, null, {
        params: { pontos }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      throw error;
    }
  },

  /**
   * Atualizar pontuação manualmente
   */
  atualizarPontuacao: async (vemHash, pontos) => {
    try {
      const response = await api.patch(`/usuarios/${vemHash}/pontuacao/${pontos}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar pontuação:', error);
      throw error;
    }
  },

  /**
   * Buscar interações do usuário
   */
  getInteracoes: async (vemHash) => {
    try {
      const response = await api.get(`/interacoes?vem_hash=${vemHash}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar interações:', error);
      throw error;
    }
  },

  /**
   * Buscar todas as perguntas
   */
  getPerguntas: async () => {
    try {
      const response = await api.get('/perguntas');
      return response;
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
      throw error;
    }
  },

  /**
   * Responder uma pergunta
   */
  responderPergunta: async (dados) => {
    try {
      const response = await api.post('/interacoes', dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao responder pergunta:', error);
      throw error;
    }
  },
};

export { usuarioService };
export default usuarioService;