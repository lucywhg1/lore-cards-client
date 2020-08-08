import React from 'react';
import { useParams } from 'react-router-dom';

const ShowCardPage: React.FC = (): JSX.Element => {
  const { id } = useParams();

  return <h1>You're on the page for {id}!</h1>;
};

export default ShowCardPage;
