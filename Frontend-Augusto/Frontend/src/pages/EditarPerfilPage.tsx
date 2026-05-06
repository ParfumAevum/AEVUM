// EditarPerfilPage.tsx
// Página de perfil do usuário. Permite visualizar e alterar informações pessoais.
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

export default function EditarPerfilPage() {
  return (
    <PageContainer>
      <Navbar />

      <ProfileLayout>
        <Sidebar>
          <AvatarWrapper>
            <div className="avatar">
              <span className="material-symbols-outlined">person</span>
            </div>
            <h3>Helena Aevum</h3>
            <p>Cliente Premium</p>
          </AvatarWrapper>

          <NavLinks>
            <a href="#personal" className="active">
              <span className="material-symbols-outlined">badge</span>
              Dados Pessoais
            </a>
            <a href="#security">
              <span className="material-symbols-outlined">lock</span>
              Segurança
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
                <TableInput type="text" defaultValue="Helena Aevum" />
              </FieldBlock>
              <FieldBlock>
                <label>E-mail</label>
                <TableInput
                  type="text"
                  defaultValue="helena@aevumatelier.com"
                />
              </FieldBlock>
              <FieldBlock>
                <label>Telefone</label>
                <TableInput type="text" defaultValue="(11) 99999-9999" />
              </FieldBlock>
            </FieldGrid>

            <FieldGrid>
              <FieldBlock style={{ gridColumn: "span 2" }}>
                <label>Endereço</label>
                <TableInput type="text" defaultValue="Avenida Paulista, 1000" />
              </FieldBlock>
              <FieldBlock>
                <label>Número</label>
                <TableInput type="text" defaultValue="1000" />
              </FieldBlock>
              <FieldBlock>
                <label>Complemento</label>
                <TableInput type="text" defaultValue="Apto 12" />
              </FieldBlock>
              <FieldBlock>
                <label>Bairro</label>
                <TableInput type="text" defaultValue="Bela Vista" />
              </FieldBlock>
              <FieldBlock>
                <label>Cidade</label>
                <TableInput type="text" defaultValue="São Paulo" />
              </FieldBlock>
              <FieldBlock>
                <label>Estado</label>
                <TableInput type="text" defaultValue="SP" />
              </FieldBlock>
              <FieldBlock>
                <label>CEP</label>
                <TableInput type="text" defaultValue="04538-132" />
              </FieldBlock>
            </FieldGrid>
          </FormSection>

          {/* Segurança */}
          <FormSection id="security">
            <h2>Segurança</h2>
            <FieldGrid>
              <FieldBlock>
                <label>Senha Atual</label>
                <TableInput type="password" defaultValue="••••••••••••" />
              </FieldBlock>
              <FieldBlock>
                <label>Nova Senha</label>
                <TableInput
                  type="password"
                  placeholder="Mínimo 12 caracteres"
                />
              </FieldBlock>
            </FieldGrid>
          </FormSection>

          <ActionRow>
            <PrimaryButton type="button">SALVAR ALTERAÇÕES</PrimaryButton>
            <GhostButton type="button">CANCELAR</GhostButton>
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
