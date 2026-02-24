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
              <a href="#esencia">Nuestra Esencia</a>
            </li>
            <li>
              <a href="#historia">Nuestra Historia</a>
            </li>
            <li>
              <a href="#galeria">Conoce nuestro ambiente</a>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="mailto:elsazondeantonietaoficial@gmail.com">Email</a>
            </li>
            <li>
              <a href="tel:+5215545070572" aria-label="Llamar al +52 1 55 4507 0572">
              Teléfono</a>
            </li>
            <li>
              <a href="https://www.facebook.com/profile.php?id=61570140658443">Facebook</a>
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
