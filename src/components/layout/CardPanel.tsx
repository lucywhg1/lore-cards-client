import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { toast } from 'react-toastify';

import InfoCardService from '../../services/InfoCardService';
import { InfoCard } from '../../types';
import CardView from '../info_cards/CardView';

interface CardPanelProps {
  id: number;
}

const CardPanel: React.FC<CardPanelProps> = ({ id }): JSX.Element => {
  const [card, setCard] = useState<InfoCard>();

  useEffect(() => {
    const fetchCard = async (): Promise<void> => {
      const infoCardService = new InfoCardService();

      infoCardService
        .get(id)
        .then((response) => {
          setCard(response);
        })
        .catch((e: Error) =>
          toast.error(`Failed to get Card #${id}. ${e.message}`)
        );
    };

    fetchCard();
  }, [id]);

  return card ? <CardView card={card} /> : <p>Loading...</p>;
};

export default CardPanel;
