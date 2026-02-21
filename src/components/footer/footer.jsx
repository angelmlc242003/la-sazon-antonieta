import "./Footer.css";

const Footer = () => {
  return (
    <footer id="contacto">
      <div className="footer-content">
        <div className="footer-about">
          <h3>La Sazón de Antonieta</h3>
          <p>
            Comprometidos con preservar el auténtico sabor de la cocina mexicana
            tradicional. Cada producto está hecho con ingredientes de la más alta
            calidad y el toque casero que nos caracteriza. De nuestra cocina a tu
            mesa, con todo el sabor de México.
          </p>
        </div>

        <div className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <a href="#productos">Nuestros Productos</a>
            </li>
            <li>
              <a href="#historia">Nuestra Historia</a>
            </li>
            <li>
              <a href="#recetas">Recetas Tradicionales</a>
            </li>
            <li>
              <a href="#tienda">Tienda en Línea</a>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="mailto:info@lasazondeantonieta.com">Email</a>
            </li>
            <li>
              <a href="tel:+52">Teléfono</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>🌶️ © 2026 La Sazón de Antonieta. Hecho con amor y tradición 🇲🇽</p>
      </div>
    </footer>
  );
};

export default Footer;
