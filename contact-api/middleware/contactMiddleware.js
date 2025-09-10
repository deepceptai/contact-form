import xss from "xss";

export const sanitizeInput = (req, res, next) => {
  const { name, email, phone, message } = req.body;

  req.body.name = xss(name);
  req.body.email = xss(email);
  req.body.phone = xss(phone);
  req.body.message = xss(message);

  next();
};


const ipRequests = {}; // { ip: { count, lastReset } }
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!ipRequests[ip]) {
    ipRequests[ip] = { count: 1, lastReset: now };
  } else {
    if (now - ipRequests[ip].lastReset > WINDOW_MS) {
      ipRequests[ip] = { count: 1, lastReset: now };
    } else {
      ipRequests[ip].count += 1;
    }
  }

  if (ipRequests[ip].count > MAX_REQUESTS) {
    return res.status(429).json({ error: "Too many requests. Try again later." });
  }

  next();
};


const spamWords = [
  "viagra", "lottery", "bitcoin", "winner", "cash prize",
  "porn", "xxx", "casino", "gambling", "loan offer"
];

export const checkSpam = (req, res, next) => {
  const { message } = req.body;
  const lowerMsg = message.toLowerCase();

  if (spamWords.some((word) => lowerMsg.includes(word))) {
    return res.status(400).json({ error: "Message flagged as spam" });
  }

  next();
};


export const validateFields = (req, res, next) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Phone regex validation
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  next();
};
