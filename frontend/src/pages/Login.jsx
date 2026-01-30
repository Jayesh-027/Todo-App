import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

  if(!email.includes("@")){
    alert("Enter valid email");
    return; // ⭐ THIS STOPS EXECUTION
  }

  try {
    const res = await API.post("/auth/login",{email,password});

    if(res.data.message === "Invalid"){
      alert("Wrong credentials");
      return;
    }
    localStorage.setItem("token", res.data.token);

    localStorage.setItem("user", email);
    navigate("/dashboard");

  } catch(err){
    console.log(err);
    alert("Login failed");
  }
};


  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#eef2ff"
    }}>
      <div style={{
        width: "320px",
        padding: "30px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{textAlign:"center"}}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={btnStyle}
        >
          Login
        </button>
        <p>
           Don't have an account? 
          <span 
            style={{color:"blue", cursor:"pointer"}}
            onClick={()=>navigate("/register")}
          >
            Register
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
