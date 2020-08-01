import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { InfoCardInput } from "../../types/InfoCard";
import InfoCardForm from "./form/InfoCardForm";
import InfoCardService from "../../services/InfoCardService";

const NewCardModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const infoCardService = new InfoCardService();

  const create = (data: InfoCardInput): void => {
    infoCardService.post(data);
    setShow(false);
  };

  const cancel = () => {
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
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
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className="text-light">Create an Info Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoCardForm onSubmit={create} onCancel={cancel} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewCardModal;
