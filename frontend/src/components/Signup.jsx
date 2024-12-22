import { useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios"; 
import Logo from "./Logo";

function Signup() {
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
      const response = await axios.post(
        "http://localhost:3001/api/signup",
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
    <>
      <Logo />
      <div
        className="d-flex justify-content-center align-items-center vh-80"
        style={{
          marginLeft: "500px",
          fontFamily: "serif",
          marginBottom: "100px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            width: "30rem",
            boxSizing: "border-box",
          }}
        >
          <img
            src="/logq.png"
            alt="Logo"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
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
                Email:
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
                Password:
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

      {/* Inline mobile responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            .d-flex {
              margin-left: 0 !important;
              margin-bottom: 50px !important;
              padding: 10px !important;
            }
            .card {
              width: 100% !important;
              padding: 10px !important;
            }
            img {
              margin-bottom: 10px !important;
            }
            .form-control {
              font-size: 14px !important;
              padding: 10px !important;
            }
            .btn {
              font-size: 14px !important;
              padding: 10px !important;
            }
            .text-center {
              font-size: 12px !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default Signup;
