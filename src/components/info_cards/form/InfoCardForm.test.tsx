import React from "react";

import InfoCardForm from "./InfoCardForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faker from "faker";
import { SUMMARY_MAX_LENGTH } from "./validations";
import CategoryService from "../../../services/CategoryService";
import CategoryFactory from "../../../factories/CategoryFactory";

const mockOnSubmit = jest.fn();

jest.mock("../../../services/CategoryService");

describe(InfoCardForm, () => {
  const mockCategories = CategoryFactory.buildList(2);

  beforeAll(() => {
    CategoryService.prototype.getAll = jest.fn().mockResolvedValue(mockCategories);
  });

  beforeEach(async () => {
    render(<InfoCardForm onSubmit={mockOnSubmit} />);

    await waitFor(() => expect(screen.getAllByRole("option").length).toEqual(3)); // all categories loaded
  });

  it("renders the form", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("renders correct inputs", () => {
    expect(screen.getByRole("textbox", { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: 'Category' })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: 'Subtitle' })).toBeInTheDocument();
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: 'Description' })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Section" })).toBeInTheDocument();
    // links, tags
  });

  describe("Clear button", ());

  describe("Create button", () => {
    let createButton: HTMLElement;

    beforeEach(() => {
      createButton = screen.getByRole("button", { name: "Create" });
    });

    const fillOutRequiredFields = () => {
      userEvent.type(screen.getByRole("textbox", { name: 'Title' }), "Card title");
      userEvent.selectOptions(screen.getByRole("combobox", { name: 'Category' }), ['0']);
    };

    describe("when summary field is empty", () => {
      beforeEach(() => {
        fillOutRequiredFields();
      });

      it('generates from description if provided', async () => {
        const largeParagraph = Faker.lorem.words(SUMMARY_MAX_LENGTH); // more than enough
        const paragraphSubstring = `${ largeParagraph.substring(0, SUMMARY_MAX_LENGTH) }...`;

        userEvent.type(screen.getByRole("textbox", { name: 'Description' }), largeParagraph);
        userEvent.click(createButton);

        await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ summary: paragraphSubstring })));
      });

      it('generates warning summary if no description', async () => {
        userEvent.click(createButton);

        await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ summary: 'No description.' })));
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