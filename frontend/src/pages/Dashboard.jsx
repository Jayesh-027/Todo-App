import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState("");

  // FETCH BOARDS
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await API.get("/boards");
        setBoards(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBoards();
  }, []);

  // ADD BOARD
  const addBoard = async () => {
    if (!boardName.trim()) return;

    try {
      await API.post("/boards", { name: boardName });
      setBoardName("");

      // reload boards
      const res = await API.get("/boards");
      setBoards(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE BOARD
  const deleteBoard = async (id) => {
    if (!window.confirm("Delete this board?")) return;

    await API.delete(`/boards/${id}`);

    const res = await API.get("/boards");
    setBoards(res.data);
  };

  // RENAME BOARD
  const renameBoard = async (id) => {
    const newName = prompt("Enter new board name:");
    if (!newName?.trim()) return;

    await API.put(`/boards/${id}`, { name: newName });

    const res = await API.get("/boards");
    setBoards(res.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={{textAlign:"right", marginBottom:"10px"}}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href="/";
            }}
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>

        <h2 style={{marginBottom:"20px"}}>Your Boards</h2>

        <div style={styles.row}>
          <input
            placeholder="New Board Name"
            value={boardName}
            onChange={(e)=>setBoardName(e.target.value)}
            style={styles.input}
          />

          <button onClick={addBoard} style={styles.primaryBtn}>
            Add
          </button>
        </div>

        {boards.length === 0 && (
          <p style={styles.empty}>No boards yet 👆</p>
        )}

        {boards.map(board => (
          <div key={board._id} style={styles.boardItem}>
            <div
              style={{cursor:"pointer"}}
              onClick={()=>navigate(`/board/${board._id}`)}
            >
              <div style={styles.boardTitle}>{board.name}</div>
              <p style={styles.subText}>Click to view tasks</p>
            </div>

            <div style={styles.btnGroup}>
              <button
                onClick={()=>renameBoard(board._id)}
                style={styles.editBtn}
              >
                Edit
              </button>

              <button
                onClick={()=>deleteBoard(board._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}



// Styles remain SAME
const styles = {
  page:{
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  card:{
    width:"100%",
    maxWidth:"600px",
    padding:"25px",
    background:"white",
    borderRadius:"12px",
    boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
  },

  row:{
    display:"flex",
    gap:"10px",
    marginBottom:"20px"
  },

  input:{
    flex:1,
    padding:"12px",
    borderRadius:"6px",
    border:"1px solid #ccc"
  },

  primaryBtn:{
    padding:"12px 16px",
    background:"#4f46e5",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  logoutBtn:{
    background:"#222",
    color:"white",
    border:"none",
    padding:"6px 12px",
    borderRadius:"5px",
    cursor:"pointer"
  },

  boardItem:{
    background:"#f9fafb",
    padding:"16px",
    borderRadius:"8px",
    marginBottom:"12px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  boardTitle:{
    fontWeight:"600",
    fontSize:"18px"
  },

  subText:{
    margin:0,
    fontSize:"14px",
    color:"#6b7280"
  },

  btnGroup:{
    display:"flex",
    gap:"8px"
  },

  editBtn:{
    background:"#e5e7eb",
    border:"none",
    padding:"8px 12px",
    borderRadius:"6px",
    cursor:"pointer"
  },

  deleteBtn:{
    background:"#ef4444",
    color:"white",
    border:"none",
    padding:"8px 12px",
    borderRadius:"6px",
    cursor:"pointer"
  },

  empty:{
    textAlign:"center",
    color:"#666"
  }
};
