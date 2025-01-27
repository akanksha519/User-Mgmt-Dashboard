import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./styles.css";

const App = () => {
  return (
    <div className="container">
      <nav>
        <h2>User Management</h2>
        <Link to="/">Home</Link>
        <Link to="/add-user">Add User</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<UserForm />} />
      </Routes>
    </div>
  );
};

export default App;
