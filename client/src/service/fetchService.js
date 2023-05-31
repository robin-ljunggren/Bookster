import memoryService from "./memoryService";

const baseURL = "http://127.0.0.1:4000";

async function fetchAPI(endpoint, options = { method: "GET" }) {
  const url = baseURL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function getAllBooks() {
  const endpoint = "/library/books";
  return await fetchAPI(endpoint);
}

async function searchBook(query) {
  const endpoint = `/library/books/search?q=${query}`
  return await fetchAPI(endpoint);
}

async function getAllUsers() {
  const endpoint = "/admin/users";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
    "Content-Type": "application/json",
  };

  return await fetchAPI(endpoint, { headers: headersList });
}

async function buyBook(bookToOrder) {
  const endpoint = "/library/user/books";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    title: bookToOrder.title,
    quantity: bookToOrder.quantity,
  });

  return await fetchAPI(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
}

const fetchService = { getAllBooks, searchBook, getAllUsers, buyBook };
export default fetchService;
