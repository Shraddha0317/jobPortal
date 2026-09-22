import api from "./api";


export function getMyApplications() {
  return api.get("/api/applications/my-applications");
}

export function applyForJob(jobId) {
  return api.post(`/api/applications/${jobId}`);
}

export function getRecruiterApplications() {
  return api.get("/api/applications/recruiter-applications");
}

export function updateApplicationStatus(applicationId, status) {
  return api.put(
    `/api/applications/${applicationId}/status?status=${status}`
  );
}