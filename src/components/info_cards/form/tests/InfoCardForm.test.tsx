import React from "react";

import InfoCardForm from "../InfoCardForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faker from "faker";
import { SUMMARY_MAX_LENGTH } from "../validations";
import { InfoCardInputFactory, CategoryFactory } from "../../../../factories";
import CategoryService from "../../../../services/CategoryService";

jest.mock("../../../services/CategoryService");

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

export const fillOutRequiredFields = (title: string): void => {
  userEvent.type(screen.getByRole("textbox", { name: "Title" }), title);
  userEvent.selectOptions(screen.getByRole("combobox", { name: "Category" }), [
    "0",
  ]); // not from filledInputs
};

describe(InfoCardForm, () => {
  const mockCategories = CategoryFactory.buildList(2);
  const emptyInputs = InfoCardInputFactory.build();
  const filledInputs = InfoCardInputFactory.build(
    {},
    { transient: { filled: true } }
  );

  const renderComponent = async (
    defaultValues = emptyInputs
  ): Promise<void> => {
    render(
      <InfoCardForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        defaultValues={defaultValues}
      />
    );

    await waitFor(() =>
      expect(screen.getAllByRole("option").length).toEqual(3)
    ); // all categories fetched
  };

  beforeAll(() => {
    CategoryService.prototype.getAll = jest
      .fn()
      .mockResolvedValue(mockCategories);
  });

  it("displays form inputs", () => {
    renderComponent();

    expect(screen.getByRole("textbox", { name: "Title" })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Category" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Subtitle" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Summary" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Description" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Section" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    // links, tags
  });

  describe("default value population", () => {
    beforeEach(() => {
      renderComponent(filledInputs);
    });

    it("renders with default values", () => {
      expect(screen.getByDisplayValue(filledInputs.title)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.subtitle)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.summary)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.description)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.additionalSections[0].heading)
      ).toBeInTheDocument();
    });
  });

  it("calls #onCancel when button is clicked", () => {
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  describe("Create button", () => {
    let createButton: HTMLElement;

    beforeEach(() => {
      renderComponent();

      createButton = screen.getByRole("button", { name: "Create" });
    });

    it("calls #onSubmit when required fields are filled", () => {
      fillOutRequiredFields(filledInputs.title);
      userEvent.click(createButton);

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: filledInputs.title,
          category: mockCategories[0],
        })
      );
    });

    it("calls #onSubmit with all fields filled", () => {});

    describe("when summary field is empty", () => {
      beforeEach(() => {
        fillOutRequiredFields(filledInputs.title);
      });

      it("generates from description if provided", async () => {
        const largeParagraph = Faker.lorem.words(SUMMARY_MAX_LENGTH); // more than enough
        const paragraphSubstring = `${largeParagraph.substring(
          0,
          SUMMARY_MAX_LENGTH
        )}...`;

        userEvent.type(
          screen.getByRole("textbox", { name: "Description" }),
          largeParagraph
        );
        userEvent.click(createButton);

        await waitFor(() =>
          expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ summary: paragraphSubstring })
          )
        );
      });

      it("generates warning summary if no description", async () => {
        userEvent.click(createButton);

        await waitFor(() =>
          expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ summary: "No description." })
          )
        );
      });
    });
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
