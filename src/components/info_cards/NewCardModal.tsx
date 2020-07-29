import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { InfoCardInput } from "../../types/InfoCard";
import InfoCardForm from "./form/InfoCardForm";

const NewCardModal: React.FC = () => {
  const [show, setShow] = useState(false);

  const create = (data: InfoCardInput): void => {
    console.log("Creating card with " + JSON.stringify(data));
    triggerModal();
  };

  const triggerModal = () => {
    console.log("triggered");
    setShow(!show);
  };

  return (
    <>
      <Button variant="primary" onClick={triggerModal}>
        New Info Card
      </Button>

      <Modal
        show={show}
        onHide={triggerModal}
        animation={false}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className="text-light">Create an Info Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoCardForm onSubmit={create} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={triggerModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewCardModal;
