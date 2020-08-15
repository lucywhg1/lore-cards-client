import React from "react";

interface MockCardPreviewsListProps {
  input: string;
  categoryId: number;
}

const MockCardPreviewsList: React.FC<MockCardPreviewsListProps> = ({ input, categoryId }): JSX.Element => {
  return (
    <ul><li>{input.toUpperCase()}</li><li>{categoryId}</li></ul>
  );
};

export default MockCardPreviewsList;