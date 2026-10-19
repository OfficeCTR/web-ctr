import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ResponseData = {
  success: boolean;
  message: string;
};

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };
const MIN_FILL_MS = 3000;
const MAX_LINKS = 2;
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };

const MSG_OK = "Mesajul a fost trimis cu succes!";
const MSG_REQUIRED = "Toate câmpurile sunt obligatorii.";
const MSG_INVALID_EMAIL = "Adresa de email nu este validă.";
const MSG_TOO_LONG = "Mesajul este prea lung. Te rugăm să îl scurtezi.";
const MSG_LINKS = "Mesajul conține prea multe link-uri. Te rugăm să le elimini și să încerci din nou.";
const MSG_RATE = "Ai trimis deja câteva mesaje. Te rugăm să încerci din nou peste câteva minute.";
const MSG_ERROR =
  "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne scrii direct pe email.";

const URL_PATTERN =
  /\b(?:https?:\/\/|www\.)[^\s<>"']+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|ro|info|biz|ru|xyz|top|io|co|me|link|click|online|site|shop)\b(?:\/[^\s<>"']*)?/gi;

const EXPLICIT_URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"']+/gi;

const recentSubmissions = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (timestamps.length >= RATE_LIMIT.max) {
    recentSubmissions.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  return false;
};

const clientIp = (req: NextApiRequest) => {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (first || req.socket.remoteAddress || "unknown").trim();
};

const asText = (value: unknown) =>
  typeof value === "string"
    ? value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .replace(/\r\n?/g, "\n")
        .trim()
    : "";

const singleLine = (value: string) => value.replace(/\s+/g, " ").trim();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const defang = (value: string) =>
  value.replace(URL_PATTERN, (url) => url.replace(/^http/i, "hxxp").replace(/:\/\//, "[://]").replace(/\./g, "[.]"));

const countLinks = (value: string, pattern = URL_PATTERN) => (value.match(pattern) ?? []).length;

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  const honeypot = asText(body.website);
  const startedAt = Number(body.startedAt);
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    return res.status(200).json({ success: true, message: MSG_OK });
  }

  const name = singleLine(asText(body.name));
  const email = singleLine(asText(body.email));
  const subject = singleLine(asText(body.subject));
  const message = asText(body.message);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: MSG_REQUIRED });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({ success: false, message: MSG_TOO_LONG });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ success: false, message: MSG_INVALID_EMAIL });
  }
  if (
    countLinks(name, EXPLICIT_URL_PATTERN) > 0 ||
    countLinks(subject, EXPLICIT_URL_PATTERN) > 0 ||
    countLinks(message) > MAX_LINKS
  ) {
    return res.status(400).json({ success: false, message: MSG_LINKS });
  }
  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ success: false, message: MSG_RATE });
  }

  const safe = {
    name: defang(name),
    email,
    subject: defang(subject),
    message: defang(message),
  };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"Formular de Contact CTR" <${process.env.EMAIL_USER}>`,
      replyTo: { name: safe.name, address: email },
      to: "office@ctr.ro",
      subject: `Mesaj nou pe ctr.ro: ${safe.subject}`,
      text: `Nume: ${safe.name}\nEmail: ${safe.email}\nSubiect: ${safe.subject}\n\nMesaj:\n${safe.message}\n`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0070f3;">Mesaj nou de pe formularul de contact</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nume:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(safe.name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(safe.email)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subiect:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(safe.subject)}</td>
    </tr>
  </table>
  <div style="margin-top: 20px;">
    <h3 style="color: #333;">Mesaj:</h3>
    <p style="line-height: 1.6; background: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${escapeHtml(safe.message)}</p>
  </div>
</div>
`,
    });

    return res.status(200).json({ success: true, message: MSG_OK });
  } catch (error) {
    console.error("Contact form: email could not be sent", error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, message: MSG_ERROR });
  }
}
