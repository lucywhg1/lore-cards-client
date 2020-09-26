import React from 'react';
import { Image, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { InfoCard } from '../../types';

interface CardViewProps {
  card: InfoCard;
}
const CardView: React.FC<CardViewProps> = ({ card }): JSX.Element => {
  const {
    id,
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
    <Container className='text-dark border border-light py-2' fluid>
      {avatarUrl && (
        <Col>
          <Image
            fluid
            src={avatarUrl}
            alt={`card${id}-avatar`}
            rounded
            className='float-right max-w-45 mb-3 ml-1'
          />
        </Col>
      )}
      <Col>
        <Row>
          <Card border='light' className='border-mid-width float-left mr-2'>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle>{subtitle}</Card.Subtitle>
              <Card.Text className='font-weight-lighter'>{summary}</Card.Text>
            </Card.Body>
            <Card.Footer as={Row} className='justify-content-between mx-0'>
              <h5 className='small-caps text-primary font-weight-bold'>
                {category.name}
              </h5>
              <em className='text-secondary float-right mr-2'>
                {tags.map((tag) => tag.name).join(', ')}
              </em>
            </Card.Footer>
          </Card>
        </Row>
        <div className='card-margins'>
          <h4 className='d-inline-block small-caps pb-2 border-bottom'>
            Description
          </h4>
          <p>{description}</p>
          {additionalSections?.map((section) => (
            <section key={`section-${section.heading}`}>
              <h4 className='small-caps pb-2 border-bottom'>
                {section.heading}
              </h4>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </Col>
    </Container>
  );
};

export default CardView;
