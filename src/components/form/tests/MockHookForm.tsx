import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers';
import Input, { InputProps } from "../Input";
import { Form } from "react-bootstrap";

interface FormContextProps {
  defaultValue?: string;
  validationSchema?: Record<string, any>;
}

export type MockHookFormProps = FormContextProps & InputProps;

/**
 * A mock parent component which provides FormContext for testing React Hook Form inputs.
 */
const MockHookForm: React.FC<MockHookFormProps> = ({ defaultValue, validationSchema, ...inputProps }) => {
  const resolver = validationSchema ? yupResolver(yup.object().shape(validationSchema)) : undefined;

  const formContext = useForm({ defaultValues: { input: defaultValue }, resolver });

  return (
    <FormProvider {...formContext}>
      <Form.Group controlId="testInput">
        <Input {...inputProps} />
      </Form.Group>
    </FormProvider>
  );
};

export default MockHookForm;