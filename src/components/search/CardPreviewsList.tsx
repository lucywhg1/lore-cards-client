import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { InfoCardPreview, Tag } from '../../types';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import CardPreview from './CardPreview';
import { useHistory } from 'react-router-dom';
import { isInCardBody, hasTags } from '../../types/InfoCard';

interface CardPreviewsListProps {
  categoryId?: number;
  input: string;
  tagsFilter: Tag[];
}

const CardPreviewsList: React.FC<CardPreviewsListProps> = ({ categoryId,
  input, tagsFilter
}): JSX.Element => {
  const history = useHistory();
  const [availableCards, setAvailableCards] = useState<InfoCardPreview[]>([]);

  console.log("tags filter is " + JSON.stringify(tagsFilter));

  useEffect(() => {
    const fetchPreviews = async (): Promise<void> => {
      const infoCardService = new InfoCardService();

      infoCardService
        .getAll(categoryId)
        .then((response) => {
          setAvailableCards(response);
        })
        .catch((e: Error) => toast.error(`Failed to get Cards. ${ e.message }`));
    };

    fetchPreviews();
  }, [categoryId]);

  const handleSelect = (cardId: number): void => {
    history.push(`/cards/${ cardId }`);
  };

  const filteredCards = (): JSX.Element[] => {
    const query = input.toLowerCase();
    const filtered: JSX.Element[] = [];

    availableCards.forEach(
      (card) => {
        if (isInCardBody(card, query) && hasTags(card, tagsFilter)) {
          filtered.push(
            <CardPreview
              key={card.id}
              preview={card}
              onClick={handleSelect}
            />
          );
        }
      }
    );

    return filtered;
  };

  return (
    <ListGroup variant='flush'>
      {filteredCards()}
    </ListGroup>
  );
};

export default CardPreviewsList;
