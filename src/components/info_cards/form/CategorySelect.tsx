import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Col } from "react-bootstrap";
import Category from "../../../types/Category";
import CategoryService from "../../../services/CategoryService";
import { DeepMap } from "react-hook-form/dist/types/utils";
import { FieldError } from "react-hook-form";

interface CategorySelectProps {
  category?: Category;
  onChange: (selectedCategory: Category) => void;
  errors?: DeepMap<Category, FieldError>;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  onChange,
  errors,
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
        as="select"
        custom
        value={category ? category.id : -1}
        onChange={(event) => {
          handleChange(event as any);
        }}
        isInvalid={!!errors}
        className="border border-primary"
      >
        <option value={-1}>Choose...</option>
        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {errors?.id?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CategorySelect;
