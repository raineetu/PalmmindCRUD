import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt, FaUsers, FaBars } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useState } from 'react';

const handleDeleteProfile = async (userId, navigate) => {
  try {
    const response = await fetch(`http://localhost:3001/api/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast.success("Profile deleted successfully!", { autoClose: 3000 });
      localStorage.removeItem("user"); 
      navigate("/signup"); 
    } else {
      const data = await response.json();
      toast.error(data.message || "Failed to delete profile. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting profile:", error);
    toast.error("An error occurred while deleting the profile.");
  }
};

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    toast.error("No user found. Redirecting to signup...");
    navigate("/"); 
    return null;
  }

  return (
    <div>
      <div className="d-block d-md-none p-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      <div className={`bg-light vh-100 p-3 ${isMenuOpen ? 'd-block' : 'd-none'} d-md-block`}>
        <h4 className="text-center" >Dashboard</h4>
        <ul className="list-unstyled" style={{marginBottom:"10px"}}>
          <li>
            <Link
              to="updateprofile"
              className="btn btn-outline-primary w-100 mb-3 d-flex align-items-center"
            >
              <FaUserEdit className="me-2" />
              Update Profile
            </Link>
          </li>
          <li>
            <button
              className="btn btn-outline-danger w-100 mb-3 d-flex align-items-center"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete your profile? This action is irreversible.")) {
                  handleDeleteProfile(user._id, navigate);
                }
              }}
            >
              <FaTrashAlt className="me-2" />
              Delete Profile
            </button>
          </li>
          <li>
            <Link
              to="register"
              className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center"
            >
              <FaUsers className="me-2" />
              Registered Users
            </Link>
          </li>
        </ul>
      </div>

      
    </div>
  );
};

export default Sidebar;
