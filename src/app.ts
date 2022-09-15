import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes'
import testsRoutes from './routes/testsRoutes'

dotenv.config();
const app = express();
app.use(express.json(), cors());

app.use(authRoutes)
app.use(testsRoutes)

export default app;
