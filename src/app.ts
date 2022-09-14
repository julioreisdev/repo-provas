import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes'

dotenv.config();
const app = express();
app.use(express.json(), cors());

app.use(authRoutes)

export default app;
