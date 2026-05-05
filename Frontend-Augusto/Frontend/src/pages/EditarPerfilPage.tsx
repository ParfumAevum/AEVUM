// EditarPerfilPage.tsx
// Página de perfil do usuário. Permite visualizar e alterar informações pessoais.
import styled from 'styled-components';
import Navbar from './Navbar';
import { PageContainer, PrimaryButton, GhostButton, TableInput } from '../components/UI';

const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  padding-top: 128px;
  padding-left: clamp(24px, 4vw, 48px);
  padding-right: clamp(24px, 4vw, 48px);
  padding-bottom: 64px;

  @media (min-width: 1024px) {
    grid-template-columns: 280px 1fr;
  }

  @media (max-width: 768px) {
    padding-top: 96px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 48px;
  }
`;

// Barra lateral com avatar e links internos de navegação de perfil.
const Sidebar = styled.aside`
  padding: 48px;

  @media (max-width: 1023px) {
    padding: 24px;
  }
`;

const AvatarWrapper = styled.div`
  text-align: center;
  margin-bottom: 48px;

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 16px;
    background: ${({ theme }) => theme.colors.surfaceContainer};
    border: 2px solid rgba(212, 175, 55, 0.3);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 48px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  h3 {
    font-family: 'Noto Serif', serif;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 8px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover, &.active {
      background: rgba(212, 175, 55, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }

    span {
      font-size: 18px;
    }
  }
`;

// Área principal do conteúdo onde os formulários de edição são exibidos.
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const FormSection = styled.section`
  h2 {
    font-family: 'Noto Serif', serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 8px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p.section-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.outline};
    margin-bottom: 32px;
  }
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.outlineVariant};
    font-weight: 600;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

// Bloco de ação sensível para exclusão ou redefinição de conta.
const DangerZone = styled.div`
  border: 1px solid rgba(255, 180, 171, 0.2);
  padding: 32px;
  background: rgba(147, 0, 10, 0.05);

  h3 {
    font-family: 'Noto Serif', serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 8px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    margin-bottom: 24px;
  }
`;

const DangerButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.error};
  background: none;
  border: 1px solid rgba(255, 180, 171, 0.3);
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 180, 171, 0.1);
  }
`;

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
            <p className="section-desc">Atualize suas informações de contato e endereço.</p>
            
            <FieldGrid style={{ marginBottom: 32 }}>
              <FieldBlock>
                <label>Nome Completo</label>
                <TableInput type="text" defaultValue="Helena Aevum" />
              </FieldBlock>
              <FieldBlock>
                <label>E-mail</label>
                <TableInput type="text" defaultValue="helena@aevumatelier.com" />
              </FieldBlock>
              <FieldBlock>
                <label>Telefone</label>
                <TableInput type="text" defaultValue="(11) 99999-9999" />
              </FieldBlock>
            </FieldGrid>

            <FieldGrid>
              <FieldBlock style={{ gridColumn: 'span 2' }}>
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
                <TableInput type="password" placeholder="Mínimo 12 caracteres" />
              </FieldBlock>
            </FieldGrid>
          </FormSection>

          <ActionRow>
            <PrimaryButton type="button">SALVAR ALTERAÇÕES</PrimaryButton>
            <GhostButton type="button">CANCELAR</GhostButton>
          </ActionRow>

          <DangerZone>
            <h3>Zona de Perigo</h3>
            <p>Uma vez que sua conta for excluída, todos os dados serão permanentemente removidos.</p>
            <DangerButton type="button">
              EXCLUIR CONTA
            </DangerButton>
          </DangerZone>
        </MainContent>
      </ProfileLayout>
    </PageContainer>
  );
}