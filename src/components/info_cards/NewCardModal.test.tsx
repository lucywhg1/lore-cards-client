import React from "react";
import NewCardModal from "./NewCardModal";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(NewCardModal, () => {
  beforeEach(() => {
    render(<NewCardModal />);
  });

  it("displays the button with modal closed", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Create an Info Card" })
    ).toBeNull();
  });

  it("shows modal with new card form on button click", async () => {
    userEvent.click(screen.getByRole("button"));
    await screen.findByRole("dialog");

    expect(screen.getByRole("document")).toBeInTheDocument();
    expect(screen.getByTestId("info-card-form")).toBeInTheDocument();
  });

  describe("with the modal open", () => {
    beforeEach(async () => {
      userEvent.click(screen.getByRole("button"));

      await waitFor(() => expect(screen.findByTestId("info-card-form"));
    });

    it("closes when explicit Close button is clicked", async () => {
      userEvent.click(screen.getAllByRole("button", { name: "Close" })[1]); // first is in-line

      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });

    it("closes when form Create button is clicked", async () => {
      userEvent.click(screen.getAllByRole("button", { name: "Create" })[0]);

      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });
  });

  /**
   * Closes the modal on button close, and submit
   */
});
