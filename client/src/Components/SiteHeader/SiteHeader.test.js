import {
  fireEvent,
  render,
  screen,
  waitFor,
  wait,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SiteHeader from "./SiteHeader.js";


test("Login pop-up", () => {
  render(<SiteHeader />);
  const signInBtn = screen.getByTestId("sign-in-btn");
  const authForm = screen.getByTestId("auth-form");

  // fireEvent.click(signInBtn);

  expect(signInBtn).toBeInTheDocument();
  expect(authForm).toBeInTheDocument();
});

test("current-user", async () => {
  render(<SiteHeader />);
  let username = "Bob";
  let password = "123";

  const currentUser = screen.getByTestId("current-user");
  const usernameInput = screen.getByTestId("auth-input-username");
  const passwordInput = screen.getByTestId("auth-input-password");
  const authForm = screen.getByTestId("auth-form");

  expect(currentUser).toHaveTextContent("guest");

  // fireEvent.change(usernameInput, {target:{value: username}});
  // fireEvent.change(passwordInput, {target:{value: password}});
  // fireEvent.submit(authForm, {bubbles: true});

  // act(()=> {
  //   authForm.dispatchEvent(new Event ("submit", {bubbles: true}));
  // });

  // let fetchUser = await jest.fn(fireEvent.submit(authForm, {username, password}));
  // fetchUser();
  //   function sleep(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  // }

  //   await sleep(500);
  //   expect(screen.getByTestId('current-user')).toHaveTextContent("Bob");
  // await wait(() => expect(screen.getByTestId('current-user')).toHaveTextContent("Bob"));
});
