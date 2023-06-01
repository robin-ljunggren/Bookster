import { render, screen } from "@testing-library/react";
import EditAddPopUp from "./EditAddPopUp";

const initialState = {
  current: { title: "", author: "", quantity: 0 },
  previous: {},
};

const bookContent = {
  current: { title: "Harry Potter", author: "J.K Rowling", quantity: 10 },
  previous: { title: "Harry Potter", author: "J.K Rowling", quantity: 10 },
};

describe("that the component renders correctly for both add and edit book", () => {
  test("that the component renders correctly for add book", () => {
    render(<EditAddPopUp method={"POST"} bookContent={initialState} />);

    let editAddHeader = screen.getByTestId("editAdd-header");
    expect(editAddHeader).toHaveTextContent("Add book");
  });

  test("that the component renders correctly for edit user", () => {
    render(<EditAddPopUp method={"PUT"} bookContent={bookContent} />);

    let editAddHeader = screen.getByTestId("editAdd-header");
    let titleLabel = screen.getByTestId("title-label");
    expect(editAddHeader).toHaveTextContent("Edit book");
    expect(titleLabel).toHaveTextContent(bookContent.previous.title);
  });
});
