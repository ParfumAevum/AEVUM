// AdminClientesPage.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar, AdminContent, PrimaryButton, GhostButton } from "../components/UI";
import {
  AdminPageContainer,
  SidebarLogo,
  SidebarNav,
  NavItem,
  PageHeader,
  SectionLabel,
  SectionTitle,
  ClientList,
  ClientCard,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalForm,
  ModalActions,
} from "../styles/AdminClienteStyle";
import { api } from "../services/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  role: string;
  criadoEm: string;
  _count: { pedidos: number };
}

const navItems = [
  { to: "/admin/relatorios", label: "Relatórios" },
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/pedidos", label: "Pedidos" },
  { to: "/admin/clientes", label: "Clientes" },
  { to: "/home", label: "Ver Loja" },
];

export default function AdminClientesPage() {
  const location = useLocation();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [editForm, setEditForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    role: "",
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      alert("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function excluirUsuario(id: number) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      setUsuarios(usuarios.filter(u => u.id !== id));
      alert("Usuário excluído com sucesso.");
    } catch (err: any) {
      alert(err.message || "Erro ao excluir usuário.");
    }
  }

  function abrirEdicao(usuario: Usuario) {
    setEditingUser(usuario);
    setEditForm({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone || "",
      cpf: usuario.cpf || "",
      role: usuario.role,
    });
  }

  async function salvarEdicao() {
    if (!editingUser) return;
    try {
      const response = await api.put(`/usuarios/${editingUser.id}`, editForm);
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? response.data : u));
      setEditingUser(null);
      alert("Usuário atualizado com sucesso.");
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar usuário.");
    }
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <AdminPageContainer>
      <AdminSidebar>
        <SidebarLogo>
          <h1>AEVUM ADMIN</h1>
          <p>Painel de Controle</p>
        </SidebarLogo>

        <SidebarNav>
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              $active={location.pathname === item.to}
            >
              {item.label}
            </NavItem>
          ))}
        </SidebarNav>
      </AdminSidebar>

      <AdminContent>
        <PageHeader>
          <div>
            <SectionLabel>ADMIN / CLIENTES</SectionLabel>
            <SectionTitle>Base de Clientes</SectionTitle>
          </div>
          <PrimaryButton onClick={() => window.print()}>Exportar lista</PrimaryButton>
        </PageHeader>

        <ClientList>
          {usuarios.map((usuario) => (
            <ClientCard key={usuario.id}>
              <div className="row">
                <h3>{usuario.nome}</h3>
                <p>{usuario.email}</p>
              </div>
              <div className="row">
                <p>Telefone: {usuario.telefone || "N/A"}</p>
                <p>CPF: {usuario.cpf || "N/A"}</p>
                <p>Role: {usuario.role}</p>
                <p>Pedidos: {usuario._count.pedidos}</p>
              </div>
              <div className="row">
                <GhostButton onClick={() => abrirEdicao(usuario)}>Editar</GhostButton>
                <GhostButton onClick={() => excluirUsuario(usuario.id)}>Excluir</GhostButton>
              </div>
            </ClientCard>
          ))}
        </ClientList>

        {editingUser && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Editar Usuário</ModalTitle>
              <ModalForm>
                <label>
                  Nome
                  <input type="text" value={editForm.nome} onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })} />
                </label>
                <label>
                  Email
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                </label>
                <label>
                  Telefone
                  <input type="text" value={editForm.telefone} onChange={(e) => setEditForm({ ...editForm, telefone: e.target.value })} />
                </label>
                <label>
                  CPF
                  <input type="text" value={editForm.cpf} onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })} />
                </label>
                <label>
                  Role
                  <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                    <option value="CLIENTE">Cliente</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </label>
              </ModalForm>
              <ModalActions>
                <GhostButton onClick={() => setEditingUser(null)}>Cancelar</GhostButton>
                <PrimaryButton onClick={salvarEdicao}>Salvar</PrimaryButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </AdminContent>
    </AdminPageContainer>
  );
}