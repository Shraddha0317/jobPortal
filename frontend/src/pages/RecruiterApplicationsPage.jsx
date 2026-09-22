import { useEffect, useState } from "react";
import {
  getRecruiterApplications,
  updateApplicationStatus
} from "../services/applicationService";

const statusColors = {
  APPLIED: "status-applied",
  UNDER_REVIEW: "status-review",
  SHORTLISTED: "status-shortlisted",
  REJECTED: "status-rejected",
  HIRED: "status-hired",
};

function RecruiterApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getRecruiterApplications()
      .then((response) => setApplications(response.data))
      .catch((error) => console.error("Failed to fetch recruiter applications:", error));
  }, []);

  function handleStatusChange(applicationId, newStatus) {
    updateApplicationStatus(applicationId, newStatus)
      .then((response) => {
        setApplications((prev) =>
          prev.map((app) =>
            app.applicationId === applicationId
              ? { ...app, status: response.data.status }
              : app
          )
        );
      })
      .catch((error) => console.error("Failed to update status:", error));
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Applications Received</h1>

      {applications.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📩</span>
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application.applicationId} className="application-card">
              <div className="application-info">
                <h3>{application.jobTitle}</h3>
                <p className="application-company">👤 {application.applicantName}</p>
              </div>
              <div className="application-actions">
                <span className={`status-badge ${statusColors[application.status] || ""}`}>
                  {application.status?.replace("_", " ")}
                </span>
                <select
                  className="status-select"
                  value={application.status}
                  onChange={(e) => handleStatusChange(application.applicationId, e.target.value)}
                >
                  <option value="APPLIED">Applied</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="HIRED">Hired</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecruiterApplicationsPage;