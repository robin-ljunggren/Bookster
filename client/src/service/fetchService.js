import memoryService from "./memoryService";

const baseURL = "http://127.0.0.1:4000";

async function fetchAPI(url, options = { method: "GET" }) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function getAllBooks() {
  const url = baseURL + "/library/books";
  return await fetchAPI(url);
}

async function getAllUsers() {
  const url = baseURL + "/admin/users";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
  };

  return await fetchAPI(url, { headers: headersList });
}

const fetchService = { getAllBooks, getAllUsers };
export default fetchService;
