import React, { useState, ChangeEvent } from 'react';
import { startCase } from 'lodash';
import { Form, Image, Col, Row } from 'react-bootstrap';

interface Preview {
  label: string;
  url: string;
}

interface ImageUploadProps {
  name: string;
  onChange: (updatedFile: File | null) => void;
  value: File;
  subtext?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  onChange,
  subtext
}) => {
  const empty: Preview = {
    label: `upload ${name}`,
    url:
      'https://www.pngkit.com/png/detail/1007-10071948_woman-avatar-female-profile-picture-placeholder.png'
  };
  const [preview, setPreview] = useState<Preview>(empty);

  const updatePreview = (file: File | null): void => {
    if (preview.url) {
      URL.revokeObjectURL(preview.url); // release previous data
    }

    if (file) {
      setPreview({ label: file.name, url: URL.createObjectURL(file) });
    } else {
      setPreview(empty);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.item(0) || null;
    updatePreview(file);
    onChange(file);
  };

  return (
    <>
      <Form.Label htmlFor={name}>{startCase(name)}</Form.Label>
      <Row>
        <Col>
          <Form.File
            name={name}
            id={name}
            label={preview.label}
            onChange={handleChange}
            className='overflow-hidden'
            custom
          />
          {subtext && (
            <Form.Text className='text-muted' data-testid='imageUploadSubtext'>
              {subtext}
            </Form.Text>
          )}
        </Col>
        <Col>
          <Image
            src={preview.url}
            alt={`${name} preview`}
            className='h-75'
            fluid
            thumbnail
          />
        </Col>
      </Row>
    </>
  );
};

export default ImageUpload;
