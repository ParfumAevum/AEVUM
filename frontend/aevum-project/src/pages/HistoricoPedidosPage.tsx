import styled from 'styled-components';
import Navbar from './Navbar';
import { PageContainer, GhostButton } from '../components/UI';

const PageWrapper = styled.div`
  padding-top: 128px;
  padding-bottom: 96px;
  padding-left: clamp(24px, 4vw, 48px);
  padding-right: clamp(24px, 4vw, 48px);

  @media (max-width: 768px) {
    padding-top: 96px;
    padding-bottom: 48px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const PageHero = styled.section`
  margin-bottom: 80px;

  h1 {
    font-family: 'Noto Serif', serif;
    font-size: clamp(40px, 6vw, 84px);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 16px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.outline};
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 64px;
`;

const FilterChip = styled.button<{ $active?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 10px 24px;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primaryContainer : theme.colors.outlineVariant};
  background: ${({ $active, theme }) => $active ? theme.colors.primaryContainer : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.onPrimary : theme.colors.outline};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryContainer};
    color: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OrderCard = styled.article`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(212, 175, 55, 0.2);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  flex-wrap: wrap;
  gap: 16px;
`;

const OrderMeta = styled.div`
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    display: block;
    margin-bottom: 4px;
  }

  span {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;

const StatusBadge = styled.span<{ $status: 'entregue' | 'processando' | 'cancelado' }>`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 16px;
  border: 1px solid;
  border-color: ${({ $status }) =>
    $status === 'entregue' ? 'rgba(76, 175, 80, 0.4)' :
    $status === 'processando' ? 'rgba(242, 202, 80, 0.4)' :
    'rgba(255, 180, 171, 0.4)'};
  color: ${({ $status }) =>
    $status === 'entregue' ? '#4caf50' :
    $status === 'processando' ? '#f2ca50' :
    '#ffb4ab'};
`;

const OrderItems = styled.div`
  padding: 28px 32px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const ProductMini = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  .thumb {
    width: 72px;
    height: 72px;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    border: 1px solid rgba(212, 175, 55, 0.1);
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    h4 {
      font-family: 'Noto Serif', serif;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.onSurface};
      margin-bottom: 4px;
    }
    p {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.outline};
    }
  }
`;

const orders = [
  {
    id: '#AEV-2024-0081',
    date: '12 Dez, 2024',
    total: 'R$ 595,00',
    status: 'entregue' as const,
    items: [
      { name: "L'Obsidienne Noire", note: '100ml · OUD & AMBER', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M' },
      { name: 'Temple of Silence', note: '50ml · MYRRH', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw' },
    ],
  },
  {
    id: '#AEV-2024-0067',
    date: '28 Nov, 2024',
    total: 'R$ 320,00',
    status: 'entregue' as const,
    items: [
      { name: 'Golden Oud', note: '100ml · OUD', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbpaLoRnEor91tXraGUugDHwsUzjjc6xCEljbu2WxwsPwnCANZSAV1HPymsJoj7rcb5GA_qK5gO55adTmMvxeTA9tnqsaM2K1VvPOK-9sb9ixT9Pw8_Q1jFD49FTTcti5PRKUNUuQ-v6QUmzbojMgaPuYRJqRMf-mnLjFmIs1PFOy_pNv4PWzzKI92H_MSYylkV1PgpQaZ7QUHsSzogtoSJovt-5xV6lZ_ZuA8UMgqhq8pSVK_51cKlrytNack9iMfnjvdJCigRNE' },
    ],
  },
  {
    id: '#AEV-2024-0054',
    date: '03 Nov, 2024',
    total: 'R$ 232,00',
    status: 'processando' as const,
    items: [
      { name: 'Imperial Musk', note: '50ml · MUSK', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDziOaLM9wwnB_W_eeIMOFTEgp_N91XB3pcr36b7OFD9vDL8pbKUH3iGkjTTpfkNTS53o1xY04e1SmUKXdfj0aX4S7Xokd8mesTRrpWDsJ28nsLYuo5ELmTZKybaerbVqqHemMDe_c4ux530dmI2mRZCogVfbUJg6jHdVKkRjGQTOHjOy_aRT0srYiUOryA-xVoWi1S1l_R9jtctXb01rjgit1n35FbwLVId-lcEoUc139eqboi4u47PRVJWEXTGWOX1rTiiXF0jco' },
    ],
  },
];

export default function HistoricoPedidosPage() {
  return (
    <PageContainer>
      <Navbar />
      <PageWrapper>
        <PageHero>
          <h1>Histórico de<br />Compras</h1>
          <p>{orders.length} pedidos realizados</p>
        </PageHero>

        <FilterRow>
          {['Todos', 'Entregues', 'Em Processamento', 'Cancelados'].map((f, i) => (
            <FilterChip key={f} $active={i === 0}>{f}</FilterChip>
          ))}
        </FilterRow>

        <OrderList>
          {orders.map((order) => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderMeta>
                  <MetaItem>
                    <label>Pedido</label>
                    <span>{order.id}</span>
                  </MetaItem>
                  <MetaItem>
                    <label>Data</label>
                    <span>{order.date}</span>
                  </MetaItem>
                  <MetaItem>
                    <label>Total</label>
                    <span style={{ color: '#f2ca50' }}>{order.total}</span>
                  </MetaItem>
                </OrderMeta>

                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <StatusBadge $status={order.status}>
                    {order.status === 'entregue' ? 'Entregue' :
                     order.status === 'processando' ? 'Processando' : 'Cancelado'}
                  </StatusBadge>
                  <GhostButton style={{ padding: '8px 20px', fontSize: 10 }}>VER DETALHES</GhostButton>
                </div>
              </OrderHeader>

              <OrderItems>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {order.items.map((item) => (
                    <ProductMini key={item.name}>
                      <div className="thumb">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="info">
                        <h4>{item.name}</h4>
                        <p>{item.note}</p>
                      </div>
                    </ProductMini>
                  ))}
                </div>
                <span className="material-symbols-outlined" style={{ color: '#4d4635', fontSize: 20 }}>
                  chevron_right
                </span>
              </OrderItems>
            </OrderCard>
          ))}
        </OrderList>
      </PageWrapper>
    </PageContainer>
  );
}