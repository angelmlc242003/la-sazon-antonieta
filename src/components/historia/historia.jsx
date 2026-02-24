import "./historia.css";
import logoHistoria from "../../assets/img/logo_historia.png";

const Historia = () => {
  return (
    <section className="story" id="historia">
      <div className="story-content">
        <h2>La Historia de Antonieta</h2>

        <p>
          Todo comenzó en la cocina de mamá Antonieta, donde los aromas de
          chiles tostados, especias molidas y masa fresca llenaban cada rincón de
          la casa. Sus manos sabias transformaban ingredientes simples en
          platillos que alimentaban el cuerpo y el alma.
        </p>

        <div className="story-highlight">
          “La mejor comida es la que se hace con las manos y se comparte con el
          corazón”
          <br />– Mamá Antonieta
        </div>

        <p>
          Hoy, continuamos su legado con la misma pasión y autenticidad,
          ofreciendo productos que no solo alimentan, sino que reconectan con
          nuestras raíces y mantienen vivas las tradiciones culinarias de México.
        </p>

        <p>
          Cada salsa, cada chile, cada especia cuenta una historia de tradición,
          familia y amor por la cocina mexicana. Un pedacito de hogar en cada
          bocado.
        </p>
      </div>

      <div className="story-image">
        {/* imagen insertada ocupando el recuadro — manteniendo overlay y estilos */}
        <img
          src={logoHistoria}
          alt="La Sazón de Antonieta - historia"
          className="story-image-img"
        />

        {/* overlay (opcional si quieres la tonalidad naranja encima) */}
        <div className="story-image-overlay" />
      </div>
    </section>
  );
};

export default Historia;
