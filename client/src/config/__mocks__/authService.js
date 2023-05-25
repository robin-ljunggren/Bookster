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
      console.log("resolve");
      resolve(username);
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
