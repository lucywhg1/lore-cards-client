import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import CardPreviewsList from './CardPreviewsList';

interface SearchBarProps {
  categoryId: number;
}

const CardSearchBar: React.FC<SearchBarProps> = ({ categoryId
}): JSX.Element => {
  const [input, setInput] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInput(event.target.value);
  };

  return (
    <>
      <Form inline>
        <Form.Control
          type='text'
          placeholder='Search for a card...'
          onChange={handleInputChange}
        />
      </Form>
      <CardPreviewsList input={input} categoryId={categoryId} />
    </>
  );
};

export default CardSearchBar;
