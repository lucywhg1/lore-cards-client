import TagMultiSelect from "../TagMultiSelect";
import { TagBase } from "../../../../types/Tag";
import { render } from "@testing-library/react";
import React from "react";

const mockOnChange = jest.fn();

describe(TagMultiSelect, () => {
  const renderComponent = (selected: TagBase[] = []): void => {
    render(<TagMultiSelect onChange={mockOnChange} selected={selected} />);
  };
});
