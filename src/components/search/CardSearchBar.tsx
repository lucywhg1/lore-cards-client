import React from 'react';
import { Col, Form } from 'react-bootstrap';
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
    <Form>
      <Form.Row>
        <Col xs={8}>
          <Form.Control
            type='text'
            placeholder='Search by body or title...'
            value={filter.body}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <TagMultiSelect
            selected={filter.tags}
            onChange={handleSelectChange}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default CardSearchBar;
