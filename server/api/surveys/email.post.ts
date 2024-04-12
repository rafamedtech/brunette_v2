import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);

  assertMethod(event, ["POST"]);

  const html = `
    <h1>Recibiste una nueva encuesta!</h1>
    <div>
      <p>Puedes ver las respuestas en el siguiente enlace: </p>
      <a href="${message}">Ver encuesta</a>
    </div>
    <img src="https://res.cloudinary.com/rafamed-dev/image/upload/v1711810440/cotizador-logo_vposmv.png" alt="Cotizador Logo" />
  `;

  try {
    const data = await resend.emails.send({
      from: "Cotizador <onboarding@resend.dev>",
      to: ["rafamed.tech@gmail.com"],
      subject: "Tienes una nueva encuesta!",
      html,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
