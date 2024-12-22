import { useState } from "react";
import axios from "axios";

function UpdateProfile() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  // Retrieve the userId from localStorage
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)._id : null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      setMessage("User not logged in");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/updateprofile/${userId}`,
        {
          userId,
          ...form,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Profile update failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          marginLeft: "300px",
          fontFamily: "serif",
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            width: "30rem",
          }}
        >
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
              Update
            </button>
          </form>
          {message && <div className="mt-3 text-center">{message}</div>}
        </div>
      </div>

      {/* Inline mobile responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            .d-flex {
              margin-left: 0 !important;
              padding: 10px !important;
              margin-bottom: 50px !important;
            }
            .card {
              width: 100% !important;
              padding: 10px !important;
            }
            .form-control {
              font-size: 14px !important;
              padding: 10px !important;
            }
            .btn {
              font-size: 14px !important;
              padding: 12px !important;
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

export default UpdateProfile;
