// HomePage.tsx
// Página inicial da loja. Exibe hero rotativo, produtos em destaque, promoções e seção de agendamento.
import { useEffect, useState } from 'react';
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

// Hero principal da página inicial com imagem de fundo e chamada para ação.
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  padding: 0 48px;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 560px;
    padding: 0 24px;
  }

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
`;

const ViewAllLink = styled.a`
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
`;

const SectionTitle = styled.h2`
  font-family: 'Noto Serif', serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
  margin-bottom: 0;
`;

const CardNoteLabel = styled(LabelCaps)`
  color: #555;
  display: block;
  margin-bottom: 8px;
`;

const PromoNameLabel = styled(LabelCaps)`
  color: #e5e2e1;
  display: block;
`;

const RankBadgeLabel = styled(LabelCaps)`
  color: #f2ca50;
  display: block;
  font-size: 10px;
  margin-bottom: 8px;
`;

const SectionLabel = styled(LabelCaps)`
  color: #f2ca50;
  display: block;
  margin-bottom: 24px;
`;

const FullWidthButton = styled(PrimaryButton)`
  width: 100%;
`;

const FooterBrand = styled(LabelCaps)`
  color: #f2ca50;
  font-size: 14px;
  letter-spacing: 0.35em;
`;

const StyledEditorialDivider = styled(EditorialDivider)`
  margin: 0 48px 160px;
`;

const SectionDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #555;
  margin-top: 8px;
`;

const ProductPrice = styled.p`
  color: #f2ca50;
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
`;

const PromoPriceGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  align-items: center;
`;

const PromoPrice = styled.span`
  color: #f2ca50;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
`;

const PromoOriginal = styled.span`
  color: #444;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  text-decoration: line-through;
`;

const HeroLabel = styled(LabelCaps)`
  color: #f2ca50;
  display: block;
  margin-bottom: 24px;
  letter-spacing: 0.3em;
`;

const HeroTitle = styled.h1`
  font-family: 'Noto Serif', serif;
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #e5e2e1;
  margin-bottom: 32px;
`;

const HeroSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #d0c5af;
  max-width: 560px;
  margin-bottom: 36px;
`;

const HeroControls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

const SlideDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.18);
  cursor: pointer;

  &[aria-current='true'] {
    background: #f2ca50;
  }
`;

const RankHeading = styled.h4`
  font-family: 'Noto Serif', serif;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.onSurface};
  transition: transform 0.3s ease;
  margin: 0;
`;

const RankPrice = styled.p`
  color: #555;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  margin-top: 4px;
`;

const FeaturedCard = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  border: 1px solid rgba(212,175,55,0.2);
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px;
`;

const FeaturedBadge = styled(LabelCaps)`
  color: #d4af37;
  display: block;
  margin-bottom: 12px;
`;

const FeaturedHeadline = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: 36px;
  font-weight: 300;
  color: #e5e2e1;
  margin-bottom: 16px;
`;

const FeaturedText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #ccc;
  max-width: 400px;
  margin-bottom: 32px;
`;

const BoutiqueBodyText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 48px;
`;

const BoutiqueDetail = styled.div`
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
`;

const MapLink = styled.span`
  margin-top: 48px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid rgba(212,175,55,0.3);
  padding-bottom: 8px;
  align-self: flex-start;
  transition: border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BookingHeading = styled.h2`
  font-family: 'Noto Serif', serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
  margin-bottom: 12px;
`;

const BookingCopy = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #666;
  max-width: 720px;
`;

const FormPanel = styled.div`
  background: rgba(255,255,255,0.02);
  padding: 32px;
  border-radius: 20px;
  min-height: 360px;
`;

const FormPanelHeading = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: 28px;
  font-weight: 400;
  color: #e5e2e1;
  margin-bottom: 24px;
`;

const FormPanelText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #ccc;
  line-height: 1.8;
`;

const FooterLinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.surfaceBright};
`;

const FooterCopyText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.surfaceBright};
`;

const CarouselRow = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 48px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
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
  scroll-snap-align: start;
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

// Seção de agendamento onde o usuário pode solicitar atendimento personalizado.
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
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .submit-button button {
    max-width: 320px;
    width: 100%;
  }
`;

// Rodapé da página com informações de marca e links rápidos.
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

// Dados do carrossel de hero que rotaciona automaticamente na home.
const heroSlides = [
  {
    id: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLgqBrlPYwOcjpiFxPQDUZD1bZIUtAaYfEngjhmWGiGr4mO0Agi8mt7FtFCKdA7VEbjaJKIg6LahETN2Z97KC7LLahrp4ry8oqd5PoSlsYVB5nWKEBKKjwOA5MuoWUtXfmYp607gNGlJJCK9w8wXbEMiTC5_ajDfIfqIFJRiMIimNGXNVlsbBSETwrWnPz4ShMs-y-Yb4Nw-h3M9EwkVpc5uffkDtch2crPM8K-WGSKtXAuUalA7Zt4TgmUBktmeDFktNGataP9Ps',
    title: 'A Essência da Eternidade',
    subtitle: 'Uma coleção que transforma cada momento em memória.',
  },
  {
    id: 2,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR7_PY2QekZBHXT6hG9sANz1oq6YN0mZctsmQ6Xx2fxIUC5Yw-g6ORukv2ka2BnUo7qImvEo7v3J3T3UP8YU5QjZCASXFmpW2TLua63Hjh1rAI9cHnBWhO_ywDAd2cFqU482c7A3WWNokGzA44A-bcsoZRvKSiN5-5A5q_QW-s1tfIGKReOn2DJb5fbwLQfGqZ2DHGccvq7m1nzBYkRGOZ_5WRcD2h7hnnYWj1bHApPdhHc',
    title: 'O Luxo em Movimento',
    subtitle: 'Imagens que respiram a sofisticação da marca.'
  },
  {
    id: 3,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9p16-uHTf5D7_1x4v6PQI4W0wF5OULwT5MOCo9afJUT9rm4FurYWnP8wMktvmnHNolMAZaqoreB2jxAjeYwrkQO_SgRMmNbyjWmJXesVXv2b-8FE9SwLMhrxYl2-fxHxnQnmZ4VLUg06hHhUjLjpHnWsU3rFRaDmpOdvYMuFUW4WqZ-3fbaRHxrPKQ8EpgU3U2l5V4A2VffZ6GP1s2sGQac_D-vb3YD4M6hoVPl46mTZY_iq9SqI',
    title: 'Silêncio do Desejo',
    subtitle: 'Cada imagem conta uma história olfativa.'
  },
  {
    id: 4,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS7P0MIUHBDBDLxIWBX4gyVfJKlR2lQ8qlWb7xZP8Fx8KjBpBUaeGjZ8XE6LH_YX74e0rWjNi8Q3l3rVzYpB4uhKNoDfo7qgsePLmkn7z5_h70TdROV8Gg1K0QegpGk1G6H_lD8BQw2V6zU1Yhxk0jqtBPhkI0CtJQ4L-5xYO5nLUK4z6UEMxl15PhxLs7rN3vjoLoAXMZrn4a4ty8S-AWXdLdeE8X-NytJmFWi28zqd0E7C',
    title: 'Memórias em Ouro',
    subtitle: 'Perfumes que permanecem como lembranças nobres.'
  },
  {
    id: 5,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE1b8mQwiC8Qz6nM8I3kfM5t2vomRq0U5S3qQ6Z8rA5FxKJr5u4FaVhL4PG8L3eDTeGH3i8QW7kKb2W9x2c1b7ZUGp1hj8kTUPnH5qlp4ZbfK18HfD9N9b8PAE7kQiaNq4cD7Hk0X9tL6P7MvLJt1CjH9WcO2LXx8x1KjZgKKefGDq3FhJg8zRcoQwV_YHJ_dO6UO04wA45JiXJsyK1xZt55o-WzBNHDpYUt6Zg',
    title: 'Horizonte de Veludo',
    subtitle: 'Uma narrativa visual para os sentidos mais seletos.'
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

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
    },  ];

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