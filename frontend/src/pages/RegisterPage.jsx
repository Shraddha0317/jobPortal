import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Briefcase, Search } from "lucide-react";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "APPLICANT" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    registerUser({ name: form.name, email: form.email, password: form.password, role: form.role })
      .then(() => { setSuccess("Account created! Redirecting..."); setTimeout(() => navigate("/login"), 1500); })
      .catch(() => setError("Registration failed. Email may already be in use."))
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
      <div style={{
        position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%", maxWidth: 440,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24, padding: "40px 36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(236,72,153,0.06)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, margin: "0 auto 16px",
            background: "linear-gradient(135deg,#a855f7,#ec4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <UserPlus size={22} color="#fff" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>Create account ✨</h2>
          <p style={{ fontSize: 14, color: "#64748b" }}>Join thousands of professionals today</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#f87171", marginBottom: 20 }}
          >⚠️ {error}</motion.div>
        )}
        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#34d399", marginBottom: 20 }}
          >✅ {success}</motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Role Toggle */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", display: "block", marginBottom: 10 }}>I am a</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { val: "APPLICANT", label: "Job Seeker", icon: <Search size={16} /> },
                { val: "RECRUITER", label: "Recruiter", icon: <Briefcase size={16} /> },
              ].map(({ val, label, icon }) => (
                <button key={val} type="button" onClick={() => setForm(f => ({ ...f, role: val }))} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                  color: form.role === val ? "#fff" : "#64748b",
                  background: form.role === val ? "linear-gradient(135deg,#a855f7,#ec4899)" : "rgba(255,255,255,0.04)",
                  border: form.role === val ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: form.role === val ? "0 0 20px rgba(168,85,247,0.25)" : "none",
                }}>
                  {icon}{label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", display: "block", marginBottom: 8 }}>Full Name</label>
            <div style={inputWrap}>
              <User size={16} style={iconStyle} />
              <input type="text" placeholder="Your full name" value={form.name} onChange={set("name")} required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", display: "block", marginBottom: 8 }}>Email</label>
            <div style={inputWrap}>
              <Mail size={16} style={iconStyle} />
              <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", display: "block", marginBottom: 8 }}>Password</label>
            <div style={inputWrap}>
              <Lock size={16} style={iconStyle} />
              <input type={showPass ? "text" : "password"} placeholder="Create a strong password" value={form.password} onChange={set("password")} required style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 4 }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }} style={{
            marginTop: 8, padding: "13px", borderRadius: 12, fontSize: 15, fontWeight: 600,
            color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
            border: "none", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, boxShadow: "0 0 20px rgba(168,85,247,0.3)",
          }}>
            {loading ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#a855f7", fontWeight: 600 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
