const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>QuantumBoard - Código de Verificação</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; 
                         box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center; }
            .logo { font-size: 28px; font-weight: bold; color: #4A90E2; margin-bottom: 20px; }
            .code { font-size: 32px; font-weight: bold; background: #e0e7ff; display: inline-block; padding: 10px 20px;
                     border-radius: 8px; margin: 20px 0; }
            .footer { font-size: 12px; color: #888; margin-top: 20px; }
            .footer a { color: #4A90E2; text-decoration: none; margin: 0 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">QuantumBoard</div>
            <h2>Seu código de verificação</h2>
            <p>Olá,</p>
            <p>Copie e cole este código no QuantumBoard para validar seu e-mail:</p>
            <div class="code">${code}</div>
            <p>Se você não solicitou este código, ignore este e-mail.</p>
            <p>Obrigado,<br>Equipe QuantumBoard</p>
            <div class="footer">
                <br>© 2025 QuantumBoard. Todos os direitos reservados.
            </div>
        </div>
    </body>
    </html>`;

    try {
        const response = await transporter.sendMail({
            from: '"QuantumBoard" <quantumboard0001@gmail.com>',
            to: email,
            subject: "Seu Código de Verificação",
            html: emailTemplate,
        });

        console.log("Email enviado com sucesso!", response.messageId || response);
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error.message || error);
        throw new Error("Erro ao enviar o e-mail de verificação. Tente novamente mais tarde.");
    }
};

module.exports = sendVerificationEmail;
