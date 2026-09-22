import JobList from "../components/JobList";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobs, searchJobs } from "../services/jobService";

function JobsPage() {

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getAllJobs()
      .then((response) => {
        console.log("Jobs:", response.data);
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
      });
  }, []);

  function handleSearch(page = 0) {
    searchJobs({
      keyword: keyword || undefined,
      location: location || undefined,
      jobType: jobType || undefined,
      experience: experience || undefined,
      page: page,
      size: 10
    })
      .then((response) => {
        console.log("Search results:", response.data);
        setJobs(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Failed to search jobs:", error);
      });
  }

  return (
    <div className="jobs-page">

      <div className="search-container">

        <input
          type="text"
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FREELANCE">Freelance</option>
        </select>

        <input
          type="number"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          min="0"
        />

        <button onClick={() => handleSearch(0)}>
          Search
        </button>

        <button
          onClick={() => {
            setKeyword("");
            setLocation("");
            setJobType("");
            setExperience("");

            searchJobs({
              page: 0,
              size: 10
            })
              .then((response) => {
                setJobs(response.data.content);
                setCurrentPage(response.data.number);
                setTotalPages(response.data.totalPages);
              })
              .catch((error) => {
                console.error("Failed to clear search:", error);
              });
          }}
        >
          Clear
        </button>

      </div>

      <h1>Jobs</h1>

 {jobs.length === 0 ? (
  <p>No jobs available.</p>
) : (
  <div className="jobs-grid">
    {jobs.map((job) => (
      <JobCard
        key={job.jobId}
        job={job}
      />
    ))}
  </div>
)}

      <button
        disabled={currentPage === 0}
        onClick={() => handleSearch(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => handleSearch(currentPage + 1)}
      >
        Next
      </button>

    </div>
  );
}

export default JobsPage;