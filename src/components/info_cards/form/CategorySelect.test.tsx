import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySelect from "./CategorySelect";
import Category from "../../../types/Category";
import CategoryFactory from "../../../factories/Category";
import { CategoryService } from "../../../services/Category";

const mockOnChange = jest.fn();
jest.mock("../../../services/Category");

describe(CategorySelect, () => {
  const unselectedCategory: Category = { id: -1, title: "" };
  const availableCategories = CategoryFactory.buildList(2);

  const renderComponent = (category = unselectedCategory): void => {
    render(<CategorySelect category={category} onChange={mockOnChange} />);
  };

  beforeAll(() => {
    const mockGetAll = jest.fn().mockResolvedValue(availableCategories);
    CategoryService.prototype.getAll = mockGetAll;
  });

  it("renders the select dropdown with default option", () => {
    renderComponent();
    expect(screen.getByTitle("Select category")).toBeInTheDocument();
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("fills dropdown with fetched categories", () => {
    renderComponent();
    availableCategories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
  });

  it("invokes #onChange on select", () => {
    userEvent.selectOptions(screen.getByTitle("Select category"), [
      availableCategories[0].title,
    ]);

    expect(mockOnChange).toHaveBeenCalledWith(availableCategories[0]);
  });
});
