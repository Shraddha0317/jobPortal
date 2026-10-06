import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building2, Clock } from "lucide-react";

const statusConfig = {
  APPLIED:       { label: "Applied",       bg: "rgba(99,102,241,0.12)",  color: "#818cf8", border: "rgba(99,102,241,0.25)",  dot: "#818cf8" },
  UNDER_REVIEW:  { label: "Under Review",  bg: "rgba(245,158,11,0.12)",  color: "#fbbf24", border: "rgba(245,158,11,0.25)",  dot: "#fbbf24" },
  SHORTLISTED:   { label: "Shortlisted",   bg: "rgba(6,182,212,0.12)",   color: "#22d3ee", border: "rgba(6,182,212,0.25)",   dot: "#22d3ee" },
  REJECTED:      { label: "Rejected",      bg: "rgba(239,68,68,0.12)",   color: "#f87171", border: "rgba(239,68,68,0.25)",   dot: "#f87171" },
  HIRED:         { label: "Hired 🎉",      bg: "rgba(16,185,129,0.12)",  color: "#34d399", border: "rgba(16,185,129,0.25)",  dot: "#34d399" },
};

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyApplications()
      .then((r) => setApplications(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>
          My <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Applications</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 15 }}>{applications.length} application{applications.length !== 1 ? "s" : ""} tracked</p>
      </motion.div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              height: 88, borderRadius: 16,
              background: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)",
              backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite",
            }} />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: "center", padding: "80px 24px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24,
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>💼</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>No applications yet</h3>
          <p style={{ color: "#64748b", fontSize: 15 }}>Start applying to jobs and track your progress here.</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {applications.map((app, i) => {
              const s = statusConfig[app.status] || statusConfig.APPLIED;
              return (
                <motion.div key={app.applicationId}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16, padding: "20px 24px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: 14, transition: "all 0.2s",
                  }}
                  whileHover={{ borderColor: "rgba(168,85,247,0.25)", x: 4 }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Briefcase size={18} color="#a855f7" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{app.jobTitle}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b" }}>
                        <Building2 size={12} />{app.companyName}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700,
                      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                      {s.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default MyApplicationsPage;
