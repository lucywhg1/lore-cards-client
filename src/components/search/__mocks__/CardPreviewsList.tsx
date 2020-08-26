import React from "react";
import { Tag } from "../../../types";

interface MockCardPreviewsListProps {
  input: string;
  categoryId: number;
  tagsFilter: Tag[];
}

const MockCardPreviewsList: React.FC<MockCardPreviewsListProps> = ({ input, categoryId, tagsFilter }): JSX.Element => {
  return (
    <ul>
      <li key="input">{input.toUpperCase()}</li>
      <li key="category">{categoryId}</li>
      {tagsFilter.map(tag => (
        <li key="filtered-tag">{`Tag name is ${ tag.name }`}</li>
      ))}
    </ul>
  );
};

export default MockCardPreviewsList;