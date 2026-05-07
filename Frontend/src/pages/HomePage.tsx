// HomePage.tsx
// Página inicial da loja. Exibe hero rotativo, produtos em destaque, promoções e seção de agendamento.
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import styled from 'styled-components';
import {
  PageContainer,
  PrimaryButton,
  GhostButton,
} from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  HeroSection,
  HeroLabel,
  HeroTitle,
  HeroSubtitle,
  HeroControls,
  SlideDot,
  SiteSection,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  ViewAllLink,
  CarouselRow,
  ProductCard,
  CardNoteLabel,
  ProductPrice,
  PromoGrid,
  PromoCard,
  PromoNameLabel,
  PromoPriceGroup,
  PromoPrice,
  PromoOriginal,
  StyledEditorialDivider,
  BentoGrid,
  RankList,
  RankItem,
  RankBadgeLabel,
  RankHeading,
  RankPrice,
  FeaturedCard,
  FeaturedImage,
  FeaturedOverlay,
  FeaturedBadge,
  FeaturedHeadline,
  FeaturedText,
  BoutiqueSection,
  SectionLabel,
  BoutiqueBodyText,
  BoutiqueDetail,
  MapLink,
  BookingSection,
  BookingHeading,
  BookingCopy,
  FormPanel,
  FormPanelHeading,
  FormPanelText,
  FullWidthButton,
  FooterSection,
  FooterBrand,
  FooterLinksRow,
  FooterCopyText,
} from '../styles/HomeStyle';

const HeroContentWrapper = styled.div`
  animation: fadeIn 0.8s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { logado } = useAuth();
  const { adicionarItem } = useCart();

  // Função para redirecionar para login ou finalizar compra
  function handleComprarAgora(produto: { id: number; name: string; price: string }) {
    if (!logado) {
      navigate("/login");
    } else {
      adicionarItem({ id: produto.id, nome: produto.name, preco: parseFloat(produto.price.replace(/[^0-9.-]/g, '')), notas: "" });
      navigate("/finalizar-compra");
    }
  }

  // Função para adicionar ao carrinho
  function handleAdicionarCarrinho(produto: { id: number; name: string; price: string }) {
    adicionarItem({ id: produto.id, nome: produto.name, preco: parseFloat(produto.price.replace(/[^0-9.-]/g, '')), notas: "" });
    alert("Adicionado ao carrinho de compras!");
  }

  const heroSlides = [
    {
      id: 1,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M',
      title: 'L\'Obsidienne Noire',
      subtitle: 'O silêncio eloquente de uma fragrância atemporal.'
    },
    {
      id: 2,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw',
      title: 'Temple of Silence',
      subtitle: 'A serenidade de um templo antigo em forma líquida.'
    },
    {
      id: 3,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSxLDapIK7DMLpCJrcycO2Z6pPq9OFFkRb4JK62Ukdr8va1A6bIgRMhNKdI2oy8pSJTPc1hVicMZtRtRT6N6LDZRa6GVDh-RZzr9QBL86NF_powVE3k2eGIyev8DBo_5ZQhh-xknqOZySOJQ7jIrjL_BRV-QpjLN4HcywxAoVEGm7UIDAsQuyXEmoGx1VWo1gCA6PqxpuQyzOTFnks5f7QOwgPJcMFXusWcnAQXGb885HI0qlzbCczwAUxkRpjAl6CFHr7sBGpaDA',
      title: 'Velvet Horizon',
      subtitle: 'O horizonte infinito de um veludo etéreo.'
    },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const featuredProducts = [
    {
      id: 1,
      note: 'OUD & AMBER',
      name: "L'Obsidienne Noire",
      price: 'R$ 285,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M',
    },
    {
      id: 2,
      note: 'MYRRH & INCENSE',
      name: 'Temple of Silence',
      price: 'R$ 310,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw',
    },
    {
      id: 3,
      note: 'SANDALWOOD',
      name: 'Velvet Horizon',
      price: 'R$ 245,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSxLDapIK7DMLpCJrcycO2Z6pPq9OFFkRb4JK62Ukdr8va1A6bIgRMhNKdI2oy8pSJTPc1hVicMZtRtRT6N6LDZRa6GVDh-RZzr9QBL86NF_powVE3k2eGIyev8DBo_5ZQhh-xknqOZySOJQ7jIrjL_BRV-QpjLN4HcywxAoVEGm7UIDAsQuyXEmoGx1VWo1gCA6PqxpuQyzOTFnks5f7QOwgPJcMFXusWcnAQXGb885HI0qlzbCczwAUxkRpjAl6CFHr7sBGpaDA',
    },
  ];

  const promoProducts = [
    {
      id: 1, discount: '-15%', name: 'Midnight Saffron', price: 'R$ 187,00', original: 'R$ 220,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCEWabo0fzLAVT6mwzIHJ3KEEe07iBnxHmkehbVPhh9aAK-QkGcvYQ_ijA-Nye2HqXG2txREJ-gYAGnQLSL6acwcIg590yQFT-9YBWPlmfTmMXR292_YKbr9VnkeaLfkJ9gHTmc4jQ1lcCIJHwbjwoRoAGQ5OBdfZML58jf1Yh7WmnZbHNovNz_kz6T1QSd82rHoDVzHd1kFNdUx8aT7JQYa4qDr9usDUttSaDbHqcJMsqhzTFqKtMRPPVVHe79_vUWBv91jTJSUo',
    },
    {
      id: 2, discount: '-20%', name: 'Imperial Musk', price: 'R$ 232,00', original: 'R$ 290,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDziOaLM9wwnB_W_eeIMOFTEgp_N91XB3pcr36b7OFD9vDL8pbKUH3iGkjTTpfkNTS53o1xY04e1SmUKXdfj0aX4S7Xokd8mesTRrpWDsJ28nsLYuo5ELmTZKybaerbVqqHemMDe_c4ux530dmI2mRZCogVfbUJg6jHdVKkRjGQTOHjOy_aRT0srYiUOryA-xVoWi1S1l_R9jtctXb01rjgit1n35FbwLVId-lcEoUc139eqboi4u47PRVJWEXTGWOX1rTiiXF0jco',
    },
    {
      id: 3, discount: '-10%', name: 'Oceanic Amber', price: 'R$ 202,00', original: 'R$ 225,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA2KICocmhqMHMKr_W2b7JmoagLACD4OvjMG7w7P9QPpgcGj7B6-riOgvXi57SniLS9rm6amuyq3TNrGx8E9nDaIO96GOZ8kHCllF7Inm_FocTv7F9LUpfSxRj8UT7UC3TwbcdSKJp_NqB1FqUoY5PkYbj5eFz7iLH8hH2DdXjckCaLHrR1pHixhbAzpz0CrUGOOTBHW6XNsmwdGYHD0eT7_ulvjpx7XKpK8F2LCIXQHNetdVpynDNsCEy3_QDgi3S2sPu52oQKB8',
    },
    {
      id: 4, discount: '-25%', name: 'Golden Myrrh Set', price: 'R$ 337,50', original: 'R$ 450,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA5mt_2vJewdQl4f488nrfCfTZY2dx2c6bGCpMr1Vy-pu5B5DprlXcqGw-7GsDpiD2dEjJ7oEQCmSJUg0ANhLa0nLfIHjmhwY4V8WcqKKJOEAEo7EuDsmHjnTSnFhpPeCZMDD7z05_jyf3kfEGCCh9uwcwVlNjJVLT7GN-eLLyLS6J-G_beBrlMjP5vf-Sk6r80KsitASTV-bUwz495RBz7qcQ_e1X7S_jpGoFxhzf344X8TtsSRmldzgkZODx-X7Gh76u2pRr_Fo',
    },
  ];

  return (
    <PageContainer>
      <Navbar />

      {/* Hero: seção principal de destaque com imagem e call-to-action */}
      <HeroSection>
        <div className="hero-bg">
          <img
            src={heroSlides[activeSlide]?.img}
            alt={heroSlides[activeSlide]?.title || 'AEVUM Hero'}
          />
          <div className="gradient-overlay" />
        </div>
        <HeroContentWrapper className="hero-content">
          <HeroLabel>NEW COLLECTION 2026</HeroLabel>
          <HeroTitle>{heroSlides[activeSlide]?.title}</HeroTitle>
          <HeroSubtitle>{heroSlides[activeSlide]?.subtitle}</HeroSubtitle>
          <Link to="/catalogo">
            <PrimaryButton>DESCUBRA A COLEÇÃO</PrimaryButton>
          </Link>
          <HeroControls>
            {heroSlides.map((slide, index) => (
              <SlideDot
                key={slide.id}
                type="button"
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={index === activeSlide ? 'true' : 'false'}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </HeroControls>
        </HeroContentWrapper>
      </HeroSection>

      {/* Carrossel 1 — Featured */}
      <SiteSection>
        <SectionHeader>
          <div>
            <SectionTitle>Nossa Casa em Recife</SectionTitle>
            <SectionDescription>
              Peças exclusivas selecionadas para o conhecedor exigente.
            </SectionDescription>
          </div>
          <ViewAllLink href="#">
            VER TODOS <span className="material-symbols-outlined"></span>
          </ViewAllLink>
        </SectionHeader>

        <CarouselRow>
          {featuredProducts.map((p) => (
            <ProductCard key={p.id}>
              <div className="card-image-wrapper">
                <img src={p.img} alt={p.name} />
              </div>
              <CardNoteLabel>{p.note}</CardNoteLabel>
              <h3>{p.name}</h3>
              <ProductPrice>{p.price}</ProductPrice>
              <PrimaryButton type="button" onClick={() => handleComprarAgora(p)}>
                Comprar
              </PrimaryButton>
              <GhostButton type="button" onClick={() => handleAdicionarCarrinho(p)}>
                Adicionar ao carrinho
              </GhostButton>
            </ProductCard>
          ))}
        </CarouselRow>
      </SiteSection>

      {/* Carrossel 2 — Promos */}
      <SiteSection>
        <SectionHeader>
          <div>
            <SectionTitle>Oportunidades Exclusivas</SectionTitle>
            <SectionDescription>
              Oportunidades únicas de adquirir fragmentos da nossa história.
            </SectionDescription>
          </div>
        </SectionHeader>

        <PromoGrid>
          {promoProducts.map((p) => (
            <PromoCard key={p.id}>
              <div className="badge">{p.discount}</div>
              <div className="img-box">
                <img src={p.img} alt={p.name} />
              </div>
              <PromoNameLabel>{p.name}</PromoNameLabel>
              <PromoPriceGroup>
                <PromoPrice>{p.price}</PromoPrice>
                <PromoOriginal>{p.original}</PromoOriginal>
              </PromoPriceGroup>
              <PrimaryButton type="button" onClick={() => handleComprarAgora(p)}>
                Comprar
              </PrimaryButton>
              <GhostButton type="button" onClick={() => handleAdicionarCarrinho(p)}>
                Adicionar ao carrinho
              </GhostButton>
            </PromoCard>
          ))}
        </PromoGrid>
      </SiteSection>

      <StyledEditorialDivider />

      {/* Bento — Rankings + Featured editorial */}
      <BentoGrid>
        <div>
          <SectionTitle>Mais Vendidos</SectionTitle>
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
                  <RankBadgeLabel>RANK #{item.rank}</RankBadgeLabel>
                  <RankHeading>{item.name}</RankHeading>
                  <RankPrice>{item.price}</RankPrice>
                </div>
              </RankItem>
            ))}
          </RankList>
        </div>

        <div>
          <SectionTitle>Em Destaque</SectionTitle>
          <FeaturedCard>
            <FeaturedImage
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <FeaturedOverlay>
              <FeaturedBadge>TRENDING NOW</FeaturedBadge>
              <FeaturedHeadline>Fakhar Gold Extrait Lattafa</FeaturedHeadline>
              <FeaturedText>
                Uma nova abordagem ao frescor, inspirada no orvalho das florestas de Lisboa.
              </FeaturedText>
              <GhostButton>EXPLORAR TENDÊNCIA</GhostButton>
            </FeaturedOverlay>
          </FeaturedCard>
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
          <SectionLabel></SectionLabel>
          <SectionTitle>Nossa Casa em Recife</SectionTitle>
          <BoutiqueBodyText>
            Situada na icônica orla da Boa Viagem, nossa flagship store convida você para uma imersão sensorial única. Um refúgio de silêncio e sofisticação tropical onde o tempo se dissolve entre o mármore e o oceano.
          </BoutiqueBodyText>
          <BoutiqueDetail>
            <span className="material-symbols-outlined"></span>
            Avenida Boa Viagem, 123, Boa Viagem, Recife — PE
          </BoutiqueDetail>
          <BoutiqueDetail>
            <span className="material-symbols-outlined"></span>
            Segunda a Sábado: 10:00 — 19:00
          </BoutiqueDetail>
          <MapLink>VER NO MAPA</MapLink>
        </div>
      </BoutiqueSection>

      <BookingSection>
        <div className="section-title">
          <BookingHeading>Nossa Casa em Recife</BookingHeading>
          <BookingCopy>
            Permita que nossos mestres perfumistas encontrem sua assinatura invisível. Agende uma sessão privada em nossa boutique ou virtualmente.
          </BookingCopy>
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
              <FullWidthButton>SOLICITAR AGENDAMENTO</FullWidthButton>
            </div>
          </div>

          <div className="form-block">
            <FormPanel>
              <SectionLabel>Nossa Casa em Recife</SectionLabel>
              <FormPanelHeading>Uma experiência de perfumaria feita sob medida.</FormPanelHeading>
              <FormPanelText>
                Descubra um atendimento exclusivo com consultoria sensorial, fragrâncias raras e harmonizações por assinatura.
              </FormPanelText>
            </FormPanel>
          </div>
        </div>
      </BookingSection>

      <FooterSection>
        <FooterBrand>AEVUM</FooterBrand>
        <FooterLinksRow>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Shipping</span>
          <span>Returns</span>
          <span>Boutique Locator</span>
        </FooterLinksRow>
        <FooterCopyText>
          © 2024 AEVUM. The art of silent luxury.
        </FooterCopyText>
      </FooterSection>
    </PageContainer>
  );
}