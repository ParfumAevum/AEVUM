import styled from "styled-components";

// Layout de checkout dividindo formulário de pagamento e resumo do pedido.
export const CheckoutLayout = styled.div`
  padding-top: 128px;
  padding-bottom: 96px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
  padding-left: clamp(24px, 4vw, 48px);
  padding-right: clamp(24px, 4vw, 48px);

  @media (min-width: 1024px) {
    grid-template-columns: 7fr 5fr;
  }

  @media (max-width: 768px) {
    padding-top: 96px;
    padding-bottom: 48px;
    padding-left: clamp(24px, 4vw, 48px);
    padding-right: clamp(24px, 4vw, 48px);
  }
`;

// Seção usada para campos de pagamento e detalhes do pedido.
export const FormSection = styled.section`
  margin-bottom: 64px;

  h2 {
    font-family: "Noto Serif", serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 8px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px 32px;
  padding-top: 32px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FieldBlock = styled.div`
  label {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    display: block;
    margin-bottom: 12px;
  }

  input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid #333;
    outline: none;
    padding: 10px 0;
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 15px;
    letter-spacing: 0.08em;
    transition: border-color 0.3s ease;

    &::placeholder {
      color: #222;
    }

    &:focus {
      border-bottom-color: ${({ theme }) => theme.colors.primaryContainer};
    }
  }
`;

export const PaymentMethodRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const MethodTab = styled.button<{ $active?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 24px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primaryContainer : "rgba(255,255,255,0.08)"};
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.primaryContainer}15` : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryContainer : theme.colors.outline};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryContainer};
    color: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

export const SaveCardRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-top: 32px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.outline};

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primaryContainer};
    border-radius: 0;
    cursor: pointer;
  }
`;

// ─── Order Summary ─────────────────────────────────────────────────────────────

// Painel fixo à direita com resumo de valores e itens do pedido.
export const SummaryCard = styled.aside`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.08);
  padding: 48px 40px;
  position: sticky;
  top: 120px;
  height: fit-content;

  h2 {
    font-family: "Noto Serif", serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
  align-items: flex-start;

  .thumb {
    width: 80px;
    height: 96px;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    border: 1px solid rgba(212, 175, 55, 0.1);
    flex-shrink: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .details {
    flex: 1;

    h3 {
      font-family: "Noto Serif", serif;
      font-size: 17px;
      color: ${({ theme }) => theme.colors.onSurface};
      margin-bottom: 6px;
    }

    p {
      font-family: "Inter", sans-serif;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.outline};
      margin-bottom: 12px;
    }

    span {
      font-family: "Inter", sans-serif;
      font-size: 15px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const PriceLine = styled.div<{ $total?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $total }) => ($total ? "20px 0 0" : "12px 0")};
  border-top: ${({ $total }) =>
    $total ? "1px solid rgba(212,175,55,0.15)" : "none"};

  span:first-child {
    font-family: "Inter", sans-serif;
    font-size: ${({ $total }) => ($total ? "12px" : "14px")};
    font-weight: ${({ $total }) => ($total ? "600" : "400")};
    letter-spacing: ${({ $total }) => ($total ? "0.15em" : "0")};
    text-transform: ${({ $total }) => ($total ? "uppercase" : "none")};
    color: ${({ $total, theme }) =>
      $total ? theme.colors.outline : theme.colors.outline};
  }

  span:last-child {
    font-family: ${({ $total }) =>
      $total ? "'Noto Serif', serif" : "'Inter', sans-serif"};
    font-size: ${({ $total }) => ($total ? "22px" : "14px")};
    font-weight: ${({ $total }) => ($total ? "400" : "400")};
    color: ${({ $total, theme }) =>
      $total ? theme.colors.primary : theme.colors.onSurface};
  }
`;

export const CouponInput = styled.div`
  display: flex;
  gap: 0;
  margin-top: 32px;
  border-bottom: 1px solid #222;

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 12px 0;
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 13px;
    letter-spacing: 0.08em;

    &::placeholder {
      color: #222;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 11px;
    }

    &:focus {
      border-bottom-color: ${({ theme }) => theme.colors.primaryContainer};
    }
  }

  button {
    font-family: "Inter", sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primaryContainer};
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 0 0 16px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;
