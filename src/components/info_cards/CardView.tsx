import React from 'react';
import {
  Badge,
  Image,
  Col,
  Container,
  Row,
  Media,
  Jumbotron
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { InfoCard } from '../../types';
import Faker from 'faker';

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
      <Media>
        <Media.Body as={Col} xs='auto'>
          <Card border='light' className='border-mid-width'>
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
          <div className='card-margins'>
            <h4 className='small-caps pb-2 border-bottom'>Description</h4>
            <p>{description}</p>
            {additionalSections?.map((section) => (
              <section>
                <h4 className='small-caps pb-2 border-bottom'>
                  {section.heading}
                </h4>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </Media.Body>
        {avatarUrl && (
          <Col className='align-self-start'>
            <Image fluid src={avatarUrl} alt={`card${id}-avatar`} rounded />
          </Col>
        )}
      </Media>
    </Container>
  );
};

export default CardView;
