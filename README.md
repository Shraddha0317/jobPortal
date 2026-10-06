# Job Portal Application

A full-stack job portal where recruiters can post jobs and applicants can search and apply for them. Built with Spring Boot on the backend and React on the frontend.

---

## What This Project Does

- Recruiters can register, log in, post jobs, and review applications
- Applicants can register, log in, search for jobs, and apply
- Each user gets a JWT token on login that controls what they can access
- Recruiters can update application statuses (e.g., accept or reject)
- Applicants can view all their submitted applications in one place

---

## Tech Stack

**Backend**
- Java 17
- Spring Boot 4.x
- Spring Security + JWT (jjwt 0.12.6)
- Spring Data JPA + Hibernate
- MySQL
- Lombok
- Maven

**Frontend**
- React 19
- React Router DOM
- Axios
- Vite

---

## Project Structure

```
job-portal-backend/
├── src/main/java/com/jobportal/
│   ├── config/         # Security, CORS, Password encoder config
│   ├── controller/     # REST API endpoints
│   ├── dto/            # Request and response objects
│   ├── entity/         # JPA entities (Users, Job, Application)
│   ├── exception/      # Custom exceptions + global handler
│   ├── repository/     # Spring Data JPA repositories
│   ├── security/       # JWT filter and service
│   ├── service/        # Business logic
│   └── specification/  # Dynamic job search using JPA Specifications
│
frontend/
├── src/
│   ├── components/     # Navbar, JobCard, ProtectedRoute, etc.
│   ├── context/        # Auth context (global login state)
│   ├── pages/          # All page-level components
│   └── services/       # Axios API calls
```

---

## API Endpoints

### Auth / Users — `/api/users`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Register a new user |
| POST | `/login` | Login and get JWT token |
| GET | `/getUserById/{id}` | Get user by ID |
| PUT | `/updateUser/{id}` | Update user details |
| DELETE | `/deleteUser/{id}` | Delete a user |
| GET | `/getAllUsers` | Get all users (Recruiter only) |

### Jobs — `/api/jobs`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/addJob` | Post a new job (Recruiter only) |
| GET | `/` | Get all jobs |
| GET | `/{id}` | Get job by ID |
| GET | `/search` | Search jobs by keyword, location, type, experience |
| PUT | `/{id}` | Update a job (Recruiter only) |

### Applications — `/api/applications`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/{jobId}` | Apply for a job (Applicant only) |
| GET | `/my-applications` | View your applications (Applicant only) |
| GET | `/recruiter-applications` | View applications for your jobs (Recruiter only) |
| PUT | `/{applicationId}/status` | Update application status (Recruiter only) |

---

## How to Run

### Backend

1. Create a MySQL database called `Job_Portal`
2. Update `src/main/resources/application.properties` with your DB credentials
3. Run the app:

```bash
./mvnw spring-boot:run
```

The server starts on `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`

---

## Key Features Worth Mentioning

- JWT authentication with role-based access (RECRUITER / APPLICANT)
- Dynamic job search using JPA Specifications (filter by keyword, location, job type, experience)
- Duplicate application prevention using a unique constraint on job + applicant
- Global exception handling with meaningful error responses
- Clean separation of concerns — controllers, services, DTOs, entities are all separate
- Protected routes on the frontend based on user role

---

## Environment Setup

Make sure you have:
- Java 17+
- Maven
- MySQL running locally
- Node.js 18+
