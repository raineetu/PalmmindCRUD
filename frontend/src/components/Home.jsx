import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to delete user profile
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
      // Clear localStorage after deletion
      localStorage.removeItem("user");
      // Redirect to register page after deletion
      navigate("/signup");
    } else {
      toast.error("Failed to delete profile. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred while deleting the profile.");
  }
};

function Home() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex">
          {/* Main Content Area */}
          <div className="col-md-8 col-lg-9">
            {user && (
              <div className="text-start mb-4 ms-3">
                <h5>Welcome, {user.username}!</h5>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-light vh-100" style={{ width: "300px" }}>
            <div className="p-3">
              <h4 className="text-center">Dashboard</h4>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/updateprofile"
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
                        handleDeleteProfile(user._id, navigate); // Pass navigate to the function
                      }
                    }}
                  >
                    <FaTrashAlt className="me-2" />
                    Delete Profile
                  </button>
                </li>
                <li>
                  <Link
                    to="/registered-users"
                    className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center"
                  >
                    <FaUsers className="me-2" />
                    Registered Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
}

export default Home;
