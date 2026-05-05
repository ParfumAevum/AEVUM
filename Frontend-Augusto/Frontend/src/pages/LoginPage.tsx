// LoginPage.tsx
// Página de autenticação do usuário. Contém formulário de login e validação simples.
// LoginPage.tsx
// Página de autenticação do usuário. Contém formulário de login e validação simples.
import { useState, type ChangeEvent, type FormEvent } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {
  PrimaryButton,
  HairlineInput,
  HairlineInputWrapper,
  HairlineLabel,
  Logo,
} from '../components/UI';

// Container principal do login, com layout de duas colunas para desktop.
const LoginWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const LeftColumn = styled.section`
  display: none;
  width: 58.33%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};

  @media (min-width: 768px) {
    display: flex;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
  }

  .editorial-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 80px;
    background: linear-gradient(180deg, rgba(19,19,19,0) 0%, rgba(19,19,19,0.9) 100%);
  }
`;

const RightColumn = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 24px;
  background: ${({ theme }) => theme.colors.surface};
  z-index: 10;

  @media (min-width: 768px) {
    padding: 48px 96px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

const FormTitle = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ForgotLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.surfaceContainerHighest}, transparent);
  }

  span {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: ${({ theme }) => theme.colors.surfaceBright};
  }
`;

const FooterLinks = styled.div`
  margin-top: 96px;
  padding-top: 48px;
  border-top: 1px solid rgba(32, 31, 31, 0.3);
  display: flex;
  justify-content: space-between;

  a {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.surfaceBright};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.outline};
    }
  }
`;

const GlowAccent = styled.div<{ top?: boolean }>`
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(242, 202, 80, 0.05);
  filter: blur(120px);
  pointer-events: none;
  z-index: -1;
  ${({ top }) => top ? 'top: 0; right: 0;' : 'bottom: 0; left: 0; width: 300px; height: 300px;'}
`;

const LogoFixed = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 50;
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validação simples de login para demonstrar fluxo de autenticação.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() === 'admin' && password === '1234') {
      navigate('/home');
      return;
    }

    setError('Usuário ou senha inválidos.');
  };

  return (
    <LoginWrapper>
      <LogoFixed>
        <Logo>AEVUM</Logo>
      </LogoFixed>

      {/* Left: Editorial Image */}
      <LeftColumn>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUL3bevrohJfLeL7Cjr6O5TXTdSMuHL5BCrEH9D2OOHZMFytCz2ufu5NAtERpIVzE9Pbd4vXVw6si5h8YM9DUt_hX3RXcBzuIvGpjfnD-zXGgmaLmaIzxRXwHwnylbXWZxlQxiPY7GWfVB_LLjDA0S-rQrZPuN5eaZViWf3mxsUP6mgd4pfGMy6Yf2JNkzhn2nTOLX3eGfBDJYvv8KzMb17Rz7mvgTMWREwatJHwcCGlunJQa-YP9FO6cTRH2efEK7i7119pYzvm8"
          alt="AEVUM Luxury Perfume"
        />
        <div className="overlay" />
        <div className="editorial-content">
          <span style={{
            fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#f2ca50', display: 'block', marginBottom: 16
          }}>ESSÊNCIA DO TEMPO</span>
          <h2 style={{
            fontFamily: 'Noto Serif', fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 300,
            lineHeight: 1.1, letterSpacing: '-0.02em', color: '#e5e2e1',
            marginBottom: 24, maxWidth: 480
          }}>O Silêncio do Luxo.</h2>
          <p style={{
            fontFamily: 'Inter', fontSize: 18, lineHeight: 1.6,
            color: '#d0c5af', maxWidth: 400
          }}>Uma jornada sensorial através de notas raras e o prestígio da alta perfumaria.</p>
        </div>
      </LeftColumn>

      {/* Right: Login Form */}
      <RightColumn>
        <FormWrapper>
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="md-hidden-logo">
            <Logo style={{ display: 'block', fontSize: 28 }}>AEVUM</Logo>
          </div>

          <div style={{ marginBottom: 48 }}>
            <FormTitle>Bem-vindo</FormTitle>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#d0c5af' }}>
              Acesse sua coleção particular.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <HairlineInputWrapper>
              <HairlineLabel htmlFor="email">Email</HairlineLabel>
              <HairlineInput
                id="email"
                type="text"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                placeholder="seu@email.com"
              />
            </HairlineInputWrapper>

            <HairlineInputWrapper>
              <HairlineLabel htmlFor="password">Senha</HairlineLabel>
              <HairlineInput
                id="password"
                type="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
              {/* Link de recuperação de senha abaixo do campo de senha */}
              <ForgotLink href="#">ESQUECI MINHA SENHA</ForgotLink>
            </HairlineInputWrapper>

            {error ? (
              <p style={{ color: '#ffb4ab', fontFamily: 'Inter', fontSize: 13, marginTop: -8, marginBottom: 16 }}>
                {error}
              </p>
            ) : null}

            <div style={{ paddingTop: 24 }}>
              <PrimaryButton type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                ENTRAR
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}></span>
              </PrimaryButton>
            </div>
          </Form>

          <div style={{ marginTop: 64, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Divider>
              <div className="line" />
              <span>OU</span>
              <div className="line" />
            </Divider>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#d0c5af' }}>
              Não possui acesso?{' '}
              <Link to="/cadastro" style={{
                color: '#f2ca50', fontWeight: 600,
                textDecoration: 'underline', textUnderlineOffset: 4
              }}>
                Criar uma conta
              </Link>
            </p>
          </div>

          <FooterLinks>
            <a href="#">TERMOS DE USO</a>
            <a href="#">PRIVACIDADE</a>
          </FooterLinks>
        </FormWrapper>
      </RightColumn>

      <GlowAccent top />
      <GlowAccent />
    </LoginWrapper>
  );
}