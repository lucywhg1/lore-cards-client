import React, { ChangeEvent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { PlusSquare, DashSquare } from 'react-bootstrap-icons';
import Section from '../../../types/Section';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FieldError } from 'react-hook-form';

interface additionalSectionsInputProps {
  sections?: Section[];
  onChange: (updatedValues: Section[]) => void;
  errors?: (DeepMap<Section, FieldError> | undefined)[];
}

const AdditionalSectionsInput: React.FC<additionalSectionsInputProps> = ({
  sections = [],
  onChange,
  errors
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
    onChange(sections.concat({ heading: '', body: '' }));
  };

  const removeSection = (index: number): void => {
    onChange(sections.filter((_, i) => i !== index));
  };

  const mapSectionsToInputs = (): JSX.Element => {
    let sectionInputs: JSX.Element[] = [];

    sections.forEach((section, index) => {
      const sectionErrors =
        errors && errors.length >= index + 1 ? errors[index] : undefined; // retrieve nested

      sectionInputs.push(
        <div key={`section-${index}`}>
          <Form.Row>
            <Form.Group as={Col} controlId={`section-${index}-heading`}>
              <Form.Control
                name='heading'
                className='border border-primary'
                type='text'
                placeholder='Add a section heading...'
                value={section.heading}
                onChange={(event) => updateSection(index, event as any)}
                isInvalid={!!sectionErrors?.heading}
              />
              {sectionErrors?.heading && (
                <Form.Control.Feedback
                  type='invalid'
                  data-testid={`section-${index}-heading-errors`}
                >
                  {sectionErrors.heading.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId={`section-${index}-remove-button`}>
              <Button
                variant='outline-danger'
                size='sm'
                type='button'
                title='Remove section'
                onClick={() => removeSection(index)}
              >
                <DashSquare />
              </Button>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId={`section-${index}-body`}>
              <Form.Control
                name='body'
                as='textarea'
                rows={4}
                value={section.body}
                placeholder='...and a body.'
                onChange={(event) => updateSection(index, event as any)}
                isInvalid={!!sectionErrors?.body}
              />
            </Form.Group>
          </Form.Row>
        </div>
      );
    });

    return <>{sectionInputs}</>;
  };

  return (
    <>
      {mapSectionsToInputs()}
      <Button
        variant='outline-secondary'
        size='sm'
        type='button'
        onClick={addSection}
      >
        <PlusSquare className='mr-2' />
        Add Section
      </Button>
    </>
  );
};

export default AdditionalSectionsInput;
