import React from 'react';
import { Image, Badge, ListGroup, Col, Card, Row } from 'react-bootstrap';
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
  const { id, title, subtitle, summary, category, avatarUrl } = preview;

  return (
    <ListGroup.Item action onClick={() => onClick(id)}>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>
                {title}
                <Badge variant='secondary' className='ml-2'>
                  {category.name}
                </Badge>
              </Card.Title>
              <Card.Subtitle>{subtitle}</Card.Subtitle>
              <Card.Text className='mt-1'>
                <em>{summary}</em>
              </Card.Text>
            </Col>
            <Col xs={3} lg={2} xl={1} className='mt-auto mb-auto'>
              <Image src={avatarUrl || PREVIEW_IMG} fluid />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};
/**
 * Fill the row that is already filled by the card
 */
export default CardPreview;
