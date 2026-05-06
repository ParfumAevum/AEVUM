import styled from "styled-components";
import { LabelCaps, PrimaryButton, EditorialDivider } from "../components/UI";

// Hero principal da página inicial com imagem de fundo e chamada para ação.
export const HeroSection = styled.section`
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

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
  padding-bottom: 32px;
  border-bottom: 1px solid #1a1a1a;
`;

export const ViewAllLink = styled.a`
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

export const SectionTitle = styled.h2`
  font-family: 'Noto Serif', serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
  margin-bottom: 0;
`;

export const CardNoteLabel = styled(LabelCaps)`
  color: #555;
  display: block;
  margin-bottom: 8px;
`;

export const PromoNameLabel = styled(LabelCaps)`
  color: #e5e2e1;
  display: block;
`;

export const RankBadgeLabel = styled(LabelCaps)`
  color: #f2ca50;
  display: block;
  font-size: 10px;
  margin-bottom: 8px;
`;

export const SectionLabel = styled(LabelCaps)`
  color: #f2ca50;
  display: block;
  margin-bottom: 24px;
`;

export const FullWidthButton = styled(PrimaryButton)`
  width: 100%;
`;

export const FooterBrand = styled(LabelCaps)`
  color: #f2ca50;
  font-size: 14px;
  letter-spacing: 0.35em;
`;

export const StyledEditorialDivider = styled(EditorialDivider)`
  margin: 0 48px 160px;
`;

export const SectionDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #555;
  margin-top: 8px;
`;

export const ProductPrice = styled.p`
  color: #f2ca50;
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
`;

export const PromoPriceGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  align-items: center;
`;

export const PromoPrice = styled.span`
  color: #f2ca50;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
`;

export const PromoOriginal = styled.span`
  color: #444;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  text-decoration: line-through;
`;

export const HeroLabel = styled(LabelCaps)`
  color: #f2ca50;
  display: block;
  margin-bottom: 24px;
  letter-spacing: 0.3em;
`;

export const HeroTitle = styled.h1`
  font-family: 'Noto Serif', serif;
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #e5e2e1;
  margin-bottom: 32px;
`;

export const HeroSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #d0c5af;
  max-width: 560px;
  margin-bottom: 36px;
`;

export const HeroControls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

export const SlideDot = styled.button`
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

export const RankHeading = styled.h4`
  font-family: 'Noto Serif', serif;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.onSurface};
  transition: transform 0.3s ease;
  margin: 0;
`;

export const RankPrice = styled.p`
  color: #555;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  margin-top: 4px;
`;

export const FeaturedCard = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  border: 1px solid rgba(212,175,55,0.2);
`;

export const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
`;

export const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px;
`;

export const FeaturedBadge = styled(LabelCaps)`
  color: #d4af37;
  display: block;
  margin-bottom: 12px;
`;

export const FeaturedHeadline = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: 36px;
  font-weight: 300;
  color: #e5e2e1;
  margin-bottom: 16px;
`;

export const FeaturedText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #ccc;
  max-width: 400px;
  margin-bottom: 32px;
`;

export const BoutiqueBodyText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 48px;
`;

export const BoutiqueDetail = styled.div`
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

export const MapLink = styled.span`
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

export const BookingHeading = styled.h2`
  font-family: 'Noto Serif', serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
  margin-bottom: 12px;
`;

export const BookingCopy = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #666;
  max-width: 720px;
`;

export const FormPanel = styled.div`
  background: rgba(255,255,255,0.02);
  padding: 32px;
  border-radius: 20px;
  min-height: 360px;
`;

export const FormPanelHeading = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: 28px;
  font-weight: 400;
  color: #e5e2e1;
  margin-bottom: 24px;
`;

export const FormPanelText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #ccc;
  line-height: 1.8;
`;

export const FooterLinksRow = styled.div`
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

export const FooterCopyText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.surfaceBright};
`;

export const CarouselRow = styled.div`
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

export const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const PromoCard = styled.div`
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

export const ProductCard = styled.div`
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

export const BentoGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 0 48px;
  margin-bottom: 160px;

  @media (min-width: 768px) {
    grid-template-columns: 5fr 7fr;
  }
`;

export const RankList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const RankItem = styled.div`
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

export const BoutiqueSection = styled.section`
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
export const BookingSection = styled.section`
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
export const FooterSection = styled.footer`
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

export const SiteSection = styled.section`
  padding: 0 48px;
  margin-bottom: 160px;
`;

// Dados do carrossel de hero que rotaciona automaticamente na home.
export const heroSlides = [
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
