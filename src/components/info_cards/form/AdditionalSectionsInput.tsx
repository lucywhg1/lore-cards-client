import React, { ChangeEvent } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { PlusSquare, DashSquare } from "react-bootstrap-icons";
import Section from "../../../types/Section";

interface additionalSectionsInputProps {
  sections: Section[];
  onChange: (updatedSections: Section[]) => void;
}

const AdditionalSectionsInput: React.FC<additionalSectionsInputProps> = ({
  sections,
  onChange,
}): JSX.Element => {
  const updateSection = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    onChange(
      sections.map((section, i) => {
        if (i !== index) {
          return section;
        }
        return { ...section, [event.target.name]: event.target.value };
      })
    );
  };

  const addSection = (): void => {
    onChange(sections.concat({ heading: "", body: "" }));
  };

  const removeSection = (index: number): void => {
    onChange(sections.filter((_, i) => i !== index));
  };

  const mapSectionsToInputs = (): JSX.Element => {
    const sectionInputs = sections.map((section, index) => (
      <div key={`section-${index}`}>
        <Form.Row>
          <Form.Group as={Col} controlId={`section-${index}-heading`}>
            <Form.Control
              name="heading"
              className="border border-primary"
              type="text"
              placeholder="Add a section heading..."
              value={section.heading}
              onChange={(event) => updateSection(index, event as any)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId={`section-${index}-remove-button`}>
            <Button
              variant="outline-danger"
              size="sm"
              type="button"
              title="Remove section"
              onClick={() => removeSection(index)}
            >
              <DashSquare />
            </Button>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId={`section-${index}-body`}>
            <Form.Control
              name="body"
              className="border border-primary"
              as="textarea"
              rows={6}
              value={section.body}
              placeholder="...and a body."
              onChange={(event) => updateSection(index, event as any)}
            />
          </Form.Group>
        </Form.Row>
      </div>
    ));
    return <>{sectionInputs}</>;
  };

  return (
    <>
      {mapSectionsToInputs()}
      <Row className="mt-2">
        <Col>
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={addSection}
          >
            <PlusSquare className="mr-2" />
            Add Section
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AdditionalSectionsInput;