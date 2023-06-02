import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import memoryService from "./service/memoryService";
import jwt from "jsonwebtoken";

test("that the page Users shows to admin but redirects non admin users back to the Books page", () => {
  let accessToken = jwt.sign(
    { username: "Bob", role: "ADMIN", exp: Date.now() },
    "somesecretsareawesomebutpenguinsbeatthemall"
  );
  memoryService.saveSessionValue("JWT_TOKEN", accessToken);

  render(<App />);

  const navUsersBtn = screen.getByTestId("admin-nav-users");

  expect(navUsersBtn).toBeInTheDocument();

  expect(global.window.location.pathname).toBe("/");

  fireEvent.click(navUsersBtn);

  expect(global.window.location.pathname).toBe("/admin/users");

  accessToken = jwt.sign(
    { username: "Yves", role: "USER", exp: Date.now() },
    "somesecretsareawesomebutpenguinsbeatthemall"
  );
  memoryService.saveSessionValue("JWT_TOKEN", accessToken);

  render(<App />);

  expect(navUsersBtn).not.toBeInTheDocument();

  expect(global.window.location.pathname).toBe("/");
});
