import "./Contacto.css";

import MailIcon from "../../assets/icons/mail.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import FacebookIcon from "../../assets/icons/facebook.svg?react";

function Contacto() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-header">
        <h2 className="contact-title">Contáctanos</h2>
        <p className="contact-subtitle">~ Estamos aquí para ti ~</p>
      </div>

      <div className="contact-container">
        {/* Formulario */}
        <div className="contact-form">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                placeholder="(55) 1234-5678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                required
                placeholder="Cuéntanos más sobre tu consulta..."
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Información */}
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-icon">
              <MailIcon />
            </div>
            <div className="contact-info-details">
              <h4>Correo Electrónico</h4>
              <p>Escríbenos en cualquier momento</p>
              <a href="mailto:info@lasazondeantonieta.com">
                info@lasazondeantonieta.com
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <PhoneIcon />
            </div>
            <div className="contact-info-details">
              <h4>Teléfono</h4>
              <p>Llámanos de lunes a sábado</p>
              <a href="tel:+525512345678">
                +52 (55) 1234-5678
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FacebookIcon />
            </div>
            <div className="contact-info-details">
              <h4>Facebook</h4>
              <p>Síguenos en redes sociales</p>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                @LaSazonDeAntonieta
              </a>
            </div>
          </div>

          <div className="contact-message">
            ¡Nos encanta escuchar de ti! Cuéntanos cómo podemos ayudarte a llevar
            el sabor de México a tu mesa.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
