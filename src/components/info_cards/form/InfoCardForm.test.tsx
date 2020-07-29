import React from "react";

import InfoCardForm from "./InfoCardForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faker from "faker";
import { SUMMARY_MAX_LENGTH } from "./validations";
import CategoryService from "../../../services/CategoryService";
import { InfoCardInputFactory, CategoryFactory } from "../../../factories";

const mockOnSubmit = jest.fn();
jest.mock("../../../services/CategoryService");

describe(InfoCardForm, () => {
  const mockCategories = CategoryFactory.buildList(2);
  const emptyInputs = InfoCardInputFactory.build();
  const filledInputs = InfoCardInputFactory.build(
    {},
    { transient: { filled: true } }
  );

  const fillOutRequiredFields = () => {
    const { title } = filledInputs;

    userEvent.type(screen.getByRole("textbox", { name: "Title" }), title);
    userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Category" }),
      ["0"]
    ); // not from filledInputs

    return { title, category: mockCategories[0] };
  };

  const renderComponent = async (
    defaultValues = emptyInputs
  ): Promise<void> => {
    render(
      <InfoCardForm onSubmit={mockOnSubmit} defaultValues={defaultValues} />
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

    fit("renders with default values", () => {
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

  describe("Create button", () => {
    let createButton: HTMLElement;

    beforeEach(() => {
      renderComponent();

      createButton = screen.getByRole("button", { name: "Create" });
    });

    fit("calls #onSubmit when required fields are filled", () => {
      const requiredFormData = fillOutRequiredFields();
      userEvent.click(createButton);

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining(requiredFormData)
      );
    });

    it("calls #onSubmit with all fields filled", () => {});

    describe("when summary field is empty", () => {
      beforeEach(() => {
        fillOutRequiredFields();
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
