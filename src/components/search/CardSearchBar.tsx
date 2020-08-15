import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import CardPreviewsList from './CardPreviewsList';
import { Tag } from '../../types';
import TagMultiSelect from '../tags/TagMultiSelect';

interface SearchBarProps {
  categoryId: number;
}

const CardSearchBar: React.FC<SearchBarProps> = ({ categoryId
}): JSX.Element => {
  const [input, setInput] = useState('');
  const [tagsFilter, setTagsFilter] = useState<Tag[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInput(event.target.value);
  };

  const handleSelectChange = (selected: Tag[]): void => {
    setTagsFilter(selected);
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
            <TagMultiSelect selected={tagsFilter} onChange={handleSelectChange} />
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <CardPreviewsList input={input} tags={tagsFilter} categoryId={categoryId} />
    </>
  );
};

export default CardSearchBar;
