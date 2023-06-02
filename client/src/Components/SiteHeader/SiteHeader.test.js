import { render, screen } from "@testing-library/react";
import SiteHeader from "./SiteHeader.js";

test("Login pop-up", () => {
  render(<SiteHeader />);
  const signInBtn = screen.getByTestId("sign-in-btn");
  const authForm = screen.getByTestId("auth-form");

  expect(signInBtn).toBeInTheDocument();
  expect(authForm).toBeInTheDocument();
});

test("current-user", async () => {
  render(<SiteHeader />);

  const currentUser = screen.getByTestId("current-user");

  expect(currentUser).toHaveTextContent("guest");
});
