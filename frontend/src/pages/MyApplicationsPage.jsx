import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

function MyApplicationsPage() {  
    console.log("MyApplicationsPage rendered");
    const [applications, setApplications] = useState([]);

   useEffect(() => {
  getMyApplications()
    .then((response) => {
      console.log("My applications:", response.data);
      setApplications(response.data);
    })
    .catch((error) => {
      console.error("Failed to fetch applications:", error);
    });
}, []);

return (
  <div>
    <h1>My Applications</h1>

    {applications.length === 0 ? (
      <p>You haven't applied for any jobs yet.</p>
    ) : (
      applications.map((application) => (
        <div key={application.applicationId}>
          <h3>{application.jobTitle}</h3>
          <p>Application Status: {application.status}</p>
        </div>
      ))
    )}
  </div>
);
}

export default MyApplicationsPage;