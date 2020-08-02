import React, { useState, ChangeEvent } from "react";
import { startCase } from "lodash";
import { Form, Image, Col, Row } from "react-bootstrap";

export const PLACEHOLDER_SRC =
  "https://www.pngkit.com/png/detail/1007-10071948_woman-avatar-female-profile-picture-placeholder.png";

interface Preview {
  label: string;
  url: string;
}

interface ImageUploadProps {
  name: string;
  onChange: (updatedFile: File) => void;
  subtext?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  onChange,
  subtext,
}) => {
  const empty: Preview = {
    label: `upload ${name}`,
    url: "",
  };
  const [preview, setPreview] = useState<Preview>(empty);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (preview.url) {
      URL.revokeObjectURL(preview.url); // release previous data
    }

    if (event.target.files) {
      const file = event.target.files[0];

      setPreview({ label: file.name, url: URL.createObjectURL(file) });
      onChange(file);
    } else {
      setPreview(empty);
    }
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
            className="overflow-hidden"
            custom
          />
          {subtext && (
            <Form.Text className="text-muted" data-testid="imageUploadSubtext">
              {subtext}
            </Form.Text>
          )}
        </Col>
        <Col>
          <Image
            src={preview.url || PLACEHOLDER_SRC}
            alt={`${name} preview`}
            className="h-75"
            fluid
            thumbnail
          />
        </Col>
      </Row>
    </>
  );
};

export default ImageUpload;
