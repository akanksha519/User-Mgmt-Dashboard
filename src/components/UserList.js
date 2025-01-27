import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      api
        .delete(`/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch(() => {
          setError("Failed to delete user.");
        });
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}. {user.name} - {user.email} - {user.company.name}
            <Link to={`/edit-user/${user.id}`}> Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
