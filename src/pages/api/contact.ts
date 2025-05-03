import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  debug?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body as ContactFormData;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Toate câmpurile sunt obligatorii' 
      });
    }

    console.log('Creating email transporter with settings:', {
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465',
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true,
      connectionTimeout: 10000,
      tls: {
        rejectUnauthorized: false 
      }
    });

    console.log('Verifying mail server connection...');
    await transporter.verify();
    console.log('Mail server connection verified successfully.');

    const mailOptions = {
      from: `"Formular de Contact CTR" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: 'office@ctr.ro',
      subject: `Mesaj nou pe ctr.ro: ${subject}`,
      text: `
Nume: ${name}
Email: ${email}
Subiect: ${subject}

Mesaj:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0070f3;">Mesaj nou de pe formularul de contact</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nume:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subiect:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
    </tr>
  </table>
  <div style="margin-top: 20px;">
    <h3 style="color: #333;">Mesaj:</h3>
    <p style="line-height: 1.6; background: #f9f9f9; padding: 15px; border-radius: 4px;">${message.replace(/\n/g, '<br>')}</p>
  </div>
</div>
      `
    };

    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    return res.status(200).json({ 
      success: true, 
      message: 'Mesajul a fost trimis cu succes!' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);

    return res.status(500).json({ 
      success: false, 
      message: 'A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.',
      debug: {
        error: error.message || 'Unknown error',
        code: error.code || 'NO_CODE',
        command: error.command || 'NO_COMMAND'
      }
    });
  }
} 