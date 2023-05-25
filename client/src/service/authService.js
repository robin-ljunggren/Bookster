import React from 'react'

const baseURL = 'http://127.0.0.1:4000';

async function login({username, password}) {
  let url = baseURL + '/auth/login';
  const fetchOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: {
      username,
      password
    }
  }
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return data;
}

async function registration({username, password}) {
  let url = baseURL + '/auth/register';
  const fetchOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: {
      username,
      password
    }
  }
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return data;
}

const authService = { login, registration}

export default authService;