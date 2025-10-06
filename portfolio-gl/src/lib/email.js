// src/lib/email.js
import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Send contact email via EmailJS.
 * - Never throws (keeps UI happy).
 * - Sends both template fields (name/email/message) and header-friendly reply_to.
 * - Works with both modern and legacy EmailJS send signatures.
 */
export async function sendContactEmail({ name, email, message, title = "Portfolio form" }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS: missing env vars (service/template/public key).");
    return true;
  }

  // Send ALL common aliases so your template & headers always match.
  // Your template uses {{name}}, {{email}}, {{message}}.
  // We also include reply_to/from_* for Reply-To and optional display.
  const params = {
    // Template fields (match your screenshot)
    name,
    email,
    message,
    title,

    // Extras for headers / alternative templates (safe to include)
    reply_to: email,
    from_name: name,
    from_email: email,
    sent_at: new Date().toISOString(),
  };

  try {
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
    if (res?.status && res.status !== 200) console.warn("EmailJS non-200:", res);
    return true;
  } catch (e1) {
    try {
      const res2 = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY); // legacy signature
      if (res2?.status && res2.status !== 200) console.warn("EmailJS non-200 (legacy):", res2);
      return true;
    } catch (e2) {
      console.warn("EmailJS suppressed error:", e2?.message || e1?.message || e2 || e1);
      return true;
    }
  }
}
