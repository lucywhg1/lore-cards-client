import React, { ChangeEvent } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Category from "../../../types/Category";

interface CategoryInputProps {
  category: Category;
  onSelect: (newValue: Category) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ category, onSelect }): JSX.Element => {
  const mapCategoriesToOptions = (): JSX.Element => {
    const categoryOptions = CATEGORIES.map((category, index) => (
      <option key={index}>{category}</option>
    ));
    return <>{categoryOptions}</>;
  };

  return (
    <Form.Group as={Col} controlId="formCardCategory">
      <Form.Label>Category</Form.Label>
      <Form.Control
        className="border border-primary"
        as="select"
        value=""
        custom
      >
        <option value="">Choose...</option>
        {mapCategoriesToOptions()}
      </Form.Control>
    </Form.Group>
  );
};

export default CategoryInput;
