import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TiPlus } from 'react-icons/ti';
import { InfoCardInput } from '../../types/InfoCard';
import Brand from '../layout/Brand';
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
        className='rounded-0'
        variant='success'
        onClick={() => {
          setShow(true);
        }}
      >
        <Brand text='New Card' icon={<TiPlus />} />
      </Button>

      <Modal
        show={show}
        onHide={cancel}
        animation={false}
        backdrop='static'
        size='lg'
      >
        <Modal.Header closeButton className='bg-success'>
          <Modal.Title className='text-dark'>Create a Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoCardForm onSubmit={create} onCancel={cancel} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewCardModal;
