import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import RecruiterApplicationsPage from "./pages/RecruiterApplicationsPage";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import JobDetailsPage from "./pages/JobDetailsPage";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar title="Job Portal" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-applications"element={<ProtectedRoute>
                                                  <MyApplicationsPage /> </ProtectedRoute>}/> 
        <Route
  path="/recruiter-applications"
  element={
    <RoleProtectedRoute allowedRole="RECRUITER">
      <RecruiterApplicationsPage />
    </RoleProtectedRoute>
  }
/>  
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />                                        

      </Routes>
    </div>
  );
}

export default App;