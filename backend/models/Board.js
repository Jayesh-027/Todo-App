import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: String,
  userId: String
});

export default mongoose.model("Board", boardSchema);
