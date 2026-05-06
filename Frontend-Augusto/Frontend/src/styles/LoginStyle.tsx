import styled from "styled-components";

// Container principal do login, com layout de duas colunas para desktop.
export const LoginWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

export const LeftColumn = styled.section`
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

export const RightColumn = styled.section`
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

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

export const FormTitle = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.onSurface};
  margin-bottom: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ForgotLink = styled.a`
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

export const Divider = styled.div`
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

export const FooterLinks = styled.div`
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

export const GlowAccent = styled.div<{ top?: boolean }>`
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

export const LogoFixed = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 50;
`;