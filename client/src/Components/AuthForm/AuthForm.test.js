import { fireEvent, render, screen } from "@testing-library/react";
import AuthForm from "./AuthForm";

test("Toggle from sign in form to register form", () => {
  render(<AuthForm />);

  let toggleBtn = screen.getByTestId("toggle-form-span");
  let title = screen.getByTestId("auth-form-title");

  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Sign in");

  fireEvent.click(toggleBtn);

  expect(title).toHaveTextContent("Register");
});

test("reg form submit", () => {});
