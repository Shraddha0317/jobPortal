import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Search, Zap, Building2, TrendingUp, Users, Star } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  const stats = [
    { value: "10K+", label: "Jobs Posted", icon: <Briefcase size={20} /> },
    { value: "50K+", label: "Job Seekers", icon: <Users size={20} /> },
    { value: "5K+", label: "Companies", icon: <Building2 size={20} /> },
    { value: "98%", label: "Success Rate", icon: <TrendingUp size={20} /> },
  ];

  const features = [
    { icon: <Search size={28} />, title: "Smart Search", desc: "AI-powered filters to find your perfect role by skill, location, and salary.", color: "#a855f7" },
    { icon: <Zap size={28} />, title: "Instant Apply", desc: "One-click applications with real-time status tracking.", color: "#ec4899" },
    { icon: <Building2 size={28} />, title: "Top Companies", desc: "Connect with 5000+ verified companies actively hiring.", color: "#06b6d4" },
    { icon: <Star size={28} />, title: "Career Growth", desc: "Get matched with roles that align with your career goals.", color: "#10b981" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "100px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Glow blobs */}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <motion.div variants={fadeUp}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 100,
              background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)",
              fontSize: 13, fontWeight: 600, color: "#c4b5fd", marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
              #1 Job Portal for Gen-Z Professionals
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 24, color: "#f1f5f9",
          }}>
            Land Your{" "}
            <span style={{
              background: "linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundSize: "200%", animation: "gradient-shift 4s ease infinite",
            }}>
              Dream Job
            </span>
            <br />Without the Grind
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontSize: 18, color: "#94a3b8", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7,
          }}>
            Thousands of opportunities from top companies. Search smarter, apply faster, and get hired.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/jobs" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600,
              color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
              boxShadow: "0 0 30px rgba(168,85,247,0.35)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(168,85,247,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.35)"; }}
            >
              Browse Jobs <ArrowRight size={16} />
            </Link>
            {!isAuthenticated && (
              <Link to="/register" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                color: "#e2e8f0", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Get Started Free
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 24px 80px" }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          style={{
            maxWidth: 900, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16,
          }}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "24px 20px", textAlign: "center",
              transition: "all 0.3s",
            }}
              whileHover={{ y: -4, borderColor: "rgba(168,85,247,0.3)", boxShadow: "0 0 30px rgba(168,85,247,0.1)" }}
            >
              <div style={{ color: "#a855f7", marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#f1f5f9", fontFamily: "'Space Grotesk',sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section style={{ padding: "0 24px 100px" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>
              Why choose <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>JobPortal?</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 16 }}>Everything you need to land your next role</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "32px 24px", transition: "all 0.3s",
              }}
                whileHover={{ y: -6, borderColor: `${f.color}40`, boxShadow: `0 0 40px ${f.color}15` }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14, marginBottom: 20,
                  background: `${f.color}15`, border: `1px solid ${f.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: f.color,
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section style={{ padding: "0 24px 100px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              maxWidth: 700, margin: "0 auto", textAlign: "center",
              background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))",
              border: "1px solid rgba(168,85,247,0.2)", borderRadius: 24, padding: "60px 40px",
            }}
          >
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#f1f5f9", marginBottom: 14 }}>Ready to get hired? 🚀</h2>
            <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 32 }}>Join 50,000+ professionals who found their dream job through us.</p>
            <Link to="/register" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600,
              color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
              boxShadow: "0 0 30px rgba(168,85,247,0.35)",
            }}>
              Create Free Account <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  );
}

export default HomePage;
