import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Col } from "react-bootstrap";
import Category from "../../../types/Category";
import CategoryService from "../../../services/CategoryService";

interface CategorySelectProps {
  category: Category;
  onChange: (selectedCategory: Category) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  onChange,
}): JSX.Element => {
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryService = new CategoryService();
      setAvailableCategories(await categoryService.getAll());
    };

    fetchCategories();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.persist();
    onChange(availableCategories[Number(event.target.value)]);
  };

  return (
    <Form.Group as={Col} controlId="categorySelect">
      <Form.Label>Category</Form.Label>
      <Form.Control
        title="Select category"
        className="border border-primary"
        as="select"
        value={category.id}
        onChange={(event) => {
          handleChange(event as any);
        }}
        custom
      >
        <option value={-1}>Choose...</option>
        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default CategorySelect;
