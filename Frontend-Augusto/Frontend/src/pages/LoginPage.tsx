// LoginPage.tsx
// Página de autenticação do usuário. Contém formulário de login e validação simples.
// LoginPage.tsx
// Página de autenticação do usuário. Contém formulário de login e validação simples.
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PrimaryButton,
  HairlineInput,
  HairlineInputWrapper,
  HairlineLabel,
  Logo,
} from '../components/UI';
import {
  LoginWrapper,
  LeftColumn,
  RightColumn,
  FormWrapper,
  FormTitle,
  Form,
  ForgotLink,
  Divider,
  FooterLinks,
  GlowAccent,
  LogoFixed,
} from '../styles/LoginStyle';

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