import User from "../models/User.js";
import jwt from "jsonwebtoken";


// REGISTER
export const register = async (req,res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if(existing) return res.json({ message:"User exists" });

  const user = await User.create({ email, password });
  res.json(user);
};

// LOGIN
export const login = async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email,password});
  if(!user) return res.json({message:"Invalid"});

  const token = jwt.sign(
    { id:user._id },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
  );

  res.json({token});
};