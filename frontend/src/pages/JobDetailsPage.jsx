import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

function JobDetailsPage() {

  const { jobId } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    getJobById(jobId)
      .then((response) => {
        console.log("Job details:", response.data);
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch job:", error);
      });
  }, [jobId]);

  if (!job) {
    return <p>Loading...</p>;
  }

return (
  <div>
    <h1>{job.title}</h1>

    <p>Company: {job.companyName}</p>
    <p>Location: {job.location}</p>
    <p>Description: {job.description}</p>
    <p>Salary: ₹{job.salary}</p>
    <p>Job Type: {job.jobType}</p>
    <p>Experience Required: {job.experienceRequired} years</p>

    <button
      onClick={() => {
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
      }}
    >
      Apply
    </button>
  </div>
);
}

export default JobDetailsPage;