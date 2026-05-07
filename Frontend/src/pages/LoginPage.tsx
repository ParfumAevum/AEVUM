// ══════════════════════════════════════════════════════════════
// src/pages/LoginPage.tsx
// Página de autenticação do usuário.
// Conectada ao AuthContext: ao fazer login, salva token JWT
// e redireciona para /home (ou para a página anterior).
// ══════════════════════════════════════════════════════════════

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PrimaryButton,
  HairlineInput,
  HairlineInputWrapper,
  HairlineLabel,
  Logo,
} from "../components/UI";
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
} from "../styles/LoginStyle";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // ─── Submit do Formulário ────────────────────────────────
  // Chama o AuthContext.login que bate na API e salva o token.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await login(email, senha);
      // Redireciona para home após login bem-sucedido
      navigate("/home");
    } catch (err: any) {
      setErro(err.message || "Usuário ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <LoginWrapper>
      <LogoFixed>
        <Logo>AEVUM</Logo>
      </LogoFixed>

      {/* Coluna esquerda: imagem editorial */}
      <LeftColumn>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUL3bevrohJfLeL7Cjr6O5TXTdSMuHL5BCrEH9D2OOHZMFytCz2ufu5NAtERpIVzE9Pbd4vXVw6si5h8YM9DUt_hX3RXcBzuIvGpjfnD-zXGgmaLmaIzxRXwHwnylbXWZxlQxiPY7GWfVB_LLjDA0S-rQrZPuN5eaZViWf3mxsUP6mgd4pfGMy6Yf2JNkzhn2nTOLX3eGfBDJYvv8KzMb17Rz7mvgTMWREwatJHwcCGlunJQa-YP9FO6cTRH2efEK7i7119pYzvm8"
          alt="AEVUM Luxury Perfume"
        />
        <div className="overlay" />
        <div className="editorial-content">
          <span
            style={{
              fontFamily: "Inter",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f2ca50",
              display: "block",
              marginBottom: 16,
            }}
          >
            ESSÊNCIA DO TEMPO
          </span>
          <h2
            style={{
              fontFamily: "Noto Serif",
              fontSize: "clamp(48px, 5vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#e5e2e1",
              marginBottom: 24,
              maxWidth: 480,
            }}
          >
            O Silêncio do Luxo.
          </h2>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#d0c5af",
              maxWidth: 400,
            }}
          >
            Uma jornada sensorial através de notas raras e o prestígio da alta
            perfumaria.
          </p>
        </div>
      </LeftColumn>

      {/* Coluna direita: formulário de login */}
      <RightColumn>
        <FormWrapper>
          <div style={{ marginBottom: 48 }}>
            <FormTitle>Bem-vindo</FormTitle>
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "#d0c5af" }}>
              Acesse sua coleção particular.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Campo de e-mail */}
            <HairlineInputWrapper>
              <HairlineLabel htmlFor="email">Email</HairlineLabel>
              <HairlineInput
                id="email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="seu@email.com"
                required
              />
            </HairlineInputWrapper>

            {/* Campo de senha */}
            <HairlineInputWrapper>
              <HairlineLabel htmlFor="senha">Senha</HairlineLabel>
              <HairlineInput
                id="senha"
                type="password"
                value={senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSenha(e.target.value)
                }
                placeholder="••••••••"
                required
              />
              <ForgotLink href="#">ESQUECI MINHA SENHA</ForgotLink>
            </HairlineInputWrapper>

            {/* Mensagem de erro */}
            {erro && (
              <p
                style={{
                  color: "#ffb4ab",
                  fontFamily: "Inter",
                  fontSize: 13,
                  marginTop: -8,
                }}
              >
                {erro}
              </p>
            )}

            {/* Botão de submit */}
            <div style={{ paddingTop: 24 }}>
              <PrimaryButton
                type="submit"
                disabled={carregando}
                style={{ width: "100%", justifyContent: "center", opacity: carregando ? 0.7 : 1 }}
              >
                {carregando ? "ENTRANDO..." : "ENTRAR"}
              </PrimaryButton>
            </div>
          </Form>

          {/* Divisor e link para cadastro */}
          <div
            style={{
              marginTop: 64,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Divider>
              <div className="line" />
              <span>OU</span>
              <div className="line" />
            </Divider>
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "#d0c5af" }}>
              Não possui acesso?{" "}
              <Link
                to="/cadastro"
                style={{
                  color: "#f2ca50",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
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

      {/* Efeitos de brilho decorativos */}
      <GlowAccent top />
      <GlowAccent />
    </LoginWrapper>
  );
}