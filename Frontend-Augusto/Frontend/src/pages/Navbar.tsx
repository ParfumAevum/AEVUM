import { Link, useLocation } from 'react-router-dom';
import { TopNav, Logo, NavLinks, NavIcons } from '../components/UI';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/finalizar-compra', label: 'Checkout' },
    { to: '/perfil', label: 'Minha Conta' },
    { to: '/pedidos', label: 'Pedidos' },
    { to: '/admin/relatorios', label: 'Admin' },
  ];

  return (
    <TopNav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <button style={{ color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer' }}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Link to="/">
          <Logo>AEVUM</Logo>
        </Link>
      </div>

      <NavLinks>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </NavLinks>

      <NavIcons>
        <Link to="/perfil">
          <span className="material-symbols-outlined">person</span>
        </Link>
        <Link to="/finalizar-compra">
          <span className="material-symbols-outlined">shopping_bag</span>
        </Link>
      </NavIcons>
    </TopNav>
  );
}