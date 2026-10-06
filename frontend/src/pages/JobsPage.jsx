import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobs, searchJobs } from "../services/jobService";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, X, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((r) => setJobs(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleSearch(page = 0) {
    setLoading(true);
    setSearched(true);
    searchJobs({ keyword: keyword || undefined, location: location || undefined, jobType: jobType || undefined, experience: experience || undefined, page, size: 10 })
      .then((r) => { setJobs(r.data.content); setCurrentPage(r.data.number); setTotalPages(r.data.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleClear() {
    setKeyword(""); setLocation(""); setJobType(""); setExperience(""); setSearched(false);
    setLoading(true);
    getAllJobs().then((r) => setJobs(r.data)).catch(console.error).finally(() => setLoading(false));
  }

  const inputStyle = {
    flex: 1, minWidth: 160, padding: "11px 14px 11px 38px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, fontSize: 14, color: "#e2e8f0", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>
          Explore <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Opportunities</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 15 }}>{jobs.length} jobs available right now</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "20px", marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
          {/* Keyword */}
          <div style={{ position: "relative", flex: 2, minWidth: 200 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
            <input style={inputStyle} placeholder="Job title, skills, keywords..." value={keyword} onChange={e => setKeyword(e.target.value)}
              onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
          {/* Location */}
          <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
            <MapPin size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
            <input style={inputStyle} placeholder="Location" value={location} onChange={e => setLocation(e.target.value)}
              onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
          {/* Job Type */}
          <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
            <Briefcase size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569", zIndex: 1 }} />
            <select value={jobType} onChange={e => setJobType(e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <option value="" style={{ background: "#1a1a24" }}>All Job Types</option>
              <option value="FULL_TIME" style={{ background: "#1a1a24" }}>Full Time</option>
              <option value="PART_TIME" style={{ background: "#1a1a24" }}>Part Time</option>
              <option value="CONTRACT" style={{ background: "#1a1a24" }}>Contract</option>
              <option value="INTERNSHIP" style={{ background: "#1a1a24" }}>Internship</option>
              <option value="FREELANCE" style={{ background: "#1a1a24" }}>Freelance</option>
            </select>
          </div>
          {/* Experience */}
          <div style={{ position: "relative", flex: 1, minWidth: 140 }}>
            <Clock size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
            <input style={inputStyle} type="number" placeholder="Experience (yrs)" value={experience} onChange={e => setExperience(e.target.value)} min="0"
              onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => handleSearch(0)} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600,
            color: "#fff", background: "linear-gradient(135deg,#a855f7,#ec4899)", border: "none",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <SlidersHorizontal size={15} /> Search Jobs
          </button>
          {searched && (
            <button onClick={handleClear} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "11px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
              color: "#94a3b8", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#e2e8f0"}
              onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* Jobs Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 20 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              height: 200, borderRadius: 20,
              background: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)",
              backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite",
            }} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>No jobs found</h3>
          <p style={{ color: "#64748b" }}>Try adjusting your search filters</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 20 }}>
            {jobs.map((job, i) => (
              <motion.div key={job.jobId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 40 }}>
          <button onClick={() => handleSearch(currentPage - 1)} disabled={currentPage === 0} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
            color: currentPage === 0 ? "#334155" : "#a855f7",
            background: "rgba(255,255,255,0.03)", border: `1px solid ${currentPage === 0 ? "rgba(255,255,255,0.05)" : "rgba(168,85,247,0.3)"}`,
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
          }}>
            <ChevronLeft size={16} /> Previous
          </button>
          <span style={{ fontSize: 14, color: "#64748b", padding: "0 8px" }}>
            Page <strong style={{ color: "#e2e8f0" }}>{currentPage + 1}</strong> of <strong style={{ color: "#e2e8f0" }}>{totalPages}</strong>
          </span>
          <button onClick={() => handleSearch(currentPage + 1)} disabled={currentPage === totalPages - 1} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
            color: currentPage === totalPages - 1 ? "#334155" : "#a855f7",
            background: "rgba(255,255,255,0.03)", border: `1px solid ${currentPage === totalPages - 1 ? "rgba(255,255,255,0.05)" : "rgba(168,85,247,0.3)"}`,
            cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
          }}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default JobsPage;
