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
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(console.error);

// Models
const Todo = require('./models/Todo');

// GET all tasks
app.get('/tasks', async (req, res) => { 
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Todo({
      text: req.body.text,
      complete: false,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a task by id
app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



// UPDATE a task by id
app.put('/tasks/update/:id', async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    task.text = req.body.text;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
