// FinalizarCompraPage.tsx
// Página de checkout. Exibe formulário de pagamento, resumo do pedido e opções de forma de pagamento.
import Navbar from "./Navbar";
import { PageContainer, PrimaryButton } from "../components/UI";
import {
  CheckoutLayout,
  FormSection,
  PaymentMethodRow,
  MethodTab,
  PaymentGrid,
  FieldBlock,
  SaveCardRow,
  SummaryCard,
  OrderItem,
  PriceLine,
  CouponInput,
} from "../styles/FinalizarCompraStyle";

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
                { icon: "credit_card", label: "Cartão" },
                { icon: "pix", label: "PIX" },
                { icon: "receipt_long", label: "Boleto" },
              ].map((m, i) => (
                <MethodTab key={m.label} $active={i === 0}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16 }}
                  >
                    {m.icon}
                  </span>
                  {m.label}
                </MethodTab>
              ))}
            </PaymentMethodRow>

            <PaymentGrid>
              <FieldBlock style={{ gridColumn: "1 / -1" }}>
                <label>Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" />
              </FieldBlock>
              <FieldBlock style={{ gridColumn: "1 / -1" }}>
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
                <FieldBlock style={{ gridColumn: "1 / -1" }}>
                  <label>CEP</label>
                  <input type="text" placeholder="00000-000" />
                </FieldBlock>
                <FieldBlock style={{ gridColumn: "1 / -1" }}>
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

            <PrimaryButton
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "24px",
                fontSize: 13,
              }}
            >
              CONFIRMAR PEDIDO
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                lock
              </span>
            </PrimaryButton>
          </FormSection>
        </div>

        {/* Right: Summary */}
        <SummaryCard>
          <h2>Sua Coleção</h2>

          {[
            {
              name: "Oud Sombre",
              detail: "100ml · Eau de Parfum",
              price: "R$ 295,00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfRtyYKjhsvt1w1xbIHiSc0slONAzBg9m3CFeV-lYuMZNTLiZBHEOiMX8UXh-kc5mYeZ-jcJg209-fJ913qTwiNxhNpnbl_ACkad3JVw5aWBYhcSZlbFt8pbyXnqSSY9Lk0sFJ2Ph4i3DksglT4tw1Hj18L-xh2H-_lLMXMqv6YIIA77-YQqy9JRHfnXGz2mwfwvKoyTRImO8g9BRUO7Wn2Hn9lG8F-dbBsywgLfvqYG3r-Ox2bloaTblNpa7XcE-YeOAXJbBGcac",
            },
            {
              name: "Nuit Dorée",
              detail: "50ml · Parfum",
              price: "R$ 320,00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbpaLoRnEor91tXraGUugDHwsUzjjc6xCEljbu2WxwsPwnCANZSAV1HPymsJoj7rcb5GA_qK5gO55adTmMvxeTA9tnqsaM2K1VvPOK-9sb9ixT9Pw8_Q1jFD49FTTcti5PRKUNUuQ-v6QUmzbojMgaPuYRJqRMf-mnLjFmIs1PFOy_pNv4PWzzKI92H_MSYylkV1PgpQaZ7QUHsSzogtoSJovt-5xV6lZ_ZuA8UMgqhq8pSVK_51cKlrytNack9iMfnjvdJCigRNE",
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

          <div
            style={{
              marginTop: 32,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <PriceLine>
              <span>Subtotal</span>
              <span>R$ 615,00</span>
            </PriceLine>
            <PriceLine>
              <span>Frete</span>
              <span style={{ color: "#4caf50" }}>Grátis</span>
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

          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#4d4635",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
            >
              lock
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 11,
                color: "#4d4635",
                letterSpacing: "0.05em",
              }}
            >
              Pagamento 100% seguro e criptografado
            </span>
          </div>
        </SummaryCard>
      </CheckoutLayout>
    </PageContainer>
  );
}
