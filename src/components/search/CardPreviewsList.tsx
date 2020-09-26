import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { InfoCardPreview, Tag } from '../../types';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import CardPreview from './CardPreview';
import { isInPreviewBody, hasAllTags } from '../../types/InfoCard';

interface CardPreviewsListProps {
  categoryId?: number;
  bodyFilter: string;
  tagsFilter: Tag[];
  onCardSelect: (id: number) => void;
}

const CardPreviewsList: React.FC<CardPreviewsListProps> = ({
  categoryId,
  bodyFilter,
  tagsFilter,
  onCardSelect
}): JSX.Element => {
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

  const handleClick = (event: React.MouseEvent): void => {
    const { id } = event.currentTarget;
    onCardSelect(Number(id));
  };

  const filteredCards = (): JSX.Element[] => {
    const query = bodyFilter.toLowerCase();
    const filtered: JSX.Element[] = [];

    availableCards.forEach((card) => {
      if (isInPreviewBody(card, query) && hasAllTags(card, tagsFilter)) {
        filtered.push(
          <CardPreview key={card.id} preview={card} onClick={handleClick} />
        );
      }
    });

    return filtered;
  };

  return <ListGroup>{filteredCards()}</ListGroup>;
};

export default CardPreviewsList;
