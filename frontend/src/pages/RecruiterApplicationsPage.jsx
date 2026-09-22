import { useEffect, useState } from "react";
import {
  getRecruiterApplications,
  updateApplicationStatus
} from "../services/applicationService";

function RecruiterApplicationsPage() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getRecruiterApplications()
      .then((response) => {
        console.log("Recruiter applications:", response.data);
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch recruiter applications:", error);
      });
  }, []);


  function handleStatusChange(applicationId, newStatus) {
  updateApplicationStatus(applicationId, newStatus)
    .then((response) => {
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.applicationId === applicationId
            ? { ...application, status: response.data.status }
            : application
        )
      );
    })
    .catch((error) => {
      console.error("Failed to update application status:", error);
    });
}

  return (
    <div>
      <h1>Recruiter Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <div key={application.applicationId}>
            <h3>{application.jobTitle}</h3>
            <p>Applicant: {application.applicantName}</p>
            <p>Status: {application.status}</p>
<select
  value={application.status}
  onChange={(e) =>
  handleStatusChange(
    application.applicationId,
    e.target.value
  )
}
>
  <option value="APPLIED">APPLIED</option>
  <option value="UNDER_REVIEW">UNDER_REVIEW</option>
  <option value="SHORTLISTED">SHORTLISTED</option>
  <option value="REJECTED">REJECTED</option>
  <option value="HIRED">HIRED</option>
</select>

          </div>
        ))
      )}
    </div>
  );
}

export default RecruiterApplicationsPage;