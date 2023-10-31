const { Todo } = require('../models');

class TodoController {
  static listTodos = async (req, res) => {
    try {
      const todos = await Todo.findAll();
      res.status(200).json({data: todos})
    } catch(err) {
      next(err);
    }
  };
  
  static getTodoById = async (req, res) => {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (todo) {
        res.status(200).json({data: todo})
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch(err) {
      next(err);
    }
  };
  
  static createTodo = async (req, res) => {
    try {
      const { title } = req.body;
      const todo = await Todo.create({ title });
      res.status(201).json({message: "New Todo created successfully", data: todo})
    } catch(err) {
      next(err);
    }
  };
  
  static deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (todo) {
        todo.destroy();
        res.status(200).json({ message: 'Todo deleted' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch(err) {
      next(err);
    }
  };
}

module.exports = TodoController;
