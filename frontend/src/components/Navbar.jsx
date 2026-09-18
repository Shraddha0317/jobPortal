import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { logoutUser } from "../services/authService";


function Navbar({ title }) {


const {
  isAuthenticated,
  setIsAuthenticated,
  user,
  setUser
} = useContext(AuthContext);
 
function handleLogout() {
  logoutUser();
  setIsAuthenticated(false);
  setUser(null);
}

  
  return (
    <nav>
      <h2>{title}</h2>

      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>
      {!isAuthenticated && <Link to="/login">Login</Link>}
      {!isAuthenticated && <Link to="/register">Register</Link>}
      {isAuthenticated && <span>Welcome, {user?.name}</span>} 

      {isAuthenticated && (
  <button onClick={handleLogout}>Logout</button>
)}
    </nav>
  );
}

export default Navbar;