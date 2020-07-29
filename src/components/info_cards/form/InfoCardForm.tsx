import React from "react";

import * as yup from "yup";
import { Form, Button, Container, Image, Col } from "react-bootstrap";
import AdditionalSectionsInput from "./AdditionalSectionsInput";
import CategorySelect from "./CategorySelect";
import {
  TITLE_MAX_LENGTH,
  SUBTITLE_MAX_LENGTH,
  SUMMARY_MAX_LENGTH,
  sectionSchema,
} from "./validations";
import Input from "../../form/Input";
import { InfoCardInput } from "../../../types/InfoCard";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

const validationSchema = yup.object().shape({
  title: yup.string().required().max(TITLE_MAX_LENGTH),
  subtitle: yup.string().notRequired().max(SUBTITLE_MAX_LENGTH),
  category: yup.object().shape({
    id: yup.number().min(0, "category is a required field"),
    name: yup.string(),
  }),
  summary: yup.string().notRequired().max(SUMMARY_MAX_LENGTH),
  description: yup.string().notRequired(),
  additionalSections: yup.array().notRequired().of(sectionSchema),
});

interface InfoCardFormProps {
  onSubmit: (data: InfoCardInput) => void;
  defaultValues?: InfoCardInput;
}

const emptyFields: InfoCardInput = {
  title: "",
  subtitle: "",
  category: {
    id: -1,
    name: "",
  },
  summary: "",
  description: "",
  additionalSections: [],
};

const InfoCardForm: React.FC<InfoCardFormProps> = ({
  onSubmit,
  defaultValues = emptyFields,
}) => {
  const formContext = useForm<InfoCardInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit, reset } = formContext;

  const generateSummary = (description: string): string => {
    if (description) {
      // summarize first portion of description
      return `${description.substring(0, SUMMARY_MAX_LENGTH)}...`;
    } else {
      return "No description.";
    }
  };

  const handleInput = ({ summary, ...data }: InfoCardInput) => {
    let formData = {
      summary: summary || generateSummary(data.description),
      ...data,
    };

    onSubmit(formData);
    reset(defaultValues);
  };

  return (
    <FormProvider {...formContext}>
      <Form
        noValidate
        className="m-3"
        onSubmit={handleSubmit(handleInput)}
        data-testid="info-card-form"
      >
        <Form.Row>
          <Form.Group as={Col} controlId="cardTitle">
            <Input
              name="title"
              required={true}
              subtext={`Max ${TITLE_MAX_LENGTH} characters.`}
              validationMode="onChange"
            />
          </Form.Group>
          <Controller
            name="category"
            control={control}
            render={({ value, onChange }) => (
              <CategorySelect
                category={value}
                onChange={(category) => onChange(category)}
              />
            )}
          />
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="cardSubtitle">
            <Input
              name="subtitle"
              subtext={`Max ${SUBTITLE_MAX_LENGTH} characters.`}
              validationMode="onChange"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formCardTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="UNIMPLEMENTED" />
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
          <Form.Group as={Col} controlId="cardSummary">
            <Input
              name="summary"
              as="textarea"
              rows={2}
              placeholder="Write a summary of this card"
              subtext={`Max ${SUMMARY_MAX_LENGTH} characters. No summary defaults to the first bit of your Description.`}
              validationMode="onChange"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row></Form.Row>
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId="cardDescription">
            <Input
              as="textarea"
              rows={6}
              name="description"
              placeholder="Write away!"
            />
          </Form.Group>
        </Form.Row>
        <Controller
          name="additionalSections"
          control={control}
          render={({ value, onChange }) => (
            <AdditionalSectionsInput
              sections={value}
              onChange={(sections) => onChange(sections)}
            />
          )}
        />
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId="formCardLinks">
            <Form.Label>Links</Form.Label>
            <Form.Control type="text" placeholder="UNIMPLEMENTED" />
            <Form.Text className="text-muted">
              Add links from this card to other cards, categories, and tags.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <hr />
        <Container className="mt-3 d-flex">
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Container>
      </Form>
    </FormProvider>
  );
};

export default InfoCardForm;
