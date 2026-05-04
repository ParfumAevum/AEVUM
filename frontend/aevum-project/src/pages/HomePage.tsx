import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
  PageContainer,
  PrimaryButton,
  GhostButton,
  LabelCaps,
  EditorialDivider,
} from '../components/UI';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  padding: 0 48px;
  overflow: hidden;

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.6;
    }

    .gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, #0A0A0A 30%, rgba(10,10,10,0.4) 70%, transparent);
    }
  }

  .hero-content {
    position: relative;
    z-index: 10;
    max-width: 700px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
  padding-bottom: 32px;
  border-bottom: 1px solid #1a1a1a;

  .view-all {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: 8px;
    transition: gap 0.3s ease;

    &:hover {
      gap: 16px;
    }
  }
`;

const CarouselRow = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 48px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PromoCard = styled.div`
  position: relative;
  cursor: pointer;

  .badge {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 20;
    background: ${({ theme }) => theme.colors.primaryContainer};
    color: ${({ theme }) => theme.colors.onPrimary};
    padding: 4px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
  }

  .img-box {
    aspect-ratio: 1;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    border: 1px solid rgba(212, 175, 55, 0.2);
    transition: box-shadow 0.3s ease;

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  &:hover .img-box {
    box-shadow: 0 0 50px rgba(212, 175, 55, 0.1);
  }
`;

const ProductCard = styled.div`
  min-width: 280px;
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.12);
  border-radius: 24px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(242, 202, 80, 0.3);
  }

  .card-image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: ${({ theme }) => theme.colors.surfaceContainer};
    border: 1px solid rgba(212, 175, 55, 0.15);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h3 {
    font-family: 'Noto Serif', serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

const BentoGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 0 48px;
  margin-bottom: 160px;

  @media (min-width: 768px) {
    grid-template-columns: 5fr 7fr;
  }
`;

const RankList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const RankItem = styled.div`
  display: flex;
  gap: 32px;
  cursor: pointer;

  .thumb {
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border: 1px solid rgba(212, 175, 55, 0.2);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
      font-family: 'Noto Serif', serif;
      font-size: 20px;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.onSurface};
      transition: transform 0.3s ease;
    }
  }

  &:hover .info h4 {
    transform: translateX(8px);
  }
`;

const BoutiqueSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 160px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  .map-wrapper {
    height: 600px;
    overflow: hidden;

    iframe {
      width: 100%;
      height: 100%;
      filter: grayscale(1) invert(1) contrast(1.5);
    }
  }

  .boutique-info {
    background: ${({ theme }) => theme.colors.surfaceContainer};
    padding: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p.body {
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      line-height: 1.6;
      color: #666;
      margin-bottom: 48px;
    }

    .detail {
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: #ccc;
      margin-bottom: 16px;

      span.material-symbols-outlined {
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    .map-link {
      margin-top: 48px;
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      padding-bottom: 8px;
      align-self: flex-start;
      transition: border-color 0.3s ease;
      cursor: pointer;

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const BookingSection = styled.section`
  padding: 0 48px 120px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    padding: 0 24px 80px;
  }

  .section-title {
    margin-bottom: 32px;
  }

  .grid-form {
    display: grid;
    grid-template-columns: 1fr 480px;
    gap: 40px;
    align-items: flex-start;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .form-block {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .field-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .form-input {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-input label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
  }

  .form-input input,
  .form-input select,
  .form-input textarea {
    width: 100%;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border: 1px solid rgba(255,255,255,0.08);
    color: ${({ theme }) => theme.colors.onSurface};
    padding: 16px 18px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    outline: none;
  }

  .form-input textarea {
    min-height: 160px;
    resize: vertical;
  }

  .form-note {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.outline};
    line-height: 1.7;
  }

  .submit-button {
    margin-top: 24px;
    width: 100%;
    justify-content: center;
  }
`;

const FooterSection = styled.footer`
  padding: 32px 48px 24px;
  border-top: 1px solid rgba(255,255,255,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 32px 24px 24px;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.surfaceBright};
  }

  .footer-copy {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.surfaceBright};
  }
`;

const SiteSection = styled.section`
  padding: 0 48px;
  margin-bottom: 160px;
`;

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      note: 'OUD & AMBER',
      name: "L'Obsidienne Noire",
      price: '€ 285,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M',
    },
    {
      id: 2,
      note: 'MYRRH & INCENSE',
      name: 'Temple of Silence',
      price: '€ 310,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw',
    },
    {
      id: 3,
      note: 'SANDALWOOD',
      name: 'Velvet Horizon',
      price: '€ 245,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSxLDapIK7DMLpCJrcycO2Z6pPq9OFFkRb4JK62Ukdr8va1A6bIgRMhNKdI2oy8pSJTPc1hVicMZtRtRT6N6LDZRa6GVDh-RZzr9QBL86NF_powVE3k2eGIyev8DBo_5ZQhh-xknqOZySOJQ7jIrjL_BRV-QpjLN4HcywxAoVEGm7UIDAsQuyXEmoGx1VWo1gCA6PqxpuQyzOTFnks5f7QOwgPJcMFXusWcnAQXGb885HI0qlzbCczwAUxkRpjAl6CFHr7sBGpaDA',
    },
  ];

  const promoProducts = [
    {
      id: 1, discount: '-15%', name: 'Midnight Saffron', price: '€ 187,00', original: '€ 220,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCEWabo0fzLAVT6mwzIHJ3KEEe07iBnxHmkehbVPhh9aAK-QkGcvYQ_ijA-Nye2HqXG2txREJ-gYAGnQLSL6acwcIg590yQFT-9YBWPlmfTmMXR292_YKbr9VnkeaLfkJ9gHTmc4jQ1lcCIJHwbjwoRoAGQ5OBdfZML58jf1Yh7WmnZbHNovNz_kz6T1QSd82rHoDVzHd1kFNdUx8aT7JQYa4qDr9usDUttSaDbHqcJMsqhzTFqKtMRPPVVHe79_vUWBv91jTJSUo',
    },
    {
      id: 2, discount: '-20%', name: 'Imperial Musk', price: '€ 232,00', original: '€ 290,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDziOaLM9wwnB_W_eeIMOFTEgp_N91XB3pcr36b7OFD9vDL8pbKUH3iGkjTTpfkNTS53o1xY04e1SmUKXdfj0aX4S7Xokd8mesTRrpWDsJ28nsLYuo5ELmTZKybaerbVqqHemMDe_c4ux530dmI2mRZCogVfbUJg6jHdVKkRjGQTOHjOy_aRT0srYiUOryA-xVoWi1S1l_R9jtctXb01rjgit1n35FbwLVId-lcEoUc139eqboi4u47PRVJWEXTGWOX1rTiiXF0jco',
    },
    {
      id: 3, discount: '-10%', name: 'Oceanic Amber', price: '€ 202,50', original: '€ 225,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA2KICocmhqMHMKr_W2b7JmoagLACD4OvjMG7w7P9QPpgcGj7B6-riOgvXi57SniLS9rm6amuyq3TNrGx8E9nDaIO96GOZ8kHCllF7Inm_FocTv7F9LUpfSxRj8UT7UC3TwbcdSKJp_NqB1FqUoY5PkYbj5eFz7iLH8hH2DdXjckCaLHrR1pHixhbAzpz0CrUGOOTBHW6XNsmwdGYHD0eT7_ulvjpx7XKpK8F2LCIXQHNetdVpynDNsCEy3_QDgi3S2sPu52oQKB8',
    },
    {
      id: 4, discount: '-25%', name: 'Golden Myrrh Set', price: '€ 337,50', original: '€ 450,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA5mt_2vJewdQl4f488nrfCfTZY2dx2c6bGCpMr1Vy-pu5B5DprlXcqGw-7GsDpiD2dEjJ7oEQCmSJUg0ANhLa0nLfIHjmhwY4V8WcqKKJOEAEo7EuDsmHjnTSnFhpPeCZMDD7z05_jyf3kfEGCCh9uwcwVlNjJVLT7GN-eLLyLS6J-G_beBrlMjP5vf-Sk6r80KsitASTV-bUwz495RBz7qcQ_e1X7S_jpGoFxhzf344X8TtsSRmldzgkZODx-X7Gh76u2pRr_Fo',
    },
  ];

  return (
    <PageContainer>
      <Navbar />

      {/* Hero */}
      <HeroSection>
        <div className="hero-bg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLgqBrlPYwOcjpiFxPQDUZD1bZIUtAaYfEngjhmWGiGr4mO0Agi8mt7FtFCKdA7VEbjaJKIg6LahETN2Z97KC7LLahrp4ry8oqd5PoSlsYVB5nWKEBKKjwOA5MuoWUtXfmYp607gNGlJJCK9w8wXbEMiTC5_ajDfIfqIFJRiMIimNGXNVlsbBSETwrWnPz4ShMs-y-Yb4Nw-h3M9EwkVpc5uffkDtch2crPM8K-WGSKtXAuUalA7Zt4TgmUBktmeDFktNGataP9Ps"
            alt="AEVUM Hero"
          />
          <div className="gradient-overlay" />
        </div>
        <div className="hero-content">
          <LabelCaps style={{ color: '#f2ca50', display: 'block', marginBottom: 24, letterSpacing: '0.3em' }}>
            NEW COLLECTION 2024
          </LabelCaps>
          <h1 style={{
            fontFamily: 'Noto Serif', fontSize: 'clamp(48px, 6vw, 84px)',
            fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: '#e5e2e1', marginBottom: 48
          }}>
            A Essência da<br />Eternidade
          </h1>
          <Link to="/catalogo">
            <PrimaryButton>DESCUBRA A COLEÇÃO</PrimaryButton>
          </Link>
        </div>
      </HeroSection>

      {/* Carrossel 1 — Featured */}
      <SiteSection>
        <SectionHeader>
          <div>
            <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1' }}>
              Nossa Casa em Recife
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#555', marginTop: 8 }}>
              Peças exclusivas selecionadas para o conhecedor exigente.
            </p>
          </div>
          <a href="#" className="view-all">
            VER TODOS <span className="material-symbols-outlined">trending_flat</span>
          </a>
        </SectionHeader>

        <CarouselRow>
          {featuredProducts.map((p) => (
            <ProductCard key={p.id}>
              <div className="card-image-wrapper">
                <img src={p.img} alt={p.name} />
              </div>
              <LabelCaps style={{ color: '#555', display: 'block', marginBottom: 8 }}>{p.note}</LabelCaps>
              <h3>{p.name}</h3>
              <p style={{ color: '#f2ca50', marginTop: 16, fontFamily: 'Inter', fontSize: 16 }}>{p.price}</p>
            </ProductCard>
          ))}
        </CarouselRow>
      </SiteSection>

      {/* Carrossel 2 — Promos */}
      <SiteSection>
        <SectionHeader>
          <div>
            <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1' }}>
              Oportunidades Exclusivas
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#555', marginTop: 8 }}>
              Oportunidades únicas de adquirir fragmentos da nossa história.
            </p>
          </div>
        </SectionHeader>

        <PromoGrid>
          {promoProducts.map((p) => (
            <PromoCard key={p.id}>
              <div className="badge">{p.discount}</div>
              <div className="img-box">
                <img src={p.img} alt={p.name} />
              </div>
              <LabelCaps style={{ color: '#e5e2e1', display: 'block' }}>{p.name}</LabelCaps>
              <div style={{ display: 'flex', gap: 16, marginTop: 8, alignItems: 'center' }}>
                <span style={{ color: '#f2ca50', fontFamily: 'Inter', fontSize: 16 }}>{p.price}</span>
                <span style={{ color: '#444', fontFamily: 'Inter', fontSize: 14, textDecoration: 'line-through' }}>{p.original}</span>
              </div>
            </PromoCard>
          ))}
        </PromoGrid>
      </SiteSection>

      <EditorialDivider style={{ margin: '0 48px 160px' }} />

      {/* Bento — Rankings + Featured editorial */}
      <BentoGrid>
        <div>
          <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1', marginBottom: 32 }}>
            Mais Vendidos
          </h2>
          <RankList>
            {[
              { rank: '01', name: 'Noir Eternal', price: 'R$ 295,00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfRtyYKjhsvt1w1xbIHiSc0slONAzBg9m3CFeV-lYuMZNTLiZBHEOiMX8UXh-kc5mYeZ-jcJg209-fJ913qTwiNxhNpnbl_ACkad3JVw5aWBYhcSZlbFt8pbyXnqSSY9Lk0sFJ2Ph4i3DksglT4tw1Hj18L-xh2H-_lLMXMqv6YIIA77-YQqy9JRHfnXGz2mwfwvKoyTRImO8g9BRUO7Wn2Hn9lG8F-dbBsywgLfvqYG3r-Ox2bloaTblNpa7XcE-YeOAXJbBGcac' },
              { rank: '02', name: 'Golden Oud', price: 'R$ 320,00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbpaLoRnEor91tXraGUugDHwsUzjjc6xCEljbu2WxwsPwnCANZSAV1HPymsJoj7rcb5GA_qK5gO55adTmMvxeTA9tnqsaM2K1VvPOK-9sb9ixT9Pw8_Q1jFD49FTTcti5PRKUNUuQ-v6QUmzbojMgaPuYRJqRMf-mnLjFmIs1PFOy_pNv4PWzzKI92H_MSYylkV1PgpQaZ7QUHsSzogtoSJovt-5xV6lZ_ZuA8UMgqhq8pSVK_51cKlrytNack9iMfnjvdJCigRNE' },
            ].map((item) => (
              <RankItem key={item.rank}>
                <div className="thumb">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="info">
                  <LabelCaps style={{ color: '#f2ca50', fontSize: 10, marginBottom: 8, display: 'block' }}>
                    RANK #{item.rank}
                  </LabelCaps>
                  <h4>{item.name}</h4>
                  <p style={{ color: '#555', fontFamily: 'Inter', fontSize: 16, marginTop: 4 }}>{item.price}</p>
                </div>
              </RankItem>
            ))}
          </RankList>
        </div>

        <div>
          <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1', marginBottom: 32 }}>
            Em Destaque
          </h2>
          <div style={{ position: 'relative', height: 400, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)' }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsZGNPmgPq-w_gl4R2h2__HBEOq7MvMeqZ9fdcwyKb79MqLBHXtzFR2jmeTXKGHM8P6KdPwn74at83-pkEdq-2c0vilGZu-79hHVhNGQY0ruSP_GOqKRqjjDzpALUqq1QQ0RaRtupi1mLP4BwWvaUY1A116uocMmT-3XiFoNpVlZcUUDP6YwkHr1rwND494I6BRbWeGfbRMw2ZH7hbKfO_9QvzVCFPXnudcIuk7VW2maerERlNiGg"
              alt="Trending"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48
            }}>
              <LabelCaps style={{ color: '#d4af37', display: 'block', marginBottom: 12 }}>TRENDING NOW</LabelCaps>
              <h3 style={{ fontFamily: 'Noto Serif', fontSize: 36, fontWeight: 300, color: '#e5e2e1', marginBottom: 16 }}>
                The Ritual of Mist
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#ccc', maxWidth: 400, marginBottom: 32 }}>
                Uma nova abordagem ao frescor, inspirada no orvalho das florestas de Lisboa.
              </p>
              <GhostButton style={{ alignSelf: 'flex-start' }}>EXPLORAR TENDÊNCIA</GhostButton>
            </div>
          </div>
        </div>
      </BentoGrid>

      {/* Boutique */}
      <BoutiqueSection>
        <div className="map-wrapper">
          <iframe
            title="AEVUM Boutique"
            src="https://maps.google.com/maps?q=Avenida+Boa+Viagem,+123,+Recife,+PE&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
          />
        </div>
        <div className="boutique-info">
          <LabelCaps style={{ color: '#f2ca50', display: 'block', marginBottom: 24 }}>A BOUTIQUE</LabelCaps>
          <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1', marginBottom: 32 }}>
            Nossa Casa em Recife
          </h2>
          <p className="body">
            Situada na icônica orla da Boa Viagem, nossa flagship store convida você para uma imersão sensorial única. Um refúgio de silêncio e sofisticação tropical onde o tempo se dissolve entre o mármore e o oceano.
          </p>
          <div className="detail">
            <span className="material-symbols-outlined">location_on</span>
            Avenida Boa Viagem, 123, Boa Viagem, Recife — PE
          </div>
          <div className="detail">
            <span className="material-symbols-outlined">schedule</span>
            Segunda a Sábado: 10:00 — 19:00
          </div>
          <span className="map-link">VER NO MAPA</span>
        </div>
      </BoutiqueSection>

      <BookingSection>
        <div className="section-title">
          <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1', marginBottom: 12 }}>
            Nossa Casa em Recife
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#666', maxWidth: 720 }}>
            Permita que nossos mestres perfumistas encontrem sua assinatura invisível. Agende uma sessão privada em nossa boutique ou virtualmente.
          </p>
        </div>

        <div className="grid-form">
          <div className="form-block">
            <div className="form-input">
              <label>Nome Completo</label>
              <input type="text" placeholder="Insira seu nome" />
            </div>
            <div className="form-input">
              <label>Email</label>
              <input type="email" placeholder="seu@email.com" />
            </div>
            <div className="field-group">
              <div className="form-input">
                <label htmlFor="preference-select">Preferência</label>
                <select id="preference-select" aria-label="Preferência de sessão">
                  <option>Sessão em Lisboa</option>
                  <option>Sessão em Recife</option>
                  <option>Sessão Online</option>
                </select>
              </div>
              <div className="form-input">
                <label>Notas de Interesse</label>
                <textarea placeholder="Ex: Sândalo, Oud, Bergamota..." />
              </div>
            </div>
            <div className="submit-button">
              <PrimaryButton style={{ width: '100%' }}>SOLICITAR AGENDAMENTO</PrimaryButton>
            </div>
          </div>

          <div className="form-block">
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 20, minHeight: 360 }}>
              <LabelCaps style={{ color: '#f2ca50', display: 'block', marginBottom: 24 }}>Nossa Casa em Recife</LabelCaps>
              <h3 style={{ fontFamily: 'Noto Serif', fontSize: 28, fontWeight: 400, color: '#e5e2e1', marginBottom: 24 }}>
                Uma experiência de perfumaria feita sob medida.
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#ccc', lineHeight: 1.8 }}>
                Descubra um atendimento exclusivo com consultoria sensorial, fragrâncias raras e harmonizações por assinatura.
              </p>
            </div>
          </div>
        </div>
      </BookingSection>

      <FooterSection>
        <LabelCaps style={{ color: '#f2ca50', fontSize: 14, letterSpacing: '0.35em' }}>AEVUM</LabelCaps>
        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Shipping</span>
          <span>Returns</span>
          <span>Boutique Locator</span>
        </div>
        <div className="footer-copy">
          © 2024 AEVUM. The art of silent luxury.
        </div>
      </FooterSection>
    </PageContainer>
  );
}