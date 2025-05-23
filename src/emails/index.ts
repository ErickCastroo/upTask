import { transporter } from "src/config/nodeMailer/index.js"

interface IEmail {
  email: string
  name: string
  token: string
}

export class Email {
  static sendEmail = async (user: IEmail) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Verificación de correo</title>
      </head>
      <body style="background-color: #f3f0ff; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0;">
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="background-color: #7c3aed; padding: 2rem;">
              <h1 style="color: #fff; margin: 0; font-size: 1.8rem;">🔒 Verifica tu cuenta</h1>
              <p style="color: #ddd6fe; font-size: 0.9rem; margin-top: 0.5rem;">Hola ${user.name}, verifica tu correo para continuar</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 2rem;">
              <table style="max-width: 480px; width: 100%; background: #fff; border-radius: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1); padding: 2rem;">
                <tr>
                  <td style="text-align: center;">
                    <h2 style="color: #6d28d9; font-size: 1.25rem; margin-bottom: 1rem;">Tu código de verificación</h2>
                    <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 1.5rem;">
                      Introduce este código para confirmar tu dirección de correo:
                    </p>
                    <div style="display: inline-block; background: linear-gradient(to right, #7c3aed, #a78bfa); color: white; font-size: 2rem; font-weight: bold; letter-spacing: 8px; padding: 1rem 2rem; border-radius: 12px; margin-bottom: 1.5rem;">
                      ${user.token}
                    </div>
                    <p style="color: #9ca3af; font-size: 0.8rem; margin-top: 1rem;">
                      Este código es válido por 10 minutos. No lo compartas con nadie.
                    </p>
                  </td>
                </tr>
              </table>
              <p style="color: #9ca3af; font-size: 0.75rem; margin-top: 2rem;">
                Si tú no solicitaste este código, puedes ignorar este correo.<br />
                Enviado a: ${user.email}
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `

    await transporter.sendMail({
      from: 'Uptask@gmail.com',
      to: user.email,
      subject: '🔐 Verifica tu correo electrónico',
      text: `Hola ${user.name}, tu código de verificación es: ${user.token}`,
      html: htmlContent,
    })
    console.log('Email sent successfully')
  }
}
