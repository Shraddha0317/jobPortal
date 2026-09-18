function JobCard({ job }) {
  return (
    <div>
      <h3>{job.title}</h3>

      <p>Company: {job.companyName}</p>
      <p>Location: {job.location}</p>
      <p>Description: {job.description}</p>
      <p>Job Type: {job.jobType}</p>
      <p>Experience: {job.experienceRequired}</p>
      <p>Salary: {job.salary}</p>

      <button>View Details</button>
    </div>
  );
}

export default JobCard;