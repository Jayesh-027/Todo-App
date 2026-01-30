import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo
} from "../controllers/todoController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getTodos);
router.post("/", auth, createTodo);
router.delete("/:id", auth, deleteTodo);
router.put("/:id", auth, toggleTodo);

export default router;
