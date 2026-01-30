const express = require('express');
const todoRouter = express.Router();
const protect = require("../middleware/authMiddleware");
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo');
todoRouter.post('/create', protect, createTodo);
todoRouter.get('/get', protect, getTodos);
todoRouter.put('/update/:id', protect, updateTodo);
todoRouter.delete('/delete/:id', protect, deleteTodo);
module.exports = todoRouter;