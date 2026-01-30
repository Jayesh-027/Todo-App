import express from "express";
import auth from "../middleware/auth.js";
import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard
} from "../controllers/boardController.js";

const router = express.Router();

router.get("/", auth, getBoards);
router.post("/", auth, createBoard);
router.delete("/:id", auth, deleteBoard);
router.put("/:id", auth, updateBoard);

export default router;
