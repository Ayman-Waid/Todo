const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create the express app
const app = express();

// Enable middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to my mongoose model
mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new todo
app.post('/todo/new', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      complete: false,
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a todo by id
app.delete('/todo/delete/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// TOGGLE complete a todo by id
app.get('/todo/complete/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a todo by id
app.put('/todo/update/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
