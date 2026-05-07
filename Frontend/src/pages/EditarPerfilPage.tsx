// EditarPerfilPage.tsx
// Página de perfil do usuário. Permite visualizar e alterar informações pessoais.
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  PageContainer,
  PrimaryButton,
  GhostButton,
  TableInput,
} from "../components/UI";
import {
  ProfileLayout,
  Sidebar,
  AvatarWrapper,
  NavLinks,
  MainContent,
  FormSection,
  FieldGrid,
  FieldBlock,
  ActionRow,
  DangerZone,
  DangerButton,
} from "../styles/EditarPerfilStyle";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function EditarPerfilPage() {
  const { usuario, logout, atualizarUsuario } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    senhaAtual: "",
    novaSenha: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      // Carregar dados do perfil
      api.get("/usuarios/perfil").then((response) => {
        const perfil = response.data;
        setFormData({
          nome: perfil.nome || "",
          email: perfil.email || "",
          telefone: perfil.telefone || "",
          endereco: perfil.enderecos?.[0]?.rua || "",
          numero: perfil.enderecos?.[0]?.numero || "",
          complemento: perfil.enderecos?.[0]?.complemento || "",
          bairro: "",
          cidade: perfil.enderecos?.[0]?.cidade || "",
          estado: perfil.enderecos?.[0]?.estado || "",
          cep: perfil.enderecos?.[0]?.cep || "",
          senhaAtual: "",
          novaSenha: "",
        });
      }).catch((err) => {
        console.error("Erro ao carregar perfil:", err);
      });
    }
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = {
        nome: formData.nome,
        telefone: formData.telefone,
        senhaAtual: formData.senhaAtual || undefined,
        novaSenha: formData.novaSenha || undefined,
      };
      await api.put("/usuarios/perfil", data);
      atualizarUsuario({ nome: formData.nome, telefone: formData.telefone });
      alert("Perfil atualizado com sucesso!");
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair da conta?")) {
      logout();
    }
  };

  if (!usuario) return <div>Carregando...</div>;

  return (
    <PageContainer>
      <Navbar />

      <ProfileLayout>
        <Sidebar>
          <AvatarWrapper>
            <div className="avatar">
              <span className="material-symbols-outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="yellow"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                </svg>
              </span>
            </div>
            <h3>{usuario.nome}</h3>
            <p>{usuario.role === "ADMIN" ? "Administrador" : "Cliente Premium"}</p>
          </AvatarWrapper>

          <NavLinks>
            <a href="#personal" className="active">
              <span className="material-symbols-outlined">Dados Pessoais</span>
            </a>
            <a href="#security">
              <span className="material-symbols-outlined">Segurança</span>
            </a>
          </NavLinks>
        </Sidebar>

        <MainContent>
          {/* Dados Pessoais */}
          <FormSection id="personal">
            <h2>Dados Pessoais</h2>
            <p className="section-desc">
              Atualize suas informações de contato e endereço.
            </p>

            <FieldGrid style={{ marginBottom: 32 }}>
              <FieldBlock>
                <label>Nome Completo</label>
                <TableInput
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>E-mail</label>
                <TableInput
                  type="text"
                  name="email"
                  value={formData.email}
                  disabled
                />
              </FieldBlock>
              <FieldBlock>
                <label>Telefone</label>
                <TableInput
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </FieldBlock>
            </FieldGrid>

            <FieldGrid>
              <FieldBlock style={{ gridColumn: "span 2" }}>
                <label>Endereço</label>
                <TableInput
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>Número</label>
                <TableInput
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>Complemento</label>
                <TableInput
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>Bairro</label>
                <TableInput
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>Cidade</label>
                <TableInput
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>Estado</label>
                <TableInput
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>CEP</label>
                <TableInput
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                />
              </FieldBlock>
            </FieldGrid>
          </FormSection>

          {/* Segurança */}
          <FormSection id="security">
            <h2>Segurança</h2>
            <FieldGrid>
              <FieldBlock>
                <label>Senha Atual</label>
                <TableInput
                  type="password"
                  name="senhaAtual"
                  value={formData.senhaAtual}
                  onChange={handleChange}
                />
              </FieldBlock>
              <FieldBlock>
                <label>Nova Senha</label>
                <TableInput
                  type="password"
                  name="novaSenha"
                  value={formData.novaSenha}
                  onChange={handleChange}
                  placeholder="Mínimo 12 caracteres"
                />
              </FieldBlock>
            </FieldGrid>
          </FormSection>

          <ActionRow>
            <PrimaryButton type="button" onClick={handleSave} disabled={loading}>
              {loading ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
            </PrimaryButton>
            <GhostButton type="button">CANCELAR</GhostButton>
            <GhostButton type="button" onClick={handleLogout}>
              SAIR DA CONTA
            </GhostButton>
          </ActionRow>

          <DangerZone>
            <h3>Zona de Perigo</h3>
            <p>
              Uma vez que sua conta for excluída, todos os dados serão
              permanentemente removidos.
            </p>
            <DangerButton type="button">EXCLUIR CONTA</DangerButton>
          </DangerZone>
        </MainContent>
      </ProfileLayout>
    </PageContainer>
  );
}
