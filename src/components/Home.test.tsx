import React from "react";
import Home from "./Home";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe(Home, () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it("displays the welcome header", async () => {
    expect(
      await screen.findByText("Welcome to the landing page!")
    ).toBeInTheDocument();
  });
});
