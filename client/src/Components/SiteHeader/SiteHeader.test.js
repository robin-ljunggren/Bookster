import { fireEvent, render, screen } from '@testing-library/react';
import SiteHeader from './SiteHeader.js';

test("Login pop-up", () => {
  render(<SiteHeader />);
  const signInBtn = screen.getByTestId('sign-in-btn');
  const authForm = screen.getByTestId('auth-form');

  // fireEvent.click(signInBtn);

  expect(signInBtn).toBeInTheDocument();
  expect(authForm).toBeInTheDocument();
});