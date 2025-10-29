import api from './api';

const usuarioService = {
  // Buscar dados do usuário
  getByHash: (vemHash) => api.get(`/usuarios/${vemHash}`),
  
  // Buscar interações do usuário
  getInteracoes: (vemHash) => api.get(`/interacoes?vem_hash=${vemHash}`),
  
  // Buscar todas as perguntas
  getPerguntas: () => api.get('/perguntas'),
};

export { usuarioService };
export default usuarioService;