import Board from "../models/Board.js";

export const getBoards = async (req,res) => {
  const boards = await Board.find({
    userId: req.user.id
  });
  res.json(boards);
};


export const createBoard = async (req,res) => {
  const board = new Board({
    name: req.body.name,
    userId: req.user.id
  });
  await board.save();
  res.json(board);
};


export const deleteBoard = async (req,res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.json({msg:"deleted"});
};

export const updateBoard = async (req,res) => {
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { name:req.body.name },
    { new:true }
  );
  res.json(board);
};
