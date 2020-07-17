import React from "react";

const CATEGORIES: string[] = [
  "rumors",
  "creatures",
  "characters",
  "locations",
  "religion",
];

const mapCategoriesToOptions = (): JSX.Element => {
  const categoryOptions = CATEGORIES.map((category, index) => (
    <option key={index}>{category}</option>
  ));
  return <>{categoryOptions}</>;
};

export { mapCategoriesToOptions };
