import React, { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { InfoCardPreview } from '../../types';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import CardPreview from './CardPreview';
import { useHistory } from 'react-router-dom';

const Search: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [availableCards, setAvailableCards] = useState<InfoCardPreview[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchPreviews = async (): Promise<void> => {
      const infoCardService = new InfoCardService();

      infoCardService
        .getAll()
        .then((response) => {
          setAvailableCards(response);
        })
        .catch((e: Error) => toast.error(`Failed to get Cards. ${e.message}`));
    };

    fetchPreviews();
  }, []);

  const filterCards = (): InfoCardPreview[] => {
    const query = input.toLowerCase();
    return availableCards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.subtitle?.toLowerCase().includes(query) ||
        card.summary.toLowerCase().includes(query)
    );
  };

  const handleSelect = (cardId: number): void => {
    history.push(`/cards/${cardId}`);
  };

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
      <ListGroup variant='flush'>
        {filterCards().map((preview) => (
          <CardPreview
            key={preview.id}
            preview={preview}
            onClick={handleSelect}
          />
        ))}
      </ListGroup>
    </Form>
  );
};

export default Search;
