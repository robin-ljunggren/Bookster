/**
 * This file provides service functions for handling storage actions that is used in the project.
 */

function saveSessionValue(ref, value) {
  value = JSON.stringify(value);

  sessionStorage.setItem(ref, value);
}

function getSessionValue(ref) {
  let value = sessionStorage.getItem(ref);
  return JSON.parse(value);
}

function removeSessionValue(ref) {
  sessionStorage.removeItem(ref);
}

const memoryService = { saveSessionValue, getSessionValue, removeSessionValue };
export default memoryService;
