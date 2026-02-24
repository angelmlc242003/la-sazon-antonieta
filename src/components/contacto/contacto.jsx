// src/components/contacto/contacto.jsx
import React, { useState, useEffect } from "react";
import "./contacto.css";

import MailIcon from "../../assets/icons/mail.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import FacebookIcon from "../../assets/icons/facebook.svg?react";


export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState(null); 

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("VITE_RECAPTCHA_SITE_KEY no configurada en .env");
      return;
    }
    if (window.grecaptcha) return; 

    const src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);

    return () => {
    };
  }, [RECAPTCHA_SITE_KEY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.nombre.trim() || !form.email.trim() || !form.asunto.trim() || !form.mensaje.trim()) {
      setResultMsg({ type: "error", text: "Por favor completá los campos obligatorios." });
      return false;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(form.email)) {
      setResultMsg({ type: "error", text: "Ingresá un email válido." });
      return false;
    }
    return true;
  };

  const waitForGreCaptcha = async (timeout = 5000) => {
    const started = Date.now();
    while (!window.grecaptcha) {
      if (Date.now() - started > timeout) return false;
      await new Promise((r) => setTimeout(r, 100));
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResultMsg(null);

    if (!validate()) return;

    if (!RECAPTCHA_SITE_KEY) {
      setResultMsg({ type: "error", text: "reCAPTCHA no está configurado. Contactá al administrador." });
      return;
    }

    setLoading(true);

    try {
      const greReady = await waitForGreCaptcha(5000);
      if (!greReady) {
        setResultMsg({ type: "error", text: "No se pudo cargar reCAPTCHA. Intentá recargar la página." });
        setLoading(false);
        return;
      }

      // pedir token v3
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });

      const payload = {
        nombre: form.nombre,
        email: form.email,
        asunto: form.asunto,
        mensaje: form.mensaje,
        token,
      };

      console.log("Enviando a function payload:", payload);

      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        console.error("Error response from function:", res.status, text);
        if (res.status === 403) {
          setResultMsg({ type: "error", text: "reCAPTCHA falló (posible bot). Intentá de nuevo." });
        } else if (res.status === 400) {
          const json = await res.json().catch(() => null);
          setResultMsg({ type: "error", text: json?.error || "Datos inválidos." });
        } else {
          setResultMsg({ type: "error", text: "Error en el servidor al enviar el mensaje." });
        }
        setLoading(false);
        return;
      }

      // éxito
      setResultMsg({ type: "success", text: "Mensaje enviado. ¡Gracias! Te responderemos pronto." });
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (err) {
      console.error("submit error:", err);
      setResultMsg({ type: "error", text: "Error inesperado. Revisá la consola." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contacto">
      <div className="contact-header">
        <h2 className="contact-title">Contáctanos</h2>
        <p className="contact-subtitle">~ Estamos aquí para ti ~</p>
      </div>

      <div className="contact-container">
        <div className="contact-form">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                placeholder="Cuéntanos más sobre tu consulta..."
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Mensaje"}
            </button>

            <div role="status" aria-live="polite" style={{ marginTop: 12, minHeight: 24 }}>
              {resultMsg && (
                <div
                  style={{
                    padding: "0.6rem 0.8rem",
                    borderRadius: 6,
                    background: resultMsg.type === "success" ? "#e6f7ec" : "#ffecec",
                    color: resultMsg.type === "success" ? "#0a6b2f" : "#a00000",
                    border: resultMsg.type === "success" ? "1px solid #bfe9c9" : "1px solid #f1c8c8",
                  }}
                >
                  {resultMsg.text}
                </div>
              )}
            </div>
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
              <a href="mailto:elsazondeantonietaoficial@gmail.com">elsazondeantonietaoficial@gmail.com</a>
            </div>
          </div>

        <div className="contact-info-item">
          <div className="contact-icon">
          <PhoneIcon />
          </div>
          <div className="contact-info-details">
            <h4>Teléfono</h4>
            <p>Llámanos de lunes a sábado</p>

            <div className="phone-list">
        <a
        className="phone-link"
        href="https://wa.me/+5215580650015"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear en WhatsApp con +52 1 (55) 1234-5678">
        +52 1 55 8065 0015
        </a>

        <a
        className="phone-link"
        href="https://wa.me/5215545070572"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear en WhatsApp con +52 1 (55) 4507 0572">
        +52 1 (55) 4507 0572
        </a>

            </div>
          </div>
        </div>
          <div className="contact-info-item">
            <div className="contact-icon">
              <FacebookIcon />
            </div>
            <div className="contact-info-details">
              <h4>Facebook</h4>
              <p>Síguenos en redes sociales</p>
              <a href="https://www.facebook.com/profile.php?id=61570140658443" target="_blank" rel="noreferrer">
                @ElSazonDeAntonieta
              </a>
            </div>
          </div>

          <div className="contact-message">
            ¡Nos encanta escuchar de ti! Cuéntanos cómo podemos ayudarte a llevar el
            sabor de México a tu mesa.
          </div>
        </div>
      </div>
    </section>
  );
}