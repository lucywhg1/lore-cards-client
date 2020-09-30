import React from 'react';
import { Badge, Button, Col, Image, ListGroup, Row } from 'react-bootstrap';

import { InfoCardPreview } from '../../types';

interface CardPreviewProps {
  preview: InfoCardPreview;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  preview,
  onClick
}): JSX.Element => {
  const { id, title, subtitle, category, avatarUrl, tags } = preview;

  return (
    <ListGroup.Item
      action
      as={Button}
      variant='light'
      id={id}
      key={id}
      data-testid='card-preview-item'
      onClick={onClick}
    >
      <Row>
        <Col className='text-wrap'>
          <strong>{title}</strong>
        </Col>
        {subtitle && <Col xs={3}>{subtitle}</Col>}
        <Col xs={2}>
          <Row>
            <Badge variant='secondary'>{category.name}</Badge>
          </Row>
          <Row className='mt-1'>
            {tags.map((tag) => (
              <Badge variant='info' key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </Row>
        </Col>
        <Col xs={2}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              height={64}
              width={64}
              roundedCircle
              alt={`${title} avatar`}
            />
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CardPreview;
