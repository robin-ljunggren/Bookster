import { fireEvent, render, screen } from '@testing-library/react';

import SiteHeader from './SiteHeader.js';

test("Login pop-up", () => {
  render(<SiteHeader />);

  const logSpy = jest.spyOn(global.console, 'log');

  const signInBtn = screen.getByTestId('sign-in-btn');
  fireEvent.click(signInBtn);

  expect(signInBtn).toBeInTheDocument();
  expect(logSpy).toHaveBeenCalledWith("onClick reacted");
});