import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.js';
const todoRouter = express.Router();
todoRouter.post('/create', protect, createTodo);
todoRouter.get('/get', protect, getTodos);
todoRouter.put('/update/:id', protect, updateTodo);
todoRouter.delete('/delete/:id', protect, deleteTodo);
export default todoRouter;