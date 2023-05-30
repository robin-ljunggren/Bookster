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

async function addBook(book) {
  // POST /admin/books { "author", "title", "quantity"}
  const endpoint = "/admin/books";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    title: book.title,
    author: book.author,
    quantity: book.quantity,
  });

  return await fetchAPI(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
}

async function updateBook(preivousTitle, book) {
  // PUT /admin/books { "previous", "current" }
  const endpoint = "/admin/books";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    preivous: { title: preivousTitle },
    current: {
      title: book.title,
      author: book.author,
      quantity: book.quantity,
    },
  });

  return await fetchAPI(endpoint, {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  });
}

async function deleteBook(book) {
  // DELETE /admin/books { "title" }
  const endpoint = "/admin/books";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({ title: book.title });

  return await fetchAPI(endpoint, {
    method: "DELETE",
    body: bodyContent,
    headers: headersList,
  });
}

async function alterUser() {
  const endpoint = "/admin/users";
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + memoryService.getSessionValue("JWT_TOKEN"),
    "Content-Type": "application/json",
  };

  return await fetchAPI(endpoint, { headers: headersList });
}
// PUT /admin/users {"username"}

// DELETE /admin/users {"username"}

const fetchService = { getAllBooks, getAllUsers, buyBook, addBook, updateBook };
export default fetchService;
