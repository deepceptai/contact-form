import express from "express";
import dotenv from "dotenv";
import contactRoutes from './route/contactRoute.js'
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
