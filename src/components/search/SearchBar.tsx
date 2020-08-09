import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface SearchBarProps {
  renderFiltered: (input: string) => React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  renderFiltered
}): JSX.Element => {
  const [input, setInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  return (
    <Form inline>
      <Form.Control
        type='text'
        placeholder='Search for a card...'
        onChange={handleChange}
      />
      {renderFiltered(input)}
    </Form>
  );
};

export default SearchBar;
