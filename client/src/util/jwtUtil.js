/**
 * This file is a util file for extracting data from a jwtToken and also to see if it is still valid.
 */

function parsePayload(token) {
  const payload = token.split(".")[1];

  return JSON.parse(atob(payload));
}

/** Takes the expiration time from a payload and checks if it is ahead of now */
function checkTokenValidity(payload) {
  const { exp } = payload;
  const now = Math.floor(Date.now() / 1000);

  return exp - now > 0;
}

const jwtUtil = { parsePayload, checkTokenValidity };
export default jwtUtil;
