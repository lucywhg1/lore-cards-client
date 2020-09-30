import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import SideBar from '../nav_bar/SideBar';
import { Category } from '../../types';
import PreviewPanel from './PreviewPanel';
import Container from 'react-bootstrap/Container';
import CardPanel from './CardPanel';

interface SelectionContext {
  category?: Category;
  cardId?: number;
}

interface SelectionContextType {
  selectionContext?: SelectionContext;
  setSelectionContext: (value?: SelectionContext) => void;
}

export const SelectionContext = React.createContext<
  SelectionContextType | undefined
>(undefined);

const Dashboard: React.FC = (): JSX.Element => {
  const [context, setContext] = useState<SelectionContext>();

  return (
    <SelectionContext.Provider
      value={{ selectionContext: context, setSelectionContext: setContext }}
    >
      <Container fluid className='p-0'>
        <Row className='height-full'>
          <Col className='pr-0 rounded bg-primary' xs={2}>
            <SideBar />
          </Col>
          <Col className='bg-light p-2' xs={3}>
            <PreviewPanel />
          </Col>
          <Col className='p-2'>
            {context?.cardId === undefined ? (
              <p>No card selected.</p>
            ) : (
              <CardPanel id={context?.cardId} />
            )}
          </Col>
        </Row>
      </Container>
    </SelectionContext.Provider>
  );
};

export default Dashboard;
