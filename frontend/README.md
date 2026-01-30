# 📝 To-Do Board App (Full Stack)

A full-stack To-Do Board application where users can register, login, create boards, and manage tasks inside each board.

This project was built as part of a Full Stack Developer technical assessment.

---

# 🚀 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Email validation
- Protected routes using token

---

## 📋 Boards
- Create boards
- Rename boards
- Delete boards
- Open board to view tasks
- Boards are user-specific

---

## ✅ Tasks (Todos)
- Add tasks
- Mark tasks as completed
- Delete tasks
- Board-specific task management

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Inline CSS styling

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication 

---

# 📂 Project Structure

/frontend
    /src
        /pages
        /services
    App.jsx
    main.jsx

/backend
    /models
    /controllers
    /routes
    /middleware
    server.js


---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

git clone <https://github.com/Jayesh-027/Todo-App>
cd todo App


---


## 2️⃣ Backend Setup


Create a `.env` file inside **backend** folder:

PORT=5000
MONGO_URI=mongo db string in.env file
JWT_SECRET=your_secret_key

Run backend:

node server.js

You should see:
Server running on port 5000
MongoDB Connected


---

## 3️⃣ Frontend Setup

Open new terminal:

cd frontend
npm install
npm run dev


Frontend runs on: http://localhost:5173


---

# 🌐 Environment Variables

Backend `.env` requires:

MONGO_URI
JWT_SECRET
PORT


---

# 📌 Notes

- MongoDB Atlas is used as database
- Boards and tasks are stored in DB
- JWT is used for authentication
- Each user only sees their own boards & tasks
- UI kept simple to focus on functionality
- Built for learning and assessment purposes

---

# 👨‍💻 Author

**Jayesh Khandelwal**  
Information Technology Student  
Full Stack Developer (Learning Phase 🚀)

---

# 📜 License

This project is for assessment and educational purposes.





