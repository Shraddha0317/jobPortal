import { useState } from "react";
import { registerUser } from "../services/authService";

function RegisterPage() {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("APPLICANT");

function handleSubmit(event) {
  event.preventDefault();

  const userData = {
    name: userName,
    email: userEmail,
    password: userPassword,
    role: userRole
  };

  registerUser(userData)
    .then((response) => {
      console.log("Registration successful:", response.data);
    })
    .catch((error) => {
      console.error("Registration failed:", error);
    });
}
  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
        />

        <select
          value={userRole}
          onChange={(event) => setUserRole(event.target.value)}
        >
          <option value="APPLICANT">Applicant</option>
          <option value="RECRUITER">Recruiter</option>
        </select>

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default RegisterPage;