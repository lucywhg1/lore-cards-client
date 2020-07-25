import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers';
import { Form, Button, Container, Image, Col } from "react-bootstrap";
import AdditionalSectionsInput from "./AdditionalSectionsInput";
import Section from "../../../types/Section";
import Category from "../../../types/Category";
import CategorySelect from "./CategorySelect";
import { TITLE_MAX_LENGTH, SUBTITLE_MAX_LENGTH, SUMMARY_MAX_LENGTH, sectionSchema } from "./validations";
import ControlledInput from "./ControlledInput";
import { get } from "lodash";

interface FormInput {
  title: string;
  subtitle: string;
  category: Category;
  summary: string;
  description: string;
  additionalSections: Section[];
}

const validationSchema = yup.object().shape({
  title: yup.string().required().max(TITLE_MAX_LENGTH),
  subtitle: yup.string().notRequired().max(SUBTITLE_MAX_LENGTH),
  category: yup.object().shape({ id: yup.number().min(0, "category is a required field"), title: yup.string() }),
  summary: yup.string().notRequired().max(SUMMARY_MAX_LENGTH),
  description: yup.string().notRequired(),
  additionalSections: yup.array().notRequired().of(sectionSchema)
}
);

const InfoCardForm: React.FC = () => {
  const { register, control, handleSubmit, errors, reset, trigger } = useForm<FormInput>({
    defaultValues: {
      title: "",
      subtitle: "",
      category: {
        id: -1, title: ""
      },
      summary: "",
      description: "",
      additionalSections: []
    },
    resolver: yupResolver(validationSchema)
  });

  const getUseFormProps = (name: string) => {
    return { "register": register, "trigger": trigger, "errors": get(errors, name) };
  };

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  return (
    <Container className="mt-2 pl-0 pr-0 border border-dark">
      <Container fluid className="bg-primary">
        <h2 className="p-4 text-light">Create a New Info Card</h2>
      </Container>
      <Form noValidate className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <ControlledInput name="title" type="text" required={true} subtext={`Max ${ TITLE_MAX_LENGTH } characters.`} validationMode='onChange' {...getUseFormProps('title')} />
          {/* <Form.Group as={Col} controlId="formCardTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              className="border border-primary"
              type="text"
              placeholder="Enter card title"
              ref={register}
              isInvalid={!!errors.title}
              onChange={() => { trigger('title'); }}
            />
            <Form.Text className="text-muted">
              {}
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group> */}
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ value, onChange }) => <CategorySelect
              category={value}
              onChange={(category) => onChange(category)}
              errors={errors.category}
            />}
          />
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formCardSubtitle">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              name="subtitle"
              type="text"
              placeholder="Enter card subtitle"
              ref={register}
              isInvalid={!!errors.subtitle}
              onChange={() => trigger('subtitle')}
            />
            <Form.Text className="text-muted">
              {`Max ${ SUBTITLE_MAX_LENGTH } characters.`}
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.subtitle?.message}
            </Form.Control.Feedback>
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
          <Form.Group as={Col} sm={6} controlId="formCardSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              name="summary"
              as="textarea"
              rows={2}
              placeholder="Write a summary of this card"
              ref={register}
              isInvalid={!!errors.summary}
              onChange={() => { trigger('summary'); }}
            />
            <Form.Text className="text-muted">
              {`Max ${ SUMMARY_MAX_LENGTH } characters. No summary defaults to the first bit of your Description.`}
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.summary?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row></Form.Row>
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId="description-section">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={6}
              className="border border-primary"
              placeholder="Write away!"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Controller
          name="additionalSections"
          control={control}
          render={({ value, onChange }) => <AdditionalSectionsInput
            sections={value}
            onChange={(sections) =>
              onChange(sections)
            }
            errors={errors.additionalSections}
          />}
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
        {/* Buttons */}
        <Container className="mt-3 d-flex">
          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button className="ml-auto" variant="danger" type="button" onClick={() => reset()}>
            Clear
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default InfoCardForm;
