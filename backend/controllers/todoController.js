import Todo from "../models/Todo.js";


// GET todos
export const getTodos = async (req, res) => {
  try {
    const { boardId } = req.query;

    const todos = await Todo.find({ boardId });
    res.json(todos);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// CREATE todo
export const createTodo = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const todo = new Todo({
      title,
      boardId
    });

    const saved = await todo.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE todo
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// TOGGLE done
export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json(todo);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
