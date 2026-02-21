import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-decorative">🌮</div>
      <div className="hero-decorative">🌶️</div>
      <div className="hero-decorative">🫔</div>

      <div className="hero-content">
        <div className="hero-tagline">
          ~ Desde el corazón de México ~
        </div>

        <h1>EL SABOR DE CASA</h1>

        <p className="hero-description">
          Ingredientes auténticos y recetas tradicionales que llevan generaciones
          alimentando el alma mexicana. Cada producto lleva el cariño y la dedicación
          de la cocina casera de Antonieta.
        </p>

        <div className="cta-group">
          <a href="#productos" className="cta-button">
            Explorar Productos
          </a>

          <a
            href="#historia"
            className="cta-button cta-button-secondary"
          >
            Nuestra Historia
          </a>
        </div>

        <div className="flourish" />
      </div>
    </section>
  );
}
