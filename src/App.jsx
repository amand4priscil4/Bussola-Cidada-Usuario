import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Pesquisas from './pages/Pesquisas';
import ParticiparPesquisas from './pages/ParticiparPesquisas';
import Ranking from './pages/Ranking';
import Servicos from './pages/Servicos';
import TestQRCodes from './pages/TestQRCodes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/pesquisas" element={<Pesquisas />} />
          <Route path="/participar-pesquisas" element={<ParticiparPesquisas />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/test-qr" element={<TestQRCodes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;