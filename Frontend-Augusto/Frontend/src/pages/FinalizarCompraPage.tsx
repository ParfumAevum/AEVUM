// FinalizarCompraPage.tsx
// Página de checkout. Exibe formulário de pagamento, resumo do pedido e opções de forma de pagamento.
import styled from 'styled-components';
import Navbar from './Navbar';
import { PageContainer, PrimaryButton } from '../components/UI';

// Layout de checkout dividindo formulário de pagamento e resumo do pedido.
const CheckoutLayout = styled.div`
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
const FormSection = styled.section`
  margin-bottom: 64px;

  h2 {
    font-family: 'Noto Serif', serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 8px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px 32px;
  padding-top: 32px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FieldBlock = styled.div`
  label {
    font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;
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

const PaymentMethodRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const MethodTab = styled.button<{ $active?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 24px;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primaryContainer : 'rgba(255,255,255,0.08)'};
  background: ${({ $active, theme }) => $active ? `${theme.colors.primaryContainer}15` : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.primaryContainer : theme.colors.outline};
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

const SaveCardRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-top: 32px;
  font-family: 'Inter', sans-serif;
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
const SummaryCard = styled.aside`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212,175,55,0.08);
  padding: 48px 40px;
  position: sticky;
  top: 120px;
  height: fit-content;

  h2 {
    font-family: 'Noto Serif', serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const OrderItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
  align-items: flex-start;

  .thumb {
    width: 80px;
    height: 96px;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    border: 1px solid rgba(212,175,55,0.1);
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
      font-family: 'Noto Serif', serif;
      font-size: 17px;
      color: ${({ theme }) => theme.colors.onSurface};
      margin-bottom: 6px;
    }

    p {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.outline};
      margin-bottom: 12px;
    }

    span {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PriceLine = styled.div<{ $total?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $total }) => $total ? '20px 0 0' : '12px 0'};
  border-top: ${({ $total }) => $total ? '1px solid rgba(212,175,55,0.15)' : 'none'};

  span:first-child {
    font-family: 'Inter', sans-serif;
    font-size: ${({ $total }) => $total ? '12px' : '14px'};
    font-weight: ${({ $total }) => $total ? '600' : '400'};
    letter-spacing: ${({ $total }) => $total ? '0.15em' : '0'};
    text-transform: ${({ $total }) => $total ? 'uppercase' : 'none'};
    color: ${({ $total, theme }) => $total ? theme.colors.outline : theme.colors.outline};
  }

  span:last-child {
    font-family: ${({ $total }) => $total ? "'Noto Serif', serif" : "'Inter', sans-serif"};
    font-size: ${({ $total }) => $total ? '22px' : '14px'};
    font-weight: ${({ $total }) => $total ? '400' : '400'};
    color: ${({ $total, theme }) => $total ? theme.colors.primary : theme.colors.onSurface};
  }
`;

const CouponInput = styled.div`
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
    font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;
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

    &:hover { opacity: 0.7; }
  }
`;

export default function FinalizarCompraPage() {
    return (
        <PageContainer>
            <Navbar />
            <CheckoutLayout>
                {/* Left: Form */}
                <div>
                    {/* Payment Method */}
                    <FormSection>
                        <h2>Finalizar Pedido</h2>
                        <PaymentMethodRow>
                            {[
                                { icon: 'credit_card', label: 'Cartão' },
                                { icon: 'pix', label: 'PIX' },
                                { icon: 'receipt_long', label: 'Boleto' },
                            ].map((m, i) => (
                                <MethodTab key={m.label} $active={i === 0}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{m.icon}</span>
                                    {m.label}
                                </MethodTab>
                            ))}
                        </PaymentMethodRow>

                        <PaymentGrid>
                            <FieldBlock style={{ gridColumn: '1 / -1' }}>
                                <label>Número do Cartão</label>
                                <input type="text" placeholder="0000 0000 0000 0000" />
                            </FieldBlock>
                            <FieldBlock style={{ gridColumn: '1 / -1' }}>
                                <label>Nome no Cartão</label>
                                <input type="text" placeholder="Como impresso no cartão" />
                            </FieldBlock>
                            <FieldBlock>
                                <label>Validade</label>
                                <input type="text" placeholder="MM/AA" />
                            </FieldBlock>
                            <FieldBlock>
                                <label>CVV</label>
                                <input type="text" placeholder="123" />
                            </FieldBlock>
                        </PaymentGrid>

                        <SaveCardRow>
                            <label htmlFor="save-card">
                                <input type="checkbox" id="save-card" />
                                Salvar cartão para próximas compras
                            </label>
                        </SaveCardRow>

                        {/* Shipping */}
                        <FormSection>
                            <h2>Endereço de Entrega</h2>
                            <PaymentGrid>
                                <FieldBlock style={{ gridColumn: '1 / -1' }}>
                                    <label>CEP</label>
                                    <input type="text" placeholder="00000-000" />
                                </FieldBlock>
                                <FieldBlock style={{ gridColumn: '1 / -1' }}>
                                    <label>Endereço Completo</label>
                                    <input type="text" placeholder="Rua, número, complemento" />
                                </FieldBlock>
                                <FieldBlock>
                                    <label>Cidade</label>
                                    <input type="text" placeholder="Sua cidade" />
                                </FieldBlock>
                                <FieldBlock>
                                    <label>Estado</label>
                                    <input type="text" placeholder="UF" />
                                </FieldBlock>
                            </PaymentGrid>
                        </FormSection>

                        <PrimaryButton style={{ width: '100%', justifyContent: 'center', padding: '24px', fontSize: 13 }}>
                            CONFIRMAR PEDIDO
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock</span>
                        </PrimaryButton>
                    </FormSection>
                </div>

                {/* Right: Summary */}
                <SummaryCard>
                    <h2>Sua Coleção</h2>

                    {[
                        {
                            name: 'Oud Sombre', detail: '100ml · Eau de Parfum', price: 'R$ 295,00',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfRtyYKjhsvt1w1xbIHiSc0slONAzBg9m3CFeV-lYuMZNTLiZBHEOiMX8UXh-kc5mYeZ-jcJg209-fJ913qTwiNxhNpnbl_ACkad3JVw5aWBYhcSZlbFt8pbyXnqSSY9Lk0sFJ2Ph4i3DksglT4tw1Hj18L-xh2H-_lLMXMqv6YIIA77-YQqy9JRHfnXGz2mwfwvKoyTRImO8g9BRUO7Wn2Hn9lG8F-dbBsywgLfvqYG3r-Ox2bloaTblNpa7XcE-YeOAXJbBGcac',
                        },
                        {
                            name: 'Nuit Dorée', detail: '50ml · Parfum', price: 'R$ 320,00',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbpaLoRnEor91tXraGUugDHwsUzjjc6xCEljbu2WxwsPwnCANZSAV1HPymsJoj7rcb5GA_qK5gO55adTmMvxeTA9tnqsaM2K1VvPOK-9sb9ixT9Pw8_Q1jFD49FTTcti5PRKUNUuQ-v6QUmzbojMgaPuYRJqRMf-mnLjFmIs1PFOy_pNv4PWzzKI92H_MSYylkV1PgpQaZ7QUHsSzogtoSJovt-5xV6lZ_ZuA8UMgqhq8pSVK_51cKlrytNack9iMfnjvdJCigRNE',
                        },
                    ].map((item) => (
                        <OrderItem key={item.name}>
                            <div className="thumb">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="details">
                                <h3>{item.name}</h3>
                                <p>{item.detail}</p>
                                <span>{item.price}</span>
                            </div>
                        </OrderItem>
                    ))}

                    <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
                        <PriceLine>
                            <span>Subtotal</span>
                            <span>R$ 615,00</span>
                        </PriceLine>
                        <PriceLine>
                            <span>Frete</span>
                            <span style={{ color: '#4caf50' }}>Grátis</span>
                        </PriceLine>
                        <PriceLine $total>
                            <span>Total</span>
                            <span>R$ 615,00</span>
                        </PriceLine>
                    </div>

                    <CouponInput>
                        <input type="text" placeholder="Código de Convite" />
                        <button>Aplicar</button>
                    </CouponInput>

                    <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 8, color: '#4d4635' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
                        <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#4d4635', letterSpacing: '0.05em' }}>
                            Pagamento 100% seguro e criptografado
                        </span>
                    </div>
                </SummaryCard>
            </CheckoutLayout>
        </PageContainer>
    );
}