"use server"

import { Resend } from "resend"


interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate the data
    if (!data.name || !data.message) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Previews and unconfigured environments must never send real email.
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.CONTACT_EMAIL_FROM
    const to = process.env.CONTACT_EMAIL_TO
    if (process.env.CONTACT_EMAIL_ENABLED !== "true" || process.env.VERCEL_ENV === "preview" || !apiKey || !from || !to) {
      return { success: false, message: "El formulario de contacto aún no está disponible. Intenta más tarde." }
    }
    if (data.name.length > 100 || data.message.length > 5000 || (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) {
      return { success: false, message: "Revisa los datos del formulario." }
    }
    const resend = new Resend(apiKey)
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!))
    // Send only when production contact settings have been explicitly configured.
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email || undefined,
      subject: `Nuevo mensaje de ${data.name} - Ronny's Food Truck`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Nuevo mensaje desde el sitio web</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email || "No proporcionado")}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de Ronny's Food Truck
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: "Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.",
      }
    }

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Te responderemos pronto.",
    }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    return {
      success: false,
      message: "Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.",
    }
  }
}
