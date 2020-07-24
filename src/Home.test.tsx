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

  it("displays the welcome header", () => {
    expect(screen.getByText("Welcome to the landing page!")).toBeInTheDocument();
  });

  it("displays navigation buttons", () => {
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "New Card" })).toBeInTheDocument();
  });
});