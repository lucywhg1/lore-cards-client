import React, { ChangeEvent } from 'react';
import { startCase } from 'lodash';
import { Form, Image, Col, Row } from 'react-bootstrap';
import { PREVIEW_IMG } from '../../theme';

interface ImageUploadProps {
  name: string;
  onChange: (value: string) => void;
  value: string;
  subtext?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  onChange,
  value,
  subtext
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <>
      <Form.Label htmlFor={name}>{startCase(name)}</Form.Label>
      <Row>
        <Col>
          <Form.Control
            name={name}
            id={name}
            onChange={handleChange}
            className='overflow-hidden'
          />
          {subtext && (
            <Form.Text className='text-muted' data-testid='imageUploadSubtext'>
              {subtext}
            </Form.Text>
          )}
        </Col>
        <Col>
          <Image
            src={value || PREVIEW_IMG}
            alt={`${name} preview`}
            className='h-75'
            fluid
            thumbnail
          />
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default ImageUpload;
