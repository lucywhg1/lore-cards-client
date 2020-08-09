import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { InfoCardPreview } from '../../types';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import CardPreview from './CardPreview';
import { useHistory } from 'react-router-dom';

interface CardPreviewsListProps {
  input: string;
}

const CardPreviewsList: React.FC<CardPreviewsListProps> = ({
  input
}): JSX.Element => {
  const history = useHistory();
  const [availableCards, setAvailableCards] = useState<InfoCardPreview[]>([]);

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

  const handleSelect = (cardId: number): void => {
    history.push(`/cards/${cardId}`);
  };

  const filterCards = (): InfoCardPreview[] => {
    const query = input.toLowerCase();

    return availableCards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.subtitle?.toLowerCase().includes(query) ||
        card.summary.toLowerCase().includes(query)
    );
  };

  return (
    <ListGroup variant='flush'>
      {filterCards().map((preview) => (
        <CardPreview
          key={preview.id}
          preview={preview}
          onClick={handleSelect}
        />
      ))}
    </ListGroup>
  );
};

export default CardPreviewsList;
