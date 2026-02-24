import './Esencia.css';

import PepperIcon from '../../assets/icons/pepper.svg?react';
import IngredientIcon from '../../assets/icons/ingredient.svg?react';
import LoveIcon from '../../assets/icons/love.svg?react';

export default function Esencia() {
  return (
    <section className="features" id="esencia">
      <h2 className="section-title">Nuestra Esencia</h2>
      <p className="section-subtitle">~ Lo que nos hace especiales ~</p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <PepperIcon />
          </div>
          <h3>Recetas Tradicionales</h3>
          <p>
            Cada producto sigue las recetas originales de la abuela Antonieta,
            preservando el auténtico sabor mexicano que se transmite de generación en generación.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <IngredientIcon />
          </div>
          <h3>Ingredientes Frescos</h3>
          <p>
            Seleccionamos cuidadosamente cada ingrediente de productores locales mexicanos,
            garantizando frescura, calidad y el verdadero sabor de nuestra tierra.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <LoveIcon />
          </div>
          <h3>Hecho con Amor</h3>
          <p>
            Preparado artesanalmente, con la dedicación y el cariño de quien
            cocina para su familia. Porque la mejor comida siempre lleva amor.
          </p>
        </div>
      </div>
    </section>
  );
}
