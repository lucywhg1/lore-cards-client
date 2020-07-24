import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdditionalSectionsInput from "./AdditionalSectionsInput";
import Faker from "faker";
import Section from "../../../types/Section";
import SectionFactory from "../../../factories/SectionFactory";

const mockOnChange = jest.fn();

describe(AdditionalSectionsInput, () => {
  const placeholder = {
    heading: "Add a section heading...",
    body: "...and a body.",
  };

  const renderInput = (loadedSections: Section[]): void => {
    render(
      <AdditionalSectionsInput
        sections={loadedSections}
        onChange={mockOnChange}
      />
    );
  };

  describe("no sections", () => {
    beforeEach(() => {
      renderInput([]);
    });

    it("does not render inputs with no sections", () => {
      expect(screen.queryAllByPlaceholderText(placeholder.heading)).toEqual([]);
      expect(screen.queryAllByPlaceholderText(placeholder.body)).toEqual([]);
    });

    it("renders an Add Section button", () => {
      expect(
        screen.getByRole("button", { name: "Add Section" })
      ).toBeInTheDocument();
    });

    it("invokes #onChange when section is added", () => {
      userEvent.click(screen.getByRole("button", { name: "Add Section" }));
      expect(mockOnChange).toHaveBeenCalledWith([
        {
          heading: "",
          body: "",
        },
      ]);
    });
  });

  describe("with sections created", () => {
    const loadedSection = SectionFactory.build();

    beforeEach(() => {
      renderInput([loadedSection]);
    });

    it("displays the loaded sections", () => {
      expect(
        screen.getByPlaceholderText(placeholder.heading)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(placeholder.body)).toBeInTheDocument();
    });

    it("invokes #onChange when a section heading is updated", () => {
      const heading = Faker.company.bsNoun();
      const headingInput = screen.getByPlaceholderText(placeholder.heading);

      userEvent.type(headingInput, heading);

      expect(mockOnChange).toHaveBeenCalledWith([
        { ...loadedSection, heading },
      ]);
    });

    it("invokes #onChange when section body is updated", () => {
      const body = Faker.lorem.paragraph();
      const bodyInput = screen.getByPlaceholderText(placeholder.body);

      userEvent.type(bodyInput, body);

      expect(mockOnChange).toHaveBeenCalledWith([{ ...loadedSection, body }]);
    });

    it("invokes #onChange when section is removed", () => {
      const removeButton = screen.getByTitle("Remove section");

      userEvent.click(removeButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });
});
