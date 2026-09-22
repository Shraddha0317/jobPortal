import { Link } from "react-router-dom";
import { applyForJob } from "../services/applicationService";

function JobCard({ job }) {

  function handleApply() {
    applyForJob(job.jobId)
      .then(() => {
        alert("Application submitted successfully!");
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          alert("You have already applied for this job.");
        } else {
          alert("Failed to apply for the job.");
        }
      });
  }

  return (
    <div className="job-card">

      <div className="job-card-content">

        <h2>{job.title}</h2>

        <p className="company-name">
          {job.companyName}
        </p>

        <p>
          📍 {job.location}
        </p>

        <p>
          💼 {job.jobType}
        </p>

        <p>
          🧑‍💻 {job.experienceRequired} years experience
        </p>

        <p>
          💰 ₹{job.salary}
        </p>

      </div>

      <div className="job-card-actions">

        <Link
          className="details-button"
          to={`/jobs/${job.jobId}`}
        >
          View Details
        </Link>

        <button
          className="apply-button"
          onClick={handleApply}
        >
          Apply
        </button>

      </div>

    </div>
  );
}

export default JobCard;