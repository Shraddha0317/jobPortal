import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyApplicationsPage from "./pages/MyApplicationsPage";

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

      </Routes>
    </div>
  );
}

export default App;