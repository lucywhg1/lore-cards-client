import React from "react";
import { startCase } from "lodash";
import { Form, Col } from "react-bootstrap";
import { UseFormMethods } from "react-hook-form";

interface ControlledInputProps {
  register: UseFormMethods["register"];
  trigger: UseFormMethods["trigger"];
  errors?: UseFormMethods["errors"];
  validationMode?: "onBlur" | "onChange";
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  subtext?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  name, type, placeholder, subtext, required = false, validationMode, ...props
}) => {
  let validationProps;
  if (validationMode === 'onBlur') {
    validationProps = { "onBlur": () => props.trigger(name) };
  } else if (validationMode === 'onChange') {
    validationProps = { "onChange": () => props.trigger(name) };
  }

  return (
    <Form.Group as={Col} controlId={`form${ name }`}>
      <Form.Label>{startCase(name)}</Form.Label>
      <Form.Control
        className={required ? "border border-primary" : "border border-secondary"}
        name={name}
        type={type}
        placeholder={`Enter ${ name }`}
        ref={props.register}
        isInvalid={!!props.errors}
        {...validationProps}
      />
      <Form.Text className="text-muted">
        {subtext}
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        {props.errors?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ControlledInput;