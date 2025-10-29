# Bússola Cidadã - Aplicativo do Usuário

Aplicativo web mobile para usuários finais visualizarem seus dados de pesquisas, pontuação e conquistas do sistema Bússola Cidadã.

## Características

- ✅ **Interface Mobile-First**: Design otimizado para smartphones
- ✅ **Autenticação via VEM**: Login automático via hash do QR Code/NFC
- ✅ **Perfil Personalizado**: Avatar, nome, nível e pontuação
- ✅ **Histórico de Pesquisas**: Visualização completa de respostas
- ✅ **Sistema de Gamificação**: Níveis, conquistas e ranking
- ✅ **Serviços Próximos**: Lista de serviços públicos (mock)
- ✅ **Integração com API**: Dados em tempo real do backend
- ✅ **Design Consistente**: Preto e branco com gráficos coloridos

## Funcionalidades

### **Home**
- Perfil do usuário com foto, nome, nível e pontuação
- Localização da parada de ônibus atual
- Card da última pesquisa respondida com gráfico de barras
- Botão para ver todas as pesquisas
- Lista de serviços públicos próximos com avaliações (Detran, UPA, CRAS)

### **Pesquisas**
- Histórico completo de pesquisas respondidas
- Busca por pergunta específica
- Cards coloridos por tipo de resposta:
  - 🟢 Verde: Respostas "Sim"
  - 🔴 Vermelho: Respostas "Não"
- Data e horário formatados em PT-BR
- Resumo com total de pesquisas e distribuição Sim/Não

### **Ranking**
- Card com informações do usuário (nível, posição, pontuação)
- Barra de progresso para o próximo nível
- Sistema de conquistas gamificadas:
  - 🎯 **Primeira Pesquisa** (10 pontos)
  - 🏆 **Cidadão Ativo** (50 pontos)
  - ⭐ **Super Cidadão** (100 pontos)
  - 🔥 **Especialista** (250 pontos)
- Status visual de conquistas desbloqueadas/bloqueadas
- Indicação de pontos faltantes para próximas conquistas

## Stack Tecnológica

### **Frontend**
- **React 18.x** - Framework JavaScript
- **Vite 7.x** - Build tool e dev server
- **Material-UI v5** - Biblioteca de componentes mobile-first
- **React Router v6** - Roteamento entre páginas
- **Recharts** - Gráficos de barras interativos
- **Axios** - Cliente HTTP para API
- **date-fns** - Manipulação e formatação de datas

### **Design**
- Tema customizado preto e branco
- Gráficos coloridos (verde/vermelho)
- Layout responsivo mobile-first
- Bottom navigation com 3 ícones
- Tela de loading personalizada com logo

## Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/amand4priscil4/Bussola-Cidada-Usuario.git
cd Bussola-Cidada-Usuario
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie o arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=https://projeto-bigdata.onrender.com
```

Para desenvolvimento local, altere para:

```env
VITE_API_BASE_URL=http://localhost:8000
```

4. **Execute o projeto**

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:3001`

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 🔌 Integração com API

### Base URL
```
Produção: https://projeto-bigdata.onrender.com
Desenvolvimento: http://localhost:8000
```

### Endpoints Utilizados

```javascript
// Buscar dados do usuário
GET /usuarios/{vem_hash}

// Buscar interações do usuário
GET /interacoes?vem_hash={vem_hash}

// Buscar todas as perguntas
GET /perguntas
```

### Exemplo de Uso

```javascript
import usuarioService from './services/usuarioService';

// Buscar dados do usuário
const user = await usuarioService.getByHash('40ebb86c');

// Buscar histórico de pesquisas
const interacoes = await usuarioService.getInteracoes('40ebb86c');

// Buscar perguntas
const perguntas = await usuarioService.getPerguntas();
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── BottomNav.jsx         # ✅ Navegação inferior
│   └── LoadingScreen.jsx     # ✅ Tela de loading personalizada
├── pages/
│   ├── Home.jsx              # ✅ Página principal
│   ├── Pesquisas.jsx         # ✅ Histórico de pesquisas
│   └── Ranking.jsx           # ✅ Ranking e conquistas
├── services/
│   ├── api.js                # ✅ Configuração Axios
│   └── usuarioService.js     # ✅ Service de usuários
├── theme.js                  # ✅ Tema preto e branco
├── App.jsx                   # ✅ App principal
└── main.jsx                  # ✅ Entry point
```

## 🎨 Design e Tema

O app utiliza um tema customizado preto e branco com acentos coloridos:

- **Cores Principais**: Preto (#000000) e Branco (#ffffff)
- **Cores Secundárias**: Tons de cinza (#f5f5f5, #666666)
- **Cores de Feedback**:
  - Verde (#10b981) - Respostas "Sim"
  - Vermelho (#ef4444) - Respostas "Não"
  - Amarelo (#f59e0b) - Avisos e destaques
  - Azul (#3b82f6) - Informações

## Sistema de Autenticação

O app utiliza o **hash do VEM** (Validador Eletrônico Municipal) como identificador único:

### Como Funciona

1. Usuário escaneia QR Code ou usa NFC no totem
2. Sistema gera um hash único (ex: `40ebb86c`)
3. Hash é passado via URL: `https://app.com/?hash=40ebb86c`
4. App salva o hash no `localStorage`
5. Todas as requisições usam esse hash para identificar o usuário

### Exemplo de URL

```
https://bussola-cidada-usuario.vercel.app/?hash=40ebb86c
```

## Sistema de Gamificação

### Níveis

- Sistema progressivo: **25 pontos = 1 nível**
- Nível atual calculado automaticamente
- Barra de progresso visual para próximo nível

### Conquistas

| Conquista | Ícone | Pontos | Descrição |
|-----------|-------|--------|-----------|
| Primeira Pesquisa | 🎯 | 10 | Respondeu sua primeira pesquisa |
| Cidadão Ativo | 🏆 | 50 | Respondeu 5 pesquisas |
| Super Cidadão | ⭐ | 100 | Alcançou 100 pontos |
| Especialista | 🔥 | 250 | Alcançou 250 pontos |

### Pontuação

- Cada pesquisa respondida = pontos (configurável no backend)
- Pontuação acumulada ao longo do tempo
- Ranking global baseado em pontuação

## Navegação

### Bottom Navigation (3 ícones)

- 🏆 **Ranking** - Visualizar conquistas e posição
- 🏠 **Home** - Página principal (padrão)
- 🚪 **Logout** - Sair e limpar dados

### Rotas Disponíveis

```
/ ..................... Página Home (principal)
/pesquisas ............ Histórico de pesquisas
/ranking .............. Ranking e conquistas
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# URL da API backend
VITE_API_BASE_URL=https://projeto-bigdata.onrender.com
```

### Customização

**Alterar hash padrão:**
```javascript
// src/pages/Home.jsx (linha 31)
const userHash = localStorage.getItem('userHash') || '40ebb86c';
```

**Alterar altura do header:**
```javascript
// src/pages/Home.jsx (linha 161)
height: 150, // Mude este valor
```

**Alterar serviços mocados:**
```javascript
// src/pages/Home.jsx (linha 36-58)
const servicosMocados = [
  { id: 1, nome: 'Detran', ... },
  // Adicione mais serviços aqui
];
```

## Troubleshooting

### Erro: "Cannot find module"

Reinstale as dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro 404 na API

Verifique se a variável `VITE_API_BASE_URL` está configurada corretamente no `.env`.

### Dados não carregam

Verifique se o hash do usuário existe no banco:
1. Acesse o painel admin
2. Vá em Usuários
3. Crie um usuário com o hash que está usando

### Loading infinito

Abra o console do navegador (F12) e verifique erros de CORS ou rede.

## Próximas Melhorias

- [ ] Sistema de notificações push
- [ ] Integração com API de serviços próximos (geolocalização)
- [ ] Mapa interativo de serviços
- [ ] Sistema de avaliação de serviços
- [ ] Compartilhamento de conquistas nas redes sociais
- [ ] PWA (Progressive Web App) para instalação
- [ ] Modo offline com cache de dados
- [ ] Filtros avançados em Pesquisas (por data, tipo)
- [ ] Gráficos de evolução da pontuação

## 📄 Licença

Este projeto é educacional.

## 🔗 Links

- **Repositório**: https://github.com/amand4priscil4/Bussola-Cidada-Usuario.git
- **API Backend**: https://github.com/LucasSSilvaJS/projeto_bigdata
- **Painel Admin**: https://github.com/amand4priscil4/Bussola-Cidada

---

**Status**: ✅ Funcional  
**Versão**: 1.0.0  
**Última atualização**: Janeiro 2025  
**Desenvolvido com**: ❤️ React + Vite + Material-UI
