import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { Briefcase, Home, List, LogIn, LogOut, Menu, UserPlus, X } from "lucide-react";

function Navbar({ title }) {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function handleLogout() {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10,10,15,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#a855f7,#ec4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Briefcase size={18} color="#fff" />
          </div>
          <span style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700, fontSize: 20,
            background: "linear-gradient(135deg,#a855f7,#ec4899)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>JobPortal</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-desktop">
          {[
            { to: "/", label: "Home", icon: <Home size={15} /> },
            { to: "/jobs", label: "Jobs", icon: <List size={15} /> },
            ...(isAuthenticated && user?.role === "APPLICANT" ? [{ to: "/my-applications", label: "My Applications", icon: <Briefcase size={15} /> }] : []),
            ...(isAuthenticated && user?.role === "RECRUITER" ? [{ to: "/recruiter-applications", label: "Applications", icon: <Briefcase size={15} /> }] : []),
          ].map(({ to, label, icon }) => (
            <Link key={to} to={to} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: isActive(to) ? "#a855f7" : "#94a3b8",
              background: isActive(to) ? "rgba(168,85,247,0.1)" : "transparent",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (!isActive(to)) { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={e => { if (!isActive(to)) { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; } }}
            >
              {icon}{label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <LogIn size={15} />Login
              </Link>
              <Link to="/register" style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <UserPlus size={15} />Sign Up
              </Link>
            </>
          ) : (
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 12px", borderRadius: 8,
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg,#a855f7,#ec4899)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "#fff",
                }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#c4b5fd" }}>{user?.name}</span>
              </div>
              <button onClick={handleLogout} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: "#f87171", background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
              >
                <LogOut size={15} />Logout
              </button>
            </>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none",
            color: "#94a3b8", padding: 4,
          }} className="nav-hamburger">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
