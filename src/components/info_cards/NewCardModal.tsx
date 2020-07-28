import React from "react";
import { Container } from "react-bootstrap";
import { InfoCardInput } from "../../types/InfoCard";
import InfoCardForm from "./form/InfoCardForm";

const emptyFields: InfoCardInput = {
  title: "",
  subtitle: "",
  category: {
    id: -1, name: ""
  },
  summary: "",
  description: "",
  additionalSections: []
};

const NewCardModal: React.FC = () => {
  const create = (data: InfoCardInput): void => {
    console.log("Creating card with " + JSON.stringify(data));
  };

  return (
    <Container className="mt-2 pl-0 pr-0 border border-dark">
      <Container fluid className="bg-primary">
        <h2 className="p-4 text-light">Create a New Info Card</h2>
      </Container>
      <InfoCardForm onSubmit={create} defaultValues={emptyFields} />
    </Container>
  );
};

export default NewCardModal;