import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom"; 
import Sidebar from "./Sidebar"; 

function Home() {
  return (
    <div className="d-flex">
      {/* Fixed Sidebar */}
      <div className="fixed-sidebar">
        <Sidebar />
      </div>

      {/* Dynamic Content Area */}
      <div className="content-area flex-grow-1 p-3">
        <Outlet /> 
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;
