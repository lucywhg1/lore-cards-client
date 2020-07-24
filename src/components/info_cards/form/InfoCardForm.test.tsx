import React from "react";

import InfoCardForm from "./InfoCardForm";
import { render, screen } from "@testing-library/react";

describe(InfoCardForm, () => {
  beforeEach(() => {
    render(<InfoCardForm />);
  });

  it("renders the form", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders correct inputs", () => {
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Subtitle")).toBeInTheDocument();
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
    expect(screen.getByLabelText("Summary")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Section" })).toBeInTheDocument();
  });

});

// interface FormInput {
//   title: string;
//   subtitle: string;
//   category: Category;
//   summary: string;
//   description: string;
//   additionalSections: Section[];

// For each: onChange, show value, type, submit, cancel
// }