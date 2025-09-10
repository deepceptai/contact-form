import express from "express";
import { submitContactForm } from "../controllers/contactController.js";
import { validateFields, checkSpam, sanitizeInput, rateLimiter } from "../middleware/contactMiddleware.js";

const router = express.Router();

router.post("/contact",validateFields,checkSpam,rateLimiter,sanitizeInput, submitContactForm);

export default router;
