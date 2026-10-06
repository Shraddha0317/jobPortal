import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { applyForJob } from "../services/applicationService";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, DollarSign, Clock, Briefcase, CheckCircle, Building2 } from "lucide-react";

const typeColors = {
  FULL_TIME: { bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.25)" },
  PART_TIME: { bg: "rgba(6,182,212,0.12)", color: "#06b6d4", border: "rgba(6,182,212,0.25)" },
  CONTRACT: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  INTERNSHIP: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", border: "rgba(168,85,247,0.25)" },
  FREELANCE: { bg: "rgba(236,72,153,0.12)", color: "#ec4899", border: "rgba(236,72,153,0.25)" },
};

function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJobById(jobId).then((r) => setJob(r.data)).catch(console.error);
  }, [jobId]);

  function handleApply() {
    setLoading(true);
    applyForJob(job.jobId)
      .then(() => setApplied(true))
      .catch((err) => {
        if (err.response?.status === 409) alert("You already applied for this job.");
        else alert("Please log in to apply.");
      })
      .finally(() => setLoading(false));
  }

  if (!job) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(168,85,247,0.3)",
          borderTopColor: "#a855f7", animation: "spin-slow 0.8s linear infinite", margin: "0 auto 16px",
        }} />
        <p style={{ color: "#64748b" }}>Loading job details...</p>
      </div>
    </div>
  );

  const typeStyle = typeColors[job.jobType] || typeColors.FULL_TIME;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      <motion.button
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "9px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500,
          color: "#94a3b8", background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)", marginBottom: 28,
          cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      >
        <ArrowLeft size={16} /> Back to Jobs
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24, padding: "36px", backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 60, height: 60, borderRadius: 16, flexShrink: 0,
              background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
              border: "1px solid rgba(168,85,247,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Building2 size={26} color="#a855f7" />
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 6, lineHeight: 1.2 }}>{job.title}</h1>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#a855f7" }}>{job.companyName}</p>
            </div>
          </div>
          <span style={{
            padding: "6px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.5px", textTransform: "uppercase",
            background: typeStyle.bg, color: typeStyle.color, border: `1px solid ${typeStyle.border}`,
          }}>
            {job.jobType?.replace("_", " ")}
          </span>
        </div>

        {/* Meta */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 20,
          padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28,
        }}>
          {[
            { icon: <MapPin size={16} />, text: job.location, color: "#06b6d4" },
            { icon: <DollarSign size={16} />, text: `₹${job.salary?.toLocaleString()}`, color: "#10b981" },
            { icon: <Clock size={16} />, text: `${job.experienceRequired} years experience`, color: "#f59e0b" },
            { icon: <Briefcase size={16} />, text: job.jobType?.replace("_", " "), color: "#a855f7" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#94a3b8" }}>
              <span style={{ color: m.color }}>{m.icon}</span>{m.text}
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 3, height: 18, background: "linear-gradient(#a855f7,#ec4899)", borderRadius: 2, display: "inline-block" }} />
            Job Description
          </h3>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 15, whiteSpace: "pre-wrap" }}>{job.description}</p>
        </div>

        {/* Apply */}
        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {applied ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                color: "#34d399", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <CheckCircle size={20} /> Application submitted successfully!
            </motion.div>
          ) : (
            <motion.button onClick={handleApply} disabled={loading} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, boxShadow: "0 0 30px rgba(168,85,247,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(168,85,247,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.3)"; }}
            >
              <Briefcase size={18} />{loading ? "Submitting..." : "Apply Now"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default JobDetailsPage;
