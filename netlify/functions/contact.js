export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const {
      nombre,
      email,
      mensaje,
      asunto,
      token, // reCAPTCHA token
    } = JSON.parse(event.body || "{}");

    /* =====================
       Validaciones básicas
       ===================== */
    if (!nombre || !email || !mensaje || !asunto || !token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios" }),
      };
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email inválido" }),
      };
    }

    if (telefono && !/^[0-9+\s()-]{6,20}$/.test(telefono)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Teléfono inválido" }),
      };
    }

    /* =====================
       Verificar reCAPTCHA
       ===================== */
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "reCAPTCHA falló" }),
      };
    }

    /* =====================
       Enviar EmailJS
       ===================== */
    const emailRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PRIVATE_KEY,
          template_params: {
            name: nombre,
            email,
            message: mensaje,
            title: asunto,
            time: new Date().toLocaleString("es-MX"),
          },
        }),
      }
    );

    if (!emailRes.ok) {
      const text = await emailRes.text();
      console.error("EmailJS error:", text);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error enviando el email" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
}