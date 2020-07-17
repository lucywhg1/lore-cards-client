import React from "react";
import { Form, Button, Container, Image, Col } from "react-bootstrap";
import { mapCategoriesToOptions } from "../../categories/DisplayHelper";
import AdditionalSectionsFormGroup from "./AdditionalSections";

const InfoCardForm: React.FC = () => {
  return (
    <Container className="mt-2 pl-0 pr-0 border border-dark">
      <Container fluid className="p-2 mb-2 bg-light">
        <h3>Create a New Info Card</h3>
      </Container>
      <Form className="m-3">
        {/* Main Attributes */}
        <Form.Row>
          <Form.Group as={Col} controlId="formCardTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="border border-primary"
              type="text"
              placeholder="Enter card title"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formCardCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              className="border border-primary"
              as="select"
              value=""
              custom
            >
              <option value="">Choose...</option>
              {mapCategoriesToOptions()}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formCardSubtitle">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              type="text"
              placeholder="(Optional) Enter card subtitle"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formCardTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="(Optional) UNIMPLEMENTED" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4} controlId="formCardAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.File />
          </Form.Group>
          <Col xs={2}>
            <Image src="https://tinyurl.com/lorecardsimg" rounded fluid />
          </Col>
          <Form.Group as={Col} sm={6} controlId="formCardSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="(Optional) Write a summary of this card"
            />
            <Form.Text className="text-muted">
              Max 280 characters. No summary defaults to the first bit of your
              Description.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row></Form.Row>
        <hr />
        <AdditionalSectionsFormGroup />
        <hr />
        {/* Links */}
        <Form.Row>
          <Form.Group as={Col} controlId="formCardLinks">
            <Form.Label>Links</Form.Label>
            <Form.Control type="text" placeholder="(Optional) UNIMPLEMENTED" />
            <Form.Text className="text-muted">
              Add links from this card to other cards, categories, and tags.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <hr />
        {/* Buttons */}
        <Container className="mt-3 d-flex">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button className="ml-auto" variant="danger" type="button">
            Cancel
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default InfoCardForm;