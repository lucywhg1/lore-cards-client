import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Tag } from '../../types';
import TagMultiSelect from '../tags/TagMultiSelect';

export interface SearchFilter {
  body: string;
  tags: Tag[];
}

interface CardSearchBarProps {
  filter: SearchFilter;
  setFilter: (newFilter: SearchFilter) => void;
}

const CardSearchBar: React.FC<CardSearchBarProps> = ({
  filter,
  setFilter
}): JSX.Element => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFilter({ ...filter, body: event.target.value });
  };

  const handleSelectChange = (selected: Tag[]): void => {
    setFilter({ ...filter, tags: selected });
  };

  return (
    <Form inline>
      <InputGroup>
        <Form.Control
          type='text'
          placeholder='Search for a card...'
          value={filter.body}
          onChange={handleInputChange}
        />
        <InputGroup.Append>
          <TagMultiSelect
            selected={filter.tags}
            onChange={handleSelectChange}
          />
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default CardSearchBar;
