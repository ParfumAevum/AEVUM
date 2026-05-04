import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import CadastroPage from '../pages/CadastroPage';
import EditarPerfilPage from '../pages/EditarPerfilPage';
import FinalizarCompraPage from '../pages/FinalizarCompraPage';
import HistoricoPedidosPage from '../pages/HistoricoPedidosPage';
import AdminRelatoriosPage from '../pages/AdminRelatoriosPage';
import AdiminProdutosPage from '../pages/AdiminProdutosPage';

export default function Roules() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalogo" element={<HomePage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/perfil" element={<EditarPerfilPage />} />
        <Route path="/finalizar-compra" element={<FinalizarCompraPage />} />
        <Route path="/pedidos" element={<HistoricoPedidosPage />} />
        <Route path="/admin" element={<Navigate to="/admin/relatorios" replace />} />
        <Route path="/admin/relatorios" element={<AdminRelatoriosPage />} />
        <Route path="/admin/produtos" element={<AdiminProdutosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
