// netlify/functions/contact.js
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler = async (event) => {
    try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 204, headers: CORS_HEADERS, body: "" };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    const rawBody = event.body || "{}";
    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (err) {
      console.error("JSON parse error:", err);
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: "Invalid JSON body" }) };
    }

    const { nombre, email, mensaje, asunto, token /*, telefono? (opcional) */ } = data;

    // Validaciones básicas
    if (!nombre || !email || !mensaje || !asunto || !token) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: "Faltan campos obligatorios" }) };
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: "Email inválido" }) };
    }

    // Verificar que exista la secret de reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("Missing RECAPTCHA_SECRET_KEY env var");
      return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: "Server misconfigured (missing recaptcha secret)" }) };
    }

    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const captchaData = await captchaRes.json();
    console.log("reCAPTCHA verify:", captchaData);

    if (!captchaData.success) {
      return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: "reCAPTCHA falló", details: captchaData }) };
    }
    // Si usás reCAPTCHA v3, podés opcionalmente chequear score:
    if (typeof captchaData.score === "number" && captchaData.score < 0.5) {
      return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: "reCAPTCHA score bajo", score: captchaData.score }) };
    }

    // Preparar datos para EmailJS
    const service_id = process.env.EMAILJS_SERVICE_ID;
    const template_id = process.env.EMAILJS_TEMPLATE_ID;
    const user_id = process.env.EMAILJS_PUBLIC_KEY;
    const accessToken = process.env.EMAILJS_PRIVATE_KEY;

    if (!service_id || !template_id || !user_id) {
      console.error("Missing EmailJS env vars", { service_id, template_id, has_user: !!user_id });
      return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: "Server misconfigured (missing EmailJS keys)" }) };
    }

    if (!accessToken) {
      console.error("Missing EMAILJS_PRIVATE_KEY (access token)");
      return {
    statusCode: 500,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error: "Server misconfigured (missing EmailJS private key)" }),
    };
    }

    const template_params = {
      name: nombre,
      email,
      message: mensaje,
      title: asunto,
      time: new Date().toLocaleString("es-MX"),
    };

    const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      service_id,
      template_id,
      user_id,
      accessToken, // 🔥 ESTO ES LO QUE FALTABA
      template_params,
    }),
    });

    const emailText = await emailRes.text();
    if (!emailRes.ok) {
      console.error("EmailJS error:", emailRes.status, emailText);
      return { statusCode: 502, headers: CORS_HEADERS, body: JSON.stringify({ error: "Error enviando el email", status: emailRes.status, details: emailText }) };
    }

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Unhandled function error:", err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: "Error interno del servidor", message: err.message }) };
  }
};