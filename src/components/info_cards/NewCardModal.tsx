import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { InfoCardInput } from '../../types/InfoCard';
import InfoCardForm from './form/InfoCardForm';

const NewCardModal: React.FC = () => {
  const [show, setShow] = useState(false);

  const create = (data: InfoCardInput): void => {
    setShow(false);
  };

  const cancel = () => {
    setShow(false);
  };

  return (
    <>
      <Button
        variant='primary'
        className='text-light'
        onClick={() => {
          setShow(true);
        }}
      >
        New Info Card
      </Button>

      <Modal
        show={show}
        onHide={cancel}
        animation={false}
        backdrop='static'
        size='lg'
      >
        <Modal.Header closeButton className='bg-primary'>
          <Modal.Title className='text-light'>Create an Info Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoCardForm onSubmit={create} onCancel={cancel} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewCardModal;
