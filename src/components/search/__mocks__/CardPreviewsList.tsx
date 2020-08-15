import React from "react";
import { Tag } from "../../../types";

interface MockCardPreviewsListProps {
  input: string;
  categoryId: number;
  tags: Tag[];
}

const MockCardPreviewsList: React.FC<MockCardPreviewsListProps> = ({ input, categoryId, tags }): JSX.Element => {
  return (
    <ul>
      <li>{input.toUpperCase()}</li>
      <li>{categoryId}</li>
      {tags.map(tag => (
        <li>{tag.name}</li>
      ))}
    </ul>
  );
};

export default MockCardPreviewsList;