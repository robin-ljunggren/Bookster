/**
 * This file provides service functions for auth endpoints, login and registration,
 * that is used in the project.
 * Each service function returns the JSON data and the status code of the response
 */

import memoryService from "./memoryService";
import jwtUtil from "../util/jwtUtil";

const baseURL = "http://127.0.0.1:4000";

async function login(username, password) {
  let url = baseURL + "/auth/login";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  if (response.status === 200)
    memoryService.saveSessionValue("JWT_TOKEN", data.accessToken);

  return { status: response.status, data };
}

async function registration(username, password) {
  let url = baseURL + "/auth/register";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return { status: response.status, data };
}

function checkAuth() {
  const userDetails = { username: "", role: "" };
  let isValid = false;

  const token = memoryService.getSessionValue("JWT_TOKEN");

  if (token) {
    const payload = jwtUtil.parsePayload(token);
    const valid = jwtUtil.checkTokenValidity(payload);
    if (valid) {
      userDetails.username = payload.username;
      userDetails.role = payload.role;
      isValid = valid;
    }
  }
  return { userDetails, isValid };
}

const authService = { login, registration, checkAuth };

export default authService;
