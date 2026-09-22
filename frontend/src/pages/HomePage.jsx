import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Find Your Dream Job</h1>
        <p className="hero-subtitle">
          Thousands of opportunities waiting for you. Search, apply, and build your career.
        </p>
        <div className="hero-actions">
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
          {!isAuthenticated && (
            <Link to="/register" className="btn-outline">Get Started</Link>
          )}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Smart Search</h3>
          <p>Filter by location, job type, and experience level to find the perfect match.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Quick Apply</h3>
          <p>Apply to jobs with a single click and track your applications in real time.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏢</span>
          <h3>Top Companies</h3>
          <p>Connect with leading companies actively looking for talent like you.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;