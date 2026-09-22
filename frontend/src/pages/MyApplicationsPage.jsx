import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

const statusColors = {
  APPLIED: "status-applied",
  UNDER_REVIEW: "status-review",
  SHORTLISTED: "status-shortlisted",
  REJECTED: "status-rejected",
  HIRED: "status-hired",
};

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getMyApplications()
      .then((response) => setApplications(response.data))
      .catch((error) => console.error("Failed to fetch applications:", error));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">My Applications</h1>

      {applications.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">💼</span>
          <p>You haven't applied for any jobs yet.</p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application.applicationId} className="application-card">
              <div className="application-info">
                <h3>{application.jobTitle}</h3>
                <p className="application-company">{application.companyName}</p>
              </div>
              <span className={`status-badge ${statusColors[application.status] || ""}`}>
                {application.status?.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplicationsPage;