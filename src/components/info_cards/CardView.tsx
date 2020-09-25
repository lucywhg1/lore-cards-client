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
      <Card.Header className='d-inline text-center'>
        <h1>{title}</h1>
        <h3>
          <Badge variant='secondary' className='float-right'>
            {category.name}
          </Badge>
        </h3>
      </Card.Header>
      <Card.Body>
        <Card.Title className='text-center'>
          {subtitle}
          <span className='float-right'>
            {tags.map((tag) => (
              <Badge variant='info' key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </span>
        </Card.Title>
        <Card.Body>
          <Media>
            <Image
              className='mr-3'
              src={avatarUrl}
              height={256}
              width={256}
              roundedCircle
            />
            <Media.Body>
              <em className='mb-3'>{summary}</em>
              <hr />
              <p className='text-right'>{description}</p>
            </Media.Body>
          </Media>
          {additionalSections?.map((section) => (
            <section>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default CardView;
