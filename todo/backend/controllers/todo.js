const express = require('express');
const Todo = require('../models/todo');
const protect = require('../middleware/authMiddleware');

const createTodo = async (req, res) => {
    const { title, dueDate, description, priority, imageUrl, completed } = req.body;
    try {
        const newTodo = new Todo({ 
            userId: req.user.userID,
            title, 
            dueDate,
            description,
            priority,
            imageUrl,
            completed
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }       
};
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.userID });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, dueDate, description, priority, imageUrl, completed } = req.body;
    try {
        const todo = await Todo.findOne({ _id: id, userId: req.user.userID });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.title = title || todo.title;
        todo.dueDate = dueDate || todo.dueDate;
        todo.description = description || todo.description;
        todo.priority = priority || todo.priority;
        todo.imageUrl = imageUrl || todo.imageUrl;
        todo.completed = completed !== undefined ? completed : todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.userID });     
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
module.exports = { createTodo, getTodos, updateTodo, deleteTodo };