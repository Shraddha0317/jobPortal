import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    getJobById(jobId)
      .then((response) => setJob(response.data))
      .catch((error) => console.error("Failed to fetch job:", error));
  }, [jobId]);

  if (!job) {
    return (
      <div className="page-container">
        <p className="loading-text">Loading job details...</p>
      </div>
    );
  }

  function handleApply() {
    applyForJob(job.jobId)
      .then(() => setApplied(true))
      .catch((error) => {
        if (error.response?.status === 409) {
          alert("You have already applied for this job.");
        } else {
          alert("Failed to apply. Please log in first.");
        }
      });
  }

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </button>

      <div className="job-detail-card">
        <div className="job-detail-header">
          <div>
            <h1 className="job-detail-title">{job.title}</h1>
            <p className="job-detail-company">{job.companyName}</p>
          </div>
          <span className="job-type-badge">{job.jobType?.replace("_", " ")}</span>
        </div>

        <div className="job-detail-meta">
          <span>📍 {job.location}</span>
          <span>💰 ₹{job.salary?.toLocaleString()}</span>
          <span>🧑‍💻 {job.experienceRequired} yrs experience</span>
        </div>

        <div className="job-detail-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="job-detail-footer">
          {applied ? (
            <p className="auth-success">✅ Application submitted successfully!</p>
          ) : (
            <button className="btn-primary" onClick={handleApply}>
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;