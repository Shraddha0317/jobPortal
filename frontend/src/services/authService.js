import api from "./api";

export function registerUser(userData) {
  return api.post("/api/users/add", userData);
}

export function loginUser(userData) {
  return api.post("/api/users/login", userData);
}

export function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}