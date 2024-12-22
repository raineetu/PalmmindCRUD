import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Updateprofile from "./components/Updateprofile";
import Registered from "./components/Registered";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
        <Route path="updateprofile" element={<Updateprofile />} />
        <Route path="register" element={<Registered />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
