import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Category } from '../../types';
import { emptyCategory } from '../../types/Category';
import CategorySelect from '../categories/CategorySelect';

interface SearchBarProps {
  renderFiltered: (input: string) => React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  renderFiltered
}): JSX.Element => {
  const [input, setInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category>(emptyCategory);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInput(event.target.value);
  };

  const handleCategoryChange = (selected: Category): void => {
    setCategoryFilter(selected);
  };

  return (
    <>
      <Form inline>
        <InputGroup>
          <Form.Control
            type='text'
            placeholder='Search for a card...'
            onChange={handleInputChange}
          />
          <InputGroup.Append>
            <CategorySelect
              onChange={handleCategoryChange}
              category={categoryFilter}
              placeholder='By category...'
              className='bg-secondary text-light'
            />
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {renderFiltered(input)}
    </>
  );
};

export default SearchBar;
