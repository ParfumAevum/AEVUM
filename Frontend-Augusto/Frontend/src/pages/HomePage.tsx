// HomePage.tsx
// Página inicial da loja. Exibe hero rotativo, produtos em destaque, promoções e seção de agendamento.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
  PageContainer,
  PrimaryButton,
  GhostButton,
} from '../components/UI';
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

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE1b8mQwiC8Qz6nM8I3kfM5t2vomRq0U5S3qQ6Z8rA5FxKJr5u4FaVhL4PG8L3eDTeGH3i8QW7kKb2W9x2c1b7ZUGp1hj8kTUPnH5qlp4ZbfK18HfD9N9b8PAE7kQiaNq4cD7Hk0X9tL6P7MvLJt1CjH9WcO2LXx8x1KjZgKKefGDq3FhJg8zRcoQwV_YHJ_dO6UO04wA45JiXJsyK1xZt55o-WzBNHDpYUt6Zg',
      title: 'Horizonte de Veludo',
      subtitle: 'Uma narrativa visual para os sentidos mais seletos.'
    },
    {
      id: 2,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M',
      title: 'L\'Obsidienne Noire',
      subtitle: 'O silêncio eloquente de uma fragrância atemporal.'
    },
    {
      id: 3,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsZGNPmgPq-w_gl4R2h2__HBEOq7MvMeqZ9fdcwyKb79MqLBHXtzFR2jmeTXKGHM8P6KdPwn74at83-pkEdq-2c0vilGZu-79hHVhNGQY0ruSP_GOqKRqjjDzpALUqq1QQ0RaRtupi1mLP4BwWvaUY1A116uocMmT-3XiFoNpVlZcUUDP6YwkHr1rwND494I6BRbWeGfbRMw2ZH7hbKfO_9QvzVCFPXnudcIuk7VW2maerERlNiGg',
      title: 'Golden Myrrh',
      subtitle: 'Um hino dourado à resina sagrada.'
    },
    {
      id: 4,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw',
      title: 'Temple of Silence',
      subtitle: 'A serenidade de um templo antigo em forma líquida.'
    },
    {
      id: 5,
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
    {
      id: 4,
      note: 'GOLD & OUD',
      name: 'Golden Myrrh',
      price: 'R$ 337,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsZGNPmgPq-w_gl4R2h2__HBEOq7MvMeqZ9fdcwyKb79MqLBHXtzFR2jmeTXKGHM8P6KdPwn74at83-pkEdq-2c0vilGZu-79hHVhNGQY0ruSP_GOqKRqjjDzpALUqq1QQ0RaRtupi1mLP4BwWvaUY1A116uocMmT-3XiFoNpVlZcUUDP6YwkHr1rwND494I6BRbWeGfbRMw2ZH7hbKfO_9QvzVCFPXnudcIuk7VW2maerERlNiGg',
    },
    {
      id: 5,
      note: 'SPICE & VELVET',
      name: 'Noir Ambre',
      price: 'R$ 312,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD29bZrW9y1hyWmprvZbLJQaV2jFv8mEUgFEKmW7Vv2pQbA0bXWcQoY7rFL6k8G_7TszQxwotkU3d5WUKzUz5tKlpw5nVk8N7P-A3H7BRaV4vuQd1kEF5DmLuQ0sEyOfE3Zg0hNSVeRfJqLSQdS2t6NNwF_3CBRqjoIY0F-3gurl7xvmlPETgc93fwnh_6i6L6R6GDxk9R6PkzpYbO93A4sCbeY4-DWL1yA5tq4ob6xDy',
    },
    {
      id: 6,
      note: 'OUD & VANILLA',
      name: 'Midnight Velvet',
      price: 'R$ 269,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uD0M7Yg8pW_JmnewZ2Ta2jC6a1GFV6R9IWcN9jXyIxvYi0v5R4kfyT1yRBT9mE5mGv8YWO7J6wI3E3c9O5Hf2WrQY8O1zfvSP7sYiS9LMHzE6o9M8j7G3PnsI8K3ZfP2mQ1ydzN3B4xF5eG6Y8S7d9fJ0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2',
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
    {
      id: 5, discount: '-18%', name: 'Citrus Infini', price: 'R$ 198,00', original: 'R$ 240,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuE3sLd2pYQyI0p8CSKXav0eHj1mg3rGWo6e1LxISMqF7wD2qcHchW7h7j8E_2JU_nO2eN4oBv5qK3jP4Xg9T6bV0w7GmHhY8N3P4dS5fU6lV7wX8yY9z0A1b2C3D4E5F6G7H8I9J0k1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2',
    },
    {
      id: 6, discount: '-12%', name: 'Velvet Smoke', price: 'R$ 255,00', original: 'R$ 290,00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1tA4xQPqR6kL7gWXy3KjzX8Y8ThP8sF7XmA3bC4d5E6F7gH8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2',
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
        <div className="hero-content">
          <HeroLabel>NEW COLLECTION 2024</HeroLabel>
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
        </div>
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsZGNPmgPq-w_gl4R2h2__HBEOq7MvMeqZ9fdcwyKb79MqLBHXtzFR2jmeTXKGHM8P6KdPwn74at83-pkEdq-2c0vilGZu-79hHVhNGQY0ruSP_GOqKRqjjDzpALUqq1QQ0RaRtupi1mLP4BwWvaUY1A116uocMmT-3XiFoNpVlZcUUDP6YwkHr1rwND494I6BRbWeGfbRMw2ZH7hbKfO_9QvzVCFPXnudcIuk7VW2maerERlNiGg"
              alt="Trending"
            />
            <FeaturedOverlay>
              <FeaturedBadge>TRENDING NOW</FeaturedBadge>
              <FeaturedHeadline>The Ritual of Mist</FeaturedHeadline>
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
          <SectionLabel>A BOUTIQUE</SectionLabel>
          <SectionTitle>Nossa Casa em Recife</SectionTitle>
          <BoutiqueBodyText>
            Situada na icônica orla da Boa Viagem, nossa flagship store convida você para uma imersão sensorial única. Um refúgio de silêncio e sofisticação tropical onde o tempo se dissolve entre o mármore e o oceano.
          </BoutiqueBodyText>
          <BoutiqueDetail>
            <span className="material-symbols-outlined">location_on</span>
            Avenida Boa Viagem, 123, Boa Viagem, Recife — PE
          </BoutiqueDetail>
          <BoutiqueDetail>
            <span className="material-symbols-outlined">schedule</span>
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