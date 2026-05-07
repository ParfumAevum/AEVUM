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
import { useCart } from "../context/CartContext";

export default function FinalizarCompraPage() {
  const { itens, totalValor } = useCart();

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
                { icon: "", label: "Cartão" },
                { icon: "", label: "PIX" },
                { icon: "", label: "Boleto" },
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
              </span>
            </PrimaryButton>
          </FormSection>
        </div>

        {/* Right: Summary */}
        <SummaryCard>
          <h2>Sua Coleção</h2>

          {itens.map((item) => (
            <OrderItem key={item.id}>
              <div className="thumb">
                <img src={item.imagem || "placeholder.jpg"} alt={item.nome} />
              </div>
              <div className="details">
                <h3>{item.nome}</h3>
                <p>{item.notas || "Notas não informadas"} · {item.quantidade}x</p>
                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
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
              <span>R$ {totalValor.toFixed(2)}</span>
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
