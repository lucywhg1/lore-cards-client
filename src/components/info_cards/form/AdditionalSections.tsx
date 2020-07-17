import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { PlusSquare, DashSquare } from "react-bootstrap-icons";
import Section from "../../sections/Section";

const AdditionalSectionsFormGroup: React.FC = (): JSX.Element => {
  const [additionalSections, setAdditionalSections] = useState<Section[]>([]);

  const updateSection = (index: number, value: Section): void => {
    // immutability helper time
  };

  const removeSection = (index: number): void => {
    setAdditionalSections(additionalSections.filter((_, i) => i !== index));
  };

  const addSection = (): void => {
    setAdditionalSections(
      additionalSections.concat({
        heading: "Add a section heading...",
        body: "",
      })
    );
  };

  const mapAdditionalSectionsToInputs = (): JSX.Element => {
    const sectionInputs = additionalSections.map((section, index) => (
      <>
        <Form.Row key={index}>
          <Form.Group
            as={Col}
            controlId={`formCardAdditionalSectionHeading-${index}`}
          >
            <Form.Control
              className="border border-primary"
              type="text"
              placeholder={section.heading}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId={`formCardAdditionalSectionRemoveButton-${index}`}
          >
            <Button
              variant="outline-danger"
              size="sm"
              type="button"
              onClick={() => removeSection(index)}
            >
              <DashSquare />
            </Button>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId={`formCardAdditionalSectionBody-${index}`}
          >
            <Form.Control
              className="border border-primary"
              as="textarea"
              rows={6}
              placeholder={section.body}
            />
          </Form.Group>
        </Form.Row>
      </>
    ));
    return <>{sectionInputs}</>;
  };

  return (
    <>
      <Form.Row>
        <Form.Group as={Col} controlId="formCardDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="border border-primary"
            as="textarea"
            rows={6}
            placeholder="Write away!"
          />
        </Form.Group>
      </Form.Row>
      {mapAdditionalSectionsToInputs()}
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

export default AdditionalSectionsFormGroup;
