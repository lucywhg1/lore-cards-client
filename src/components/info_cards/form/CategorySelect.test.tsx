import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySelect from "./CategorySelect";
import Category from "../../../types/Category";
import CategoryFactory from "../../../factories/CategoryFactory";
import CategoryService from "../../../services/CategoryService";

const mockOnChange = jest.fn();
jest.mock("../../../services/CategoryService");

describe(CategorySelect, () => {
  const unselectedCategory: Category = { id: -1, title: "" };
  const availableCategories = CategoryFactory.buildList(2);

  beforeAll(() => {
    CategoryService.prototype.getAll = jest.fn().mockResolvedValue(availableCategories);
  });

  beforeEach(async () => {
    render(<CategorySelect category={unselectedCategory} onChange={mockOnChange} />);
    await screen.findByText(availableCategories[0].title);
  });

  it("renders the select dropdown with default option", () => {
    expect(screen.getByTitle("Select category")).toBeInTheDocument();
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("fills dropdown with fetched categories", () => {
    availableCategories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
  });

  it("invokes #onChange on select", () => {
    userEvent.selectOptions(screen.getByTitle("Select category"), ["0"]);

    expect(mockOnChange).toHaveBeenCalledWith(availableCategories[0]);
  });
});
