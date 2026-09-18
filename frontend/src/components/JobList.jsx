import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "./JobCard";

function JobList() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    api.get("/api/jobs")
      .then((response) => {
        console.log(response.data);
        setJobs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

 return (
  <div>
    <h2>Available Jobs</h2>

    <p>Total jobs: {jobs.length}</p>

    {jobs.map((job) => (
      <JobCard key={job.jobId} job={job} />
    ))}
  </div>
);
}

export default JobList;