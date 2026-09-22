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
  <nav className="navbar">

    <div className="navbar-brand">
      <Link to="/">{title}</Link>
    </div>

    <div className="navbar-links">

      <Link to="/">Home</Link>

      <Link to="/jobs">Jobs</Link>

      {isAuthenticated && user?.role === "APPLICANT" && (
        <Link to="/my-applications">My Applications</Link>
      )}

      {isAuthenticated && user?.role === "RECRUITER" && (
        <Link to="/recruiter-applications">
          Applications
        </Link>
      )}

      {!isAuthenticated && (
        <Link to="/login">Login</Link>
      )}

      {!isAuthenticated && (
        <Link to="/register">Register</Link>
      )}

      {isAuthenticated && (
        <>
          <span className="welcome">
            Welcome, {user?.name}
          </span>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}

    </div>

  </nav>
);
}

export default Navbar;