import './Navbar.css';
import logo from '../../assets/img/logo.png';

export default function Navbar() {
  return (
    <nav className="site-nav" role="navigation" aria-label="Main navigation">
      
      <a href="#inicio" className="logo-link">
        <img
          src={logo}
          alt="La Sazón de Antonieta"
          className="logo-img"
        />
      </a>

      <ul className="nav-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#esencia">Esencia</a></li>
        <li><a href="#historia">Historia</a></li>
        <li><a href="#contacto">Contacto</a></li>
        <li><a href="#galeria">Galería</a></li>
      </ul>
    </nav>
  );
}
