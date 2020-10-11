import React from 'react';
import { Badge, Button, Col, Image, ListGroup, Row } from 'react-bootstrap';

import { InfoCardPreview } from '../../types';
import TooltipWrapper from '../layout/TooltipWrapper';

interface CardPreviewProps {
  preview: InfoCardPreview;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  active?: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  preview,
  onClick,
  active = false
}): JSX.Element => {
  const { id, title, subtitle, category, avatarUrl, tags, summary } = preview;

  return (
    <ListGroup.Item
      action
      active={active}
      as={Button}
      variant='light'
      id={id}
      key={id}
      data-testid='card-preview-item'
      onClick={onClick}
    >
      <TooltipWrapper id={`${id}-summary-tooltip`} text={summary}>
        <Row>
          <Col className='ml-2'>
            <Row>
              <strong>{title}</strong>
            </Row>
            <Row>
              <span className='text-truncate'>{summary}</span>
            </Row>
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
      </TooltipWrapper>
    </ListGroup.Item>
  );
};

export default CardPreview;
