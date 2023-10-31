const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

// List All Todos
router.get('/', TodoController.listTodos);

// Detail Todo
router.get('/:id', TodoController.getTodoById);

// Create Todo
router.post('/', TodoController.createTodo);

// Delete Todo (Soft Delete)
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
