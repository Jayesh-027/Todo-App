import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Board() {
  const { id } = useParams();

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const boards = JSON.parse(localStorage.getItem("boards")) || [];
  const currentBoard = boards.find(b => b.id == id);

  const fetchTodos = async () => {
    try {
      const res = await API.get(`/todos?boardId=${id}`);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const addTodo = async () => {
    if (!task) return;

    try {
      await API.post("/todos", {
        title: task,
        boardId: id
      });

      setTask("");
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (todoId) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/todos/${todoId}`);
    fetchTodos();
  };

  const toggleDone = async (todoId) => {
    await API.put(`/todos/${todoId}`);
    fetchTodos();
  };

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <div style={{
        maxWidth:"600px",
        width:"100%",
        padding:"25px",
        background:"white",
        borderRadius:"12px",
        boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
      }}>

        
        <button
          onClick={()=>window.history.back()}
          style={{
            marginBottom:"15px",
            background:"#33363d",
            color:"white",
            border:"none",
            padding:"6px 12px",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          ← Back
        </button>

       
        <h2 style={{marginBottom:"20px"}}>
          {currentBoard?.name} Tasks
        </h2>

        
        <div style={{display:"flex", gap:"10px", marginBottom:"20px"}}>
          <input
            placeholder="New task"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            style={{
              flex:1,
              padding:"12px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          <button
            onClick={addTodo}
            style={{
              padding:"12px 18px",
              background:"#4f46e5",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            Add Task
          </button>
        </div>

        
        {todos.length === 0 && (
          <p style={{color:"#666", textAlign:"center"}}>
            No tasks yet. Add one 👆
          </p>
        )}

       
        {todos.map(todo => (
          <div key={todo._id}
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              background:"#f9fafb",
              padding:"12px",
              borderRadius:"6px",
              marginBottom:"10px"
            }}
          >
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={()=>toggleDone(todo._id)}
              />

              <span style={{
                marginLeft:"10px",
                textDecoration: todo.done ? "line-through" : "none"
              }}>
                {todo.title}
              </span>
            </div>

            <button
              onClick={()=>deleteTodo(todo._id)}
              style={{
                background:"#ef4444",
                color:"white",
                border:"none",
                padding:"6px 12px",
                borderRadius:"5px",
                cursor:"pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
