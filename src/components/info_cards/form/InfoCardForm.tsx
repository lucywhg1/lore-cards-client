import React from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers';

import { InfoCardInput } from '../../../types/InfoCard';
import { ImageUpload, Input } from '../../form';
import AdditionalSectionsInput from './AdditionalSectionsInput';
import CategoryInput from './CategoryInput';
import TagMultiSelect from './TagMultiSelect';
import {
  sectionSchema,
  SUBTITLE_MAX_LENGTH,
  SUMMARY_MAX_LENGTH,
  TITLE_MAX_LENGTH
} from './validations';
import { emptyCategory } from '../../../types/Category';

const validationSchema = yup.object().shape({
  title: yup.string().required().max(TITLE_MAX_LENGTH),
  subtitle: yup.string().notRequired().max(SUBTITLE_MAX_LENGTH),
  category: yup.object().shape({
    id: yup.number().min(0, 'category is a required field'),
    name: yup.string()
  }),
  summary: yup.string().notRequired().max(SUMMARY_MAX_LENGTH),
  description: yup.string().notRequired(),
  additionalSections: yup.array().notRequired().of(sectionSchema)
});

interface InfoCardFormProps {
  onSubmit: (data: InfoCardInput) => void;
  onCancel: () => void;
  defaultValues?: InfoCardInput;
}

const emptyFields: InfoCardInput = {
  title: '',
  subtitle: '',
  category: emptyCategory,
  tags: [],
  summary: '',
  avatar: null,
  description: '',
  additionalSections: []
};

const InfoCardForm: React.FC<InfoCardFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues = emptyFields
}) => {
  const formContext = useForm<InfoCardInput>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
    errors
  } = formContext;

  const generateSummary = (description: string): string => {
    if (description) {
      // summarize first portion of description
      return `${description.substring(0, SUMMARY_MAX_LENGTH)}...`;
    } else {
      return 'No description.';
    }
  };

  const handleInput = ({ summary, ...data }: InfoCardInput) => {
    let formData = {
      summary: summary || generateSummary(data.description),
      ...data
    };

    onSubmit(formData);
    reset(defaultValues);
  };

  const handleCancel = (): void => {
    if (isDirty) {
      if (
        !window.confirm(
          'Are you sure you want to do that? You will lose your changes.'
        )
      ) {
        return;
      }
    }
    reset(defaultValues);
    onCancel();
  };

  return (
    <FormProvider {...formContext}>
      <Form
        noValidate
        className='m-3'
        onSubmit={handleSubmit(handleInput)}
        data-testid='info-card-form'
      >
        <Form.Row>
          <Form.Group as={Col} controlId='cardTitle'>
            <Input
              name='title'
              required={true}
              subtext={`Max ${TITLE_MAX_LENGTH} characters.`}
              validationMode='onChange'
            />
          </Form.Group>
          <Form.Group as={Col} controlId='cardCategory'>
            <Controller
              name='category'
              control={control}
              render={({ value, onChange }) => (
                <CategoryInput
                  category={value}
                  onChange={(category) => onChange(category)}
                  errors={errors.category}
                />
              )}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='cardSubtitle'>
            <Input
              name='subtitle'
              subtext={`Max ${SUBTITLE_MAX_LENGTH} characters.`}
              validationMode='onChange'
            />
          </Form.Group>
          <Form.Group as={Col} controlId='cardTags'>
            <Controller
              name='tags'
              control={control}
              render={({ value, onChange }) => (
                <TagMultiSelect onChange={onChange} selected={value} />
              )}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Controller
              name='avatar'
              control={control}
              render={({ onChange, value }) => (
                <ImageUpload name='avatar' onChange={onChange} value={value} />
              )}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='cardSummary'>
            <Input
              name='summary'
              as='textarea'
              rows={2}
              placeholder='Write a summary of this card'
              subtext={`Max ${SUMMARY_MAX_LENGTH} characters. No summary defaults to the first bit of your Description.`}
              validationMode='onChange'
            />
          </Form.Group>
        </Form.Row>
        <Form.Row></Form.Row>
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId='cardDescription'>
            <Input
              as='textarea'
              rows={6}
              name='description'
              placeholder='Write away!'
            />
          </Form.Group>
        </Form.Row>
        <Controller
          name='additionalSections'
          control={control}
          render={({ value, onChange }) => (
            <AdditionalSectionsInput
              sections={value}
              onChange={(sections) => onChange(sections)}
              errors={errors.additionalSections}
            />
          )}
        />
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId='formCardLinks'>
            <Form.Label>Links</Form.Label>
            <Form.Control type='text' placeholder='UNIMPLEMENTED' />
            <Form.Text className='text-muted'>
              Add links from this card to other cards, categories, and tags.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <hr />
        <Container className='mt-3 d-flex'>
          <Button variant='primary' type='submit' className='mr-auto'>
            Create
          </Button>
          <Button variant='danger' type='button' onClick={handleCancel}>
            Cancel
          </Button>
        </Container>
      </Form>
    </FormProvider>
  );
};

export default InfoCardForm;
