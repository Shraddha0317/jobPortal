import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";

function Login() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    loginUser({ email, password })
      .then((r) => {
        localStorage.setItem("token", r.data.token);
        localStorage.setItem("user", JSON.stringify(r.data));
        setIsAuthenticated(true); setUser(r.data);
        navigate("/jobs");
      })
      .catch(() => setError("Invalid email or password. Please try again."))
      .finally(() => setLoading(false));
  }

  const inputWrap = { position: "relative", display: "flex", alignItems: "center" };
  const iconStyle = { position: "absolute", left: 14, color: "#475569", pointerEvents: "none" };
  const inputStyle = {
    width: "100%", padding: "13px 14px 13px 42px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12, fontSize: 14, color: "#e2e8f0", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "40px 24px",
    }}>
      {/* Glow */}
      <div style={{
        position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%", maxWidth: 420,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24, padding: "40px 36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(168,85,247,0.08)",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, margin: "0 auto 16px",
            background: "linear-gradient(135deg,#a855f7,#ec4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <LogIn size={22} color="#fff" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>Welcome back 👋</h2>
          <p style={{ fontSize: 14, color: "#64748b" }}>Sign in to continue your journey</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#f87171", marginBottom: 20,
            }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", display: "block", marginBottom: 8 }}>Email</label>
            <div style={inputWrap}>
              <Mail size={16} style={iconStyle} />
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", display: "block", marginBottom: 8 }}>Password</label>
            <div style={inputWrap}>
              <Lock size={16} style={iconStyle} />
              <input type={showPass ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: 12, background: "none", border: "none",
                color: "#475569", cursor: "pointer", padding: 4,
              }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button type="submit" disabled={loading}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: 8, padding: "13px", borderRadius: 12, fontSize: 15, fontWeight: 600,
              color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
              boxShadow: "0 0 20px rgba(168,85,247,0.3)",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#64748b" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#a855f7", fontWeight: 600 }}>Sign up free</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
