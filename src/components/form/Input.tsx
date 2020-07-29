import React from "react";
import { startCase, get } from "lodash";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export interface TextAreaProps extends CommonProps {
  as: "textarea";
  rows?: number;
}

interface CommonProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  subtext?: string;
  validationMode?: "onBlur" | "onChange";
}

export type InputProps = CommonProps | TextAreaProps;

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  subtext,
  required = false,
  validationMode,
  ...inputOptions
}) => {
  const { register, trigger, errors } = useFormContext();
  const inputErrors = get(errors, name);

  let validationProps;
  if (validationMode === "onBlur") {
    validationProps = { onBlur: () => trigger(name) };
  } else if (validationMode === "onChange") {
    validationProps = {
      onChange: () => trigger(name),
    };
  }

  return (
    <>
      <Form.Label>{startCase(name)}</Form.Label>
      <Form.Control
        {...validationProps}
        {...inputOptions}
        className={required ? "border border-primary" : undefined}
        name={name}
        placeholder={placeholder || `Enter ${name}`}
        ref={register}
        isInvalid={!!inputErrors}
      />
      <Form.Text className="text-muted" data-testid="inputSubtext">
        {subtext}
      </Form.Text>
      <Form.Control.Feedback type="invalid" data-testid="inputErrors">
        {inputErrors?.message}
      </Form.Control.Feedback>
    </>
  );
};

export default Input;
