import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './routers/user.js'
dotenv.config()
connectDB();
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
const port=process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});