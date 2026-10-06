import { Link } from "react-router-dom";
import { useState } from "react";
import { applyForJob } from "../services/applicationService";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight, CheckCircle } from "lucide-react";

const typeColors = {
  FULL_TIME: { bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.25)" },
  PART_TIME: { bg: "rgba(6,182,212,0.12)", color: "#06b6d4", border: "rgba(6,182,212,0.25)" },
  CONTRACT: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  INTERNSHIP: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", border: "rgba(168,85,247,0.25)" },
  FREELANCE: { bg: "rgba(236,72,153,0.12)", color: "#ec4899", border: "rgba(236,72,153,0.25)" },
};

function JobCard({ job }) {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const typeStyle = typeColors[job.jobType] || typeColors.FULL_TIME;

  function handleApply() {
    setLoading(true);
    applyForJob(job.jobId)
      .then(() => setApplied(true))
      .catch((error) => {
        if (error.response?.status === 409) alert("You already applied for this job.");
        else alert("Please log in to apply.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, padding: "24px",
        display: "flex", flexDirection: "column", gap: 16,
        transition: "border-color 0.3s, box-shadow 0.3s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 4, lineHeight: 1.3 }}>{job.title}</h2>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#a855f7" }}>{job.companyName}</p>
        </div>
        <span style={{
          padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap",
          background: typeStyle.bg, color: typeStyle.color, border: `1px solid ${typeStyle.border}`,
        }}>
          {job.jobType?.replace("_", " ")}
        </span>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {[
          { icon: <MapPin size={13} />, text: job.location },
          { icon: <Clock size={13} />, text: `${job.experienceRequired} yrs exp` },
          { icon: <DollarSign size={13} />, text: `₹${job.salary?.toLocaleString()}` },
        ].map((m, i) => (
          <span key={i} style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 13, color: "#64748b",
          }}>
            <span style={{ color: "#475569" }}>{m.icon}</span>{m.text}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        <Link to={`/jobs/${job.jobId}`} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          color: "#a855f7", background: "rgba(168,85,247,0.08)",
          border: "1px solid rgba(168,85,247,0.2)", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(168,85,247,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(168,85,247,0.08)"; }}
        >
          Details <ArrowRight size={13} />
        </Link>

        {applied ? (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
          }}>
            <CheckCircle size={14} /> Applied!
          </div>
        ) : (
          <button onClick={handleApply} disabled={loading} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
            border: "none", transition: "opacity 0.2s", opacity: loading ? 0.7 : 1,
          }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = loading ? "0.7" : "1"; }}
          >
            <Briefcase size={13} />{loading ? "Applying..." : "Quick Apply"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default JobCard;
