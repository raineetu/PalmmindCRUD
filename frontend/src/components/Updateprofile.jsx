import { useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios"; 

function Updateprofile() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Send JSON data to the backend
      const response = await axios.put(
        "http://localhost:3001/api/updateprofile",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("User registered successfully!");
      } else {
        setMessage(response.data.message || "Signup failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginLeft: "500px", fontFamily: "serif" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "30rem" }}>
        <h1 className="text-center mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        {message && <div className="mt-3 text-center">{message}</div>}
        <span className="text-center m-3 d-block">
          Already have an account?
          <Link to="/login">
            <button className="btn bg-danger text-white mx-2">Login</button>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Updateprofile;
