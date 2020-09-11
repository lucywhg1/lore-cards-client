import React from 'react';
import { Badge, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

import { PREVIEW_IMG } from '../../theme';
import { InfoCardPreview } from '../../types';

interface CardPreviewProps {
  preview: InfoCardPreview;
  onClick: (cardId: number) => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  preview,
  onClick
}): JSX.Element => {
  const { id, title, subtitle, summary, category, avatarUrl, tags } = preview;

  return (
    <ListGroup.Item
      action
      onClick={() => onClick(id)}
      data-testid='card-preview-item'
    >
      <Card className='border-mid-width border-primary'>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title className='text-primary'>
                <strong>{title}</strong>
                <Badge variant='secondary' className='ml-2 text-light'>
                  {category.name}
                </Badge>
              </Card.Title>
              <Card.Subtitle>
                {subtitle}
                {tags.map((tag) => (
                  <Badge pill variant='info' key={tag.id}>
                    {tag.name}
                  </Badge>
                ))}
              </Card.Subtitle>
              <Card.Text className='mt-1 d-none d-sm-block'>
                <em>{summary}</em>
              </Card.Text>
            </Col>
            <Col xs={3} lg={2} className='align-self-center'>
              <Image src={avatarUrl || PREVIEW_IMG} fluid />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};

export default CardPreview;
