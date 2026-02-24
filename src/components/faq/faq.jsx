import { useState } from "react";
import "./FAQ.css";

import WatchIcon from "../../assets/icons/watch.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import CarIcon from "../../assets/icons/car.svg?react";
import DollarIcon from "../../assets/icons/dollar.svg?react";
import MedicIcon from "../../assets/icons/medic.svg?react";
import MessagesIcon from "../../assets/icons/messages.svg?react";

const faqs = [
  {
    icon: WatchIcon,
    question: "¿Cuáles son sus horarios de atención?",
    answer: (
      <>
        Estamos abiertos de <strong>lunes a domingo</strong>.
        Incluso los domingos, mamá Antonieta hace todo lo posible por dejar el corazón en cada uno de sus platillos. Te recomendamos hacer tu pedido con anticipación.
      </>
    ),
  },
  {
    icon: PhoneIcon,
    question: "¿Cómo puedo hacer un pedido?",
    answer: (
<>
  Puedes hacer tu pedido de tres formas:
  <ul>
    <li>
      <strong>Teléfono:</strong>{' '}
      <a
        href="tel:+5215545070572"
        aria-label="Llamar al +52 1 55 4507 0572"
      >
        +52 1 55 4507 0572
      </a>
    </li>

    <li>
      <strong>WhatsApp:</strong>{' '}
      <a
        href="https://wa.me/5215545070572"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enviar mensaje por WhatsApp al +52 1 55 4507 0572"
      >
        Mensaje directo
      </a>
    </li>

    <li>
      <strong>Facebook:</strong>{' '}
      <a
        href="https://www.facebook.com/profile.php?id=61570140658443"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir al perfil de Facebook"
      >
        Inbox
      </a>
    </li>
  </ul>
</>
    ),
  },
  {
    icon: CarIcon,
    question: "¿Hacen entregas a domicilio?",
    answer: (
      <>
        Sí, hacemos entregas a domicilio en <strong>toda CDMX</strong>.
      </>
    ),
  },
  {
    icon: DollarIcon,
    question: "¿Qué métodos de pago aceptan?",
    answer: (
      <ul>
        <li><strong>Efectivo</strong></li>
        <li><strong>Transferencia bancaria</strong></li>
      </ul>
    ),
  },
  {
    icon: MedicIcon,
    question: "¿Tienen opciones para personas con alergias?",
    answer: (
      <>
        Sí, avísanos con anticipación sobre cualquier alergia. La mayoría de
        nuestros guisados son naturalmente libres de gluten y lácteos.
      </>
    ),
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="faq-header">
        <h2 className="faq-title">Preguntas Frecuentes</h2>
        <p className="faq-subtitle">~ Aquí resolvemos tus dudas ~</p>
        <p className="faq-intro">
          ¿Tienes preguntas sobre nuestros guisados, pedidos o entregas?
          Aquí encontrarás las respuestas más comunes.
        </p>
        <div className="faq-divider" />
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question-content">
                <span className="faq-icon">
                  <faq.icon />
                </span>
                <h3 className="faq-question-text">{faq.question}</h3>
              </div>

              <div className="faq-toggle">+</div>
            </div>

            <div className="faq-answer">
              <div className="faq-answer-content">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-cta">
        <div className="faq-cta-icon faq-icon">
        <MessagesIcon /></div>
        <h3>¿Aún tienes dudas?</h3>
        <p>¡Estamos aquí para ayudarte!</p>
        <a href="#contacto" className="faq-cta-button">
          Contáctanos
        </a>
      </div>
    </section>
  );
}
