import React from 'react';
import { InfoCard } from '../../types';

interface CardViewProps {
  card: InfoCard;
}
const CardView: React.FC<CardViewProps> = ({ card }): JSX.Element => {
  return (
    <div>
      <h1>You're on the page for {card.id}!</h1>
      <p>{JSON.stringify(card, null, '\n')}</p>
    </div>
  );
};

export default CardView;
