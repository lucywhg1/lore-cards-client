import React, { useState } from "react";
import { startCase, get } from "lodash";
import { Form, Image } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

const PLACEHOLDER_URL =
  "https://www.pngkit.com/png/detail/1007-10071948_woman-avatar-female-profile-picture-placeholder.png";

interface ImageUploadProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  subtext?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  placeholder,
  subtext,
  required = false,
}) => {
  const [preview, setPreview] = useState<string>();

  const { register, trigger, errors } = useFormContext();
  const inputErrors = get(errors, name);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    trigger(name); // call validation
    setPreview(event.target.value);
  };

  return (
    <>
      <Form.Label>{startCase(name)}</Form.Label>
      <Form.Control
        className={required ? "border border-primary" : undefined}
        name={name}
        placeholder={placeholder || `Enter ${name} URL`}
        ref={register}
        onBlur={handleBlur}
        isInvalid={!!inputErrors}
      />
      <Form.Text className="text-muted" data-testid="imageUploadSubtext">
        {subtext}
      </Form.Text>
      <Form.Control.Feedback type="invalid" data-testid="imageUploadErrors">
        {inputErrors?.message}
      </Form.Control.Feedback>
      <Image
        src={preview || PLACEHOLDER_URL}
        alt="avatar preview"
        onError={() => setPreview("")}
        className="w-25"
        thumbnail
      />
    </>
  );
};

export default ImageUpload;
