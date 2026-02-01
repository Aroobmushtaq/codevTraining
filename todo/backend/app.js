
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
export default app;