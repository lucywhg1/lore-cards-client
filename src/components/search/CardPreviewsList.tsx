import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { InfoCardPreview, Tag } from '../../types';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import CardPreview from './CardPreview';
import { useHistory } from 'react-router-dom';
import { isInPreviewBody, hasAllTags } from '../../types/InfoCard';

interface CardPreviewsListProps {
  categoryId?: number;
  bodyFilter: string;
  tagsFilter: Tag[];
}

const CardPreviewsList: React.FC<CardPreviewsListProps> = ({
  categoryId,
  bodyFilter,
  tagsFilter
}): JSX.Element => {
  const history = useHistory();
  const [availableCards, setAvailableCards] = useState<InfoCardPreview[]>([]);

  useEffect(() => {
    const fetchPreviews = async (): Promise<void> => {
      const infoCardService = new InfoCardService();

      infoCardService
        .getAll({ categoryId })
        .then((response) => {
          setAvailableCards(response);
        })
        .catch((e: Error) => toast.error(`Failed to get Cards. ${e.message}`));
    };

    fetchPreviews();
  }, [categoryId]);

  const handleSelect = (cardId: number): void => {
    history.push(`/cards/${cardId}`);
  };

  const filteredCards = (): JSX.Element[] => {
    const query = bodyFilter.toLowerCase();
    const filtered: JSX.Element[] = [];

    availableCards.forEach((card) => {
      if (isInPreviewBody(card, query) && hasAllTags(card, tagsFilter)) {
        filtered.push(
          <CardPreview key={card.id} preview={card} onClick={handleSelect} />
        );
      }
    });

    return filtered;
  };

  return <ListGroup variant='flush'>{filteredCards()}</ListGroup>;
};

export default CardPreviewsList;
