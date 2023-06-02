import { render, screen } from "@testing-library/react";
import PromoteDeletePopUp from "./PromoteDeletePopUp";

describe("that the component renders correctly for both promote and delete", () => {
  test("that the component renders correctly for delete book", () => {
    render(<PromoteDeletePopUp method={"DELETE"} pageState={"books"} />);

    let deleteHeader = screen.getByTestId("delete-header");
    expect(deleteHeader).toHaveTextContent("Delete book");
  });

  test("that the component renders correctly for delete user", () => {
    render(<PromoteDeletePopUp method={"DELETE"} pageState={"users"} />);

    let deleteHeader = screen.getByTestId("delete-header");
    expect(deleteHeader).toHaveTextContent("Delete user");
  });

  test("that the component renders correctly for promote user", () => {
    render(<PromoteDeletePopUp method={"PUT"} pageState={"users"} />);

    let promoteHeader = screen.getByTestId("promote-header");
    expect(promoteHeader).toHaveTextContent("Change users role");
  });
});
