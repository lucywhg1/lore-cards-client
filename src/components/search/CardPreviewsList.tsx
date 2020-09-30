import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { InfoCardPreview, Tag } from '../../types';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import CardPreview from './CardPreview';
import { isInPreviewBody, hasAllTags } from '../../types/InfoCard';
import { useSelectionContext } from '../../helpers/hooks';

interface CardPreviewsListProps {
  bodyFilter: string;
  tagsFilter: Tag[];
}

const CardPreviewsList: React.FC<CardPreviewsListProps> = ({
  bodyFilter,
  tagsFilter
}): JSX.Element => {
  const { selectionContext, setSelectionContext } = useSelectionContext()!;
  const [availableCards, setAvailableCards] = useState<InfoCardPreview[]>([]);

  useEffect(() => {
    const fetchPreviews = async (): Promise<void> => {
      const infoCardService = new InfoCardService();

      infoCardService
        .getAll({ categoryId: selectionContext?.category?.id })
        .then((response) => {
          setAvailableCards(response);
        })
        .catch((e: Error) => toast.error(`Failed to get Cards. ${e.message}`));
    };

    fetchPreviews();
  }, [selectionContext]);

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
    const cardId = Number(event.currentTarget.id);
    setSelectionContext({ ...selectionContext, cardId });
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
