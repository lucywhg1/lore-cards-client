import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { InfoCard } from '../../types';

interface CardViewProps {
  card: InfoCard;
}
const CardView: React.FC<CardViewProps> = ({ card }): JSX.Element => {
  const {
    title,
    subtitle,
    category,
    tags,
    avatarUrl,
    summary,
    description,
    additionalSections
  } = card;

  return (
    <Card>
      <Card.Header>
        <strong>{title}</strong>

        <h3>
          <Badge variant='secondary'>{category.name}</Badge>
        </h3>
      </Card.Header>
    </Card>
  );
};

export default CardView;
