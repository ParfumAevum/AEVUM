import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PrimaryButton,
  HairlineInput,
  HairlineInputWrapper,
  HairlineLabel,
  Logo,
} from '../components/UI';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BgImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    mix-blend-mode: luminosity;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(19,19,19,0) 0%, rgba(19,19,19,0.95) 100%);
  }
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditorialQuote = styled.div`
  display: none;
  position: fixed;
  bottom: 96px;
  left: 96px;
  z-index: 10;
  max-width: 420px;
  pointer-events: none;
  opacity: 0.5;

  @media (min-width: 1536px) {
    display: block;
  }
`;

const FormCard = styled.section`
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 768px;
  margin: 160px auto 48px;
  padding: 64px 48px;
  background: rgba(19, 19, 19, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(53, 53, 52, 0.4);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px 48px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 84px;
`;

const CheckRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.colors.outline};
    background: transparent;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primaryContainer};
  }

  label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    cursor: pointer;
  }
`;

const FormFooter = styled.div`
  padding-top: 40px;
  border-top: 1px solid rgba(53, 53, 52, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
  }

  .icons {
    display: flex;
    gap: 24px;
    color: ${({ theme }) => theme.colors.outline};

    span.material-symbols-outlined {
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export default function CadastroPage() {
  return (
    <Wrapper>
      <BgImage>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrzg6vGMVzDo9qmZtEXtNhT6OtQk_1eMLRzus11pw12gV5JS8u8NYrvcx-mpYlUT6kQJU1szf0dFVPGftNzI8kFNN7k3PHxS-p3oG2XeUnPbFrgwun6hWYXfDL2QEiE9VUl8jI4EudOjFHj1R0PRe35-f_ZbJE3uwsCmByF9hGscgQxw-_HFnVf63kfkHlWWFRUAm0vEgPHA69RfrA-1u6x6B1huXLWh4wKjHQqsGiPlul8BKD0uJB_JRMHJgdj7j5ZAXUl-AnfZg"
          alt="Background"
        />
      </BgImage>

      <Header>
        <Link to="/">
          <Logo>AEVUM</Logo>
        </Link>
      </Header>

      <EditorialQuote>
        <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f2ca50', display: 'block', marginBottom: 24 }}>
          L'ART DE VIVRE
        </span>
        <h2 style={{ fontFamily: 'Noto Serif', fontSize: 60, fontWeight: 300, lineHeight: 1.1, color: '#e5e2e1' }}>
          O Ritual da Raridade.
        </h2>
      </EditorialQuote>

      <FormCard>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: '#e5e2e1' }}>
            Criar Conta
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#c8c6c5', marginTop: 8 }}>
            Complete seus dados para iniciar sua jornada editorial.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <FormGrid>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="username">Nome de Usuário</HairlineLabel>
                <HairlineInput id="username" type="text" placeholder="Seu nome exclusivo" />
              </HairlineInputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="email">E-mail</HairlineLabel>
                <HairlineInput id="email" type="email" placeholder="atelier@aevum.com" />
              </HairlineInputWrapper>
            </FieldWrapper>
          </FormGrid>

          <FormGrid>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="phone">Número de Telefone</HairlineLabel>
                <HairlineInput id="phone" type="tel" placeholder="+55 81 99999-9999" />
              </HairlineInputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="cpf">CPF</HairlineLabel>
                <HairlineInput id="cpf" type="text" placeholder="000.000.000-00" />
              </HairlineInputWrapper>
            </FieldWrapper>
          </FormGrid>

          <FormGrid>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="password">Senha</HairlineLabel>
                <HairlineInput id="password" type="password" placeholder="••••••••" />
              </HairlineInputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="confirm">Confirmação de Senha</HairlineLabel>
                <HairlineInput id="confirm" type="password" placeholder="••••••••" />
              </HairlineInputWrapper>
            </FieldWrapper>
          </FormGrid>

          <div style={{ paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PrimaryButton type="submit" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>
              CRIAR MINHA CONTA
            </PrimaryButton>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CheckRow>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">Aceito os Termos de Privacidade</label>
              </CheckRow>
              <Link to="/entrar" style={{
                fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#99907c', transition: 'color 0.3s',
                textDecoration: 'underline', textUnderlineOffset: 4
              }}>
                Já possui conta?
              </Link>
            </div>
          </div>
        </form>

        <FormFooter>
          <span>© 2024 AEVUM ATELIER</span>
          <div className="icons">
            <span className="material-symbols-outlined">language</span>
            <span className="material-symbols-outlined">share</span>
          </div>
        </FormFooter>
      </FormCard>
    </Wrapper>
  );
}