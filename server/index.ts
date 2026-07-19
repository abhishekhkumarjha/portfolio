import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = process.cwd();
const dataDir = path.join(rootDir, "server", "data");
const messagesFile = path.join(dataDir, "messages.json");
const distDir = path.join(rootDir, "dist");

dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, ".env.local"), override: true });

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 3001);
const contactRecipient = process.env.CONTACT_TO || "avishekhjhaaj@gmail.com";
const isProduction = process.env.NODE_ENV === "production";

app.disable("x-powered-by");
app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);

app.use((_, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self'; img-src 'self' data: blob:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

app.use(express.json({ limit: "64kb" }));

const requestCounts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: () => void) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const record = requestCounts.get(key);

    if (!record || record.resetAt <= now) {
      requestCounts.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    record.count += 1;
    next();
  };
}

async function ensureMessageStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(messagesFile);
  } catch {
    await fs.writeFile(messagesFile, "[]", "utf8");
  }
}

async function readMessages(): Promise<ContactMessage[]> {
  await ensureMessageStore();
  const raw = await fs.readFile(messagesFile, "utf8");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]) {
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), "utf8");
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Email delivery is not configured. Add SMTP_HOST, SMTP_USER, and SMTP_PASS to .env.local.");
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendContactEmail(contactMessage: ContactMessage) {
  const transporter = getMailTransport();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const subject = `Portfolio signal from ${contactMessage.name}`;
  const text = [
    "New encrypted signal dispatched from A. K. Portfolio.",
    "",
    `Name: ${contactMessage.name}`,
    `Email: ${contactMessage.email}`,
    `Sent: ${contactMessage.createdAt}`,
    "",
    contactMessage.message,
  ].join("\n");

  await transporter.sendMail({
    from,
    to: contactRecipient,
    replyTo: contactMessage.email,
    subject,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827">
        <h2>New encrypted signal</h2>
        <p><strong>Name:</strong> ${escapeHtml(contactMessage.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contactMessage.email)}</p>
        <p><strong>Sent:</strong> ${escapeHtml(contactMessage.createdAt)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(contactMessage.message).replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });
}

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    service: "portfolio-backend",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/contact", rateLimit(5, 15 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const name = cleanText(req.body?.name, 80);
    const email = cleanText(req.body?.email, 120).toLowerCase();
    const message = typeof req.body?.message === "string" ? req.body.message.trim().slice(0, 1200) : "";

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const contactMessage: ContactMessage = {
      id: randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    await sendContactEmail(contactMessage);

    const messages = await readMessages();
    messages.push(contactMessage);
    await writeMessages(messages);

    res.status(201).json({
      ok: true,
      message: `Signal mailed to ${contactRecipient}.`,
      id: contactMessage.id,
    });
  } catch (error) {
    console.error("Contact email failed:", error);
    res.status(500).json({
      error: isProduction ? "Unable to mail the signal." : error instanceof Error ? error.message : "Unable to mail the signal.",
    });
  }
});

app.get("/api/messages", async (req: Request, res: Response) => {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken && isProduction) {
    return res.status(503).json({ error: "Message access is not configured." });
  }

  if (adminToken && req.header("x-admin-token") !== adminToken) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const messages = await readMessages();
  res.json({ messages: [...messages].reverse() });
});

app.use(
  express.static(distDir, {
    maxAge: isProduction ? "1y" : 0,
    immutable: isProduction,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith("index.html")) {
        res.setHeader("Cache-Control", "no-store");
      }
    },
  }),
);

app.get("*", async (_req: Request, res: Response, next) => {
  try {
    await fs.access(path.join(distDir, "index.html"));
    res.sendFile(path.join(distDir, "index.html"));
  } catch {
    next();
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Portfolio backend running on http://localhost:${port}`);
});
