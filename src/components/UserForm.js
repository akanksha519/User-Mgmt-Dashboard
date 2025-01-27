import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import "../styles.css";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      api
        .get(`/users/${id}`)
        .then((res) => setUser(res.data))
        .catch(() => setError("Failed to fetch user details."));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      setError("Name and Email are required.");
      return;
    }

    const request = isEditing
      ? api.put(`/users/${id}`, user)
      : api.post("/users", user);

    request
      .then(() => navigate("/"))
      .catch(() => setError("Failed to submit user."));
  };

  return (
    <div>
      <h3>{isEditing ? "Edit User" : "Add User"}</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="company"
          value={user.company.name}
          onChange={handleChange}
          placeholder="Company"
        />
        <button type="submit">{isEditing ? "Update" : "Add"} User</button>
      </form>
    </div>
  );
};

export default UserForm;
