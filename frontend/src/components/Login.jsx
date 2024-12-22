import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response Data:", response.data);
  
      if (response.data.success) {
        const { token, user } = response.data;
  
        // Log the user object and its ID
        // console.log("User Object:", user);
        // console.log("User ID:", user._id); 
  
        // Store user and token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
  
        setMessage("Login successful!");
        navigate("/home"); 
      } else {
        setMessage(response.data.message || "Login failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };
  
  

  return (
    <>
      <Logo />
      <div
        className="vh-100"
        style={{
          marginLeft: "500px",
          fontFamily: "serif",
          marginTop: "30px",
        }}
      >
        <div className="card shadow-lg p-4" style={{ width: "30rem" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            className="mx-auto d-block"
            style={{ width: "150px" }}
          />
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          {message && <div className="mt-3 text-center">{message}</div>}
        </div>
      </div>

      {/* Inline mobile responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            .vh-100 {
              margin-left: 18px !important;
              margin-top: 20px !important;
            }
            .card {
              width: 200% !important;
              padding: 10px !important;
            }
            img {
              width: 120px !important;
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

export default Login;
