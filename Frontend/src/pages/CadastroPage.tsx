// ══════════════════════════════════════════════════════════════
// src/pages/CadastroPage.tsx
// Página de cadastro de novos clientes.
// Conectada à API: cria o usuário e faz login automático.
// ══════════════════════════════════════════════════════════════

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PrimaryButton,
  HairlineInput,
  HairlineInputWrapper,
  HairlineLabel,
  Logo,
} from "../components/UI";
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
} from "../styles/CadastroStyle";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function CadastroPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ─── Estado do Formulário ────────────────────────────────
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmar: "",
  });
  const [termos, setTermos] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Atualiza campo individual do formulário
  function handleChange(campo: string, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  // ─── Submit ──────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    // Validações locais antes de chamar a API
    if (form.senha !== form.confirmar) {
      return setErro("As senhas não coincidem.");
    }
    if (form.senha.length < 6) {
      return setErro("A senha deve ter pelo menos 6 caracteres.");
    }
    if (!termos) {
      return setErro("Aceite os termos de privacidade para continuar.");
    }

    setCarregando(true);
    try {
      // Cria a conta via API
      await api.post("/auth/cadastro", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone,
        cpf: form.cpf,
      });

      // Faz login automático após cadastro
      await login(form.email, form.senha);
      navigate("/home");
    } catch (err) {
      const mensagem = (err as Error).message || "Erro ao criar conta.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Wrapper>
      {/* Imagem de fundo com gradiente */}
      <BgImage>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrzg6vGMVzDo9qmZtEXtNhT6OtQk_1eMLRzus11pw12gV5JS8u8NYrvcx-mpYlUT6kQJU1szf0dFVPGftNzI8kFNN7k3PHxS-p3oG2XeUnPbFrgwun6hWYXfDL2QEiE9VUl8jI4EudOjFHj1R0PRe35-f_ZbJE3uwsCmByF9hGscgQxw-_HFnVf63kfkHlWWFRUAm0vEgPHA69RfrA-1u6x6B1huXLWh4wKjHQqsGiPlul8BKD0uJB_JRMHJgdj7j5ZAXUl-AnfZg"
          alt="Background"
        />
      </BgImage>

      {/* Header com logo */}
      <Header>
        <Link to="/home">
          <Logo>AEVUM</Logo>
        </Link>
      </Header>

      {/* Citação editorial decorativa (visível em telas grandes) */}
      <EditorialQuote>
        <span
          style={{
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#f2ca50",
            display: "block",
            marginBottom: 24,
          }}
        >
          L'ART DE VIVRE
        </span>
        <h2
          style={{
            fontFamily: "Noto Serif",
            fontSize: 60,
            fontWeight: 300,
            lineHeight: 1.1,
            color: "#e5e2e1",
          }}
        >
          O Ritual da Raridade.
        </h2>
      </EditorialQuote>

      {/* Card do formulário */}
      <FormCard>
        {/* Cabeçalho do formulário */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "Noto Serif",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 400,
              color: "#e5e2e1",
            }}
          >
            Criar Conta
          </h2>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              color: "#c8c6c5",
              marginTop: 8,
            }}
          >
            Complete seus dados para iniciar sua jornada editorial.
          </p>
        </div>

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 40 }}
        >
          {/* Linha 1: Nome e Email */}
          <FormGrid>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="nome">Nome Completo</HairlineLabel>
                <HairlineInput
                  id="nome"
                  type="text"
                  value={form.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </HairlineInputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="email">E-mail</HairlineLabel>
                <HairlineInput
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </HairlineInputWrapper>
            </FieldWrapper>
          </FormGrid>

          {/* Linha 2: Telefone e CPF */}
          <FormGrid>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="telefone">Telefone</HairlineLabel>
                <HairlineInput
                  id="telefone"
                  type="tel"
                  value={form.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  placeholder="+55 81 99999-9999"
                />
              </HairlineInputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="cpf">CPF</HairlineLabel>
                <HairlineInput
                  id="cpf"
                  type="text"
                  value={form.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                />
              </HairlineInputWrapper>
            </FieldWrapper>
          </FormGrid>

          {/* Linha 3: Senha e Confirmação */}
          <FormGrid>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="senha">Senha</HairlineLabel>
                <HairlineInput
                  id="senha"
                  type="password"
                  value={form.senha}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </HairlineInputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <HairlineInputWrapper>
                <HairlineLabel htmlFor="confirmar">
                  Confirmar Senha
                </HairlineLabel>
                <HairlineInput
                  id="confirmar"
                  type="password"
                  value={form.confirmar}
                  onChange={(e) => handleChange("confirmar", e.target.value)}
                  placeholder="Repita a senha"
                  required
                />
              </HairlineInputWrapper>
            </FieldWrapper>
          </FormGrid>

          {/* Mensagem de erro */}
          {erro && (
            <p
              style={{
                color: "#ffb4ab",
                fontFamily: "Inter",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {erro}
            </p>
          )}

          {/* Ações finais */}
          <div
            style={{
              paddingTop: 32,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Botão de submit */}
            <PrimaryButton
              type="submit"
              disabled={carregando}
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: 13,
                opacity: carregando ? 0.7 : 1,
              }}
            >
              {carregando ? "CRIANDO CONTA..." : "CRIAR MINHA CONTA"}
            </PrimaryButton>

            {/* Checkbox de termos e link para login */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CheckRow>
                <input
                  type="checkbox"
                  id="termos"
                  checked={termos}
                  onChange={(e) => setTermos(e.target.checked)}
                />
                <label htmlFor="termos">Aceito os Termos de Privacidade</label>
              </CheckRow>
              <Link
                to="/login"
                style={{
                  fontFamily: "Inter",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#99907c",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                Já possui conta?
              </Link>
            </div>
          </div>
        </form>

        {/* Rodapé do card */}
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