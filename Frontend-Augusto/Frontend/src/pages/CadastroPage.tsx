// CadastroPage.tsx
// Página de cadastro de novos clientes. Contém formulário de registro e informações visuais.
import { Link } from 'react-router-dom';
import {
  PrimaryButton,
  HairlineInput,
  HairlineInputWrapper,
  HairlineLabel,
  Logo,
} from '../components/UI';
import {
  Wrapper,
  BgImage,
  Header,
  EditorialQuote,
  FormCard,
  FormGrid,
  FieldWrapper,
  CheckRow,
  FormFooter,
} from '../styles/CadastroStyle';

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