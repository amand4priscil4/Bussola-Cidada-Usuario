import api from './api';

/**
 * Serviço para gerenciar serviços públicos
 */
const servicoService = {
  /**
   * Listar todos os serviços públicos
   */
  listarServicos: async (apenasAtivos = true) => {
    try {
      const response = await api.get('/servicos/', {
        params: { apenas_ativos: apenasAtivos }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao listar serviços:', error);
      throw error;
    }
  },

  /**
   * Buscar serviços próximos a um totem
   */
  buscarProximosTotem: async (totemId, raioKm = 5.0) => {
    try {
      const response = await api.get(`/servicos/proximos-totem/${totemId}`, {
        params: { raio_km: raioKm }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços próximos ao totem:', error);
      throw error;
    }
  },

  /**
   * Buscar serviços próximos a coordenadas específicas
   */
  buscarProximosCoordenadas: async (latitude, longitude, raioKm = 5.0) => {
    try {
      const response = await api.get('/servicos/proximos', {
        params: {
          latitude,
          longitude,
          raio_km: raioKm
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços próximos:', error);
      throw error;
    }
  },

  /**
   * Buscar serviços por tipo
   */
  buscarPorTipo: async (tipo) => {
    try {
      const response = await api.get(`/servicos/tipo/${tipo}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços por tipo:', error);
      throw error;
    }
  },

  /**
   * Listar tipos de serviços disponíveis
   */
  listarTipos: async () => {
    try {
      const response = await api.get('/servicos/tipos');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar tipos de serviços:', error);
      throw error;
    }
  },

  /**
   * Obter estatísticas dos serviços
   */
  obterEstatisticas: async () => {
    try {
      const response = await api.get('/servicos/estatisticas');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw error;
    }
  },

  /**
   * Buscar serviço por ID
   */
  buscarServico: async (servicoId) => {
    try {
      const response = await api.get(`/servicos/${servicoId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviço:', error);
      throw error;
    }
  }
};

export default servicoService;
