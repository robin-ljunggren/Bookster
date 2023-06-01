/**
 * A file to mock the authService for the endpoints login and registration
 */

import jwt from "jsonwebtoken";

function login(username, password) {
  console.log("credentials: ", username, password);
  const loginPromise = new Promise((resolve, reject) => {
    if (username === "" || password === "") {
      reject("Empty credentials");
    } else {
      const accessToken = jwt.sign(
        { username },
        "somesecretsareawesomebutpenguinsbeatthemall"
      );
      sessionStorage.setItem("jwt-token", accessToken);
      const response = { user: { username, role: "admin" }, status: 200 };
      resolve(response);
    }
  });

  return loginPromise;
}

function registration(username, password) {
  const registerPromise = new Promise((resolve, reject) => {
    if (username === "" || password === "") {
      reject("Empty credentials");
    } else {
      resolve();
    }
  });

  return registerPromise;
}

const authService = { login, registration };
export default authService;
