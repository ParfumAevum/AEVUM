// HistoricoPedidosPage.tsx
// Página que lista pedidos antigos do usuário e exibe status de compras anteriores.
import Navbar from './Navbar';
import { PageContainer, GhostButton } from '../components/UI';
import {
  PageWrapper,
  PageHero,
  FilterRow,
  FilterChip,
  OrderList,
  OrderCard,
  OrderHeader,
  OrderMeta,
  MetaItem,
  StatusBadge,
  OrderItems,
  ProductMini,
} from '../styles/HistoricoPedidosStyle';



export default function HistoricoPedidosPage() {
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