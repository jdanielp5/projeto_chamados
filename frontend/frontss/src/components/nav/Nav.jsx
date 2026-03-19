import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <nav className="nav-menu">
      <Link to="/home" className={location.pathname === '/home' ? 'ativo' : ''}>Home</Link>
      <Link to="/users" className={location.pathname === '/users' ? 'ativo' : ''}>Usuarios</Link>
      <Link to="/insert" className={location.pathname === '/insert' ? 'ativo' : ''}>Novo Usuario</Link>
      <Link to="/ticket" className={location.pathname === '/ticket' ? 'ativo' : ''}>Abrir Chamado</Link>
      <Link to="/tickets" className={location.pathname === '/tickets' ? 'ativo' : ''}>Ver Chamados</Link>
    </nav>
  );
}

export default Nav;
