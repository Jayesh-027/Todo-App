import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

  // email format check
  if(!email.includes("@") || !email.includes(".")){
    alert("Enter valid email");
    return;
  }

  // password length check
  if(password.length < 4){
    alert("Password must be 4+ characters");
    return;
  }

  try {
    await API.post("/auth/register",{email,password});
    alert("Registered! Please login");
    navigate("/");
  } catch(err){
    console.log(err);
    alert("Error registering");
  }
};


  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <div style={{
        width:"320px",
        padding:"30px",
        background:"white",
        borderRadius:"12px",
        boxShadow:"0 4px 15px rgba(0,0,0,0.08)",
      }}>

        <h2 style={{textAlign:"center"}}>Register</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleRegister}
          style={btnStyle}
        >
          Register
        </button>

        <p style={{marginTop:"15px"}}>
          Already have an account?{" "}
          <span
            style={{color:"blue", cursor:"pointer"}}
            onClick={()=>navigate("/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};
const btnStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "18px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};