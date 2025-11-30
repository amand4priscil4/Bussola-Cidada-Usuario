import api from './api';

/**
 * Serviço para gerenciar totens/pontos de ônibus
 */
const totemService = {
  /**
   * Listar todos os totens
   */
  listarTotens: async () => {
    try {
      const response = await api.get('/totems/');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar totens:', error);
      throw error;
    }
  },

  /**
   * Buscar totem por ID
   */
  buscarTotem: async (totemId) => {
    try {
      const response = await api.get(`/totems/${totemId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar totem:', error);
      throw error;
    }
  },

  /**
   * Buscar totem mais próximo de uma localização
   */
  buscarTotemProximo: async (latitude, longitude) => {
    try {
      const response = await api.get('/totems/mais-proximo', {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar totem próximo:', error);
      throw error;
    }
  }
};

export default totemService;
