import React from "react";
import Input from "../Input";
import { render, screen, fireEvent } from "@testing-library/react";
import MockHookForm, { MockHookFormProps } from "./MockHookForm";
import userEvent from "@testing-library/user-event";
import * as yup from "yup";


describe(Input, () => {
  let inputComponent: Element;

  const renderComponent = ({ ...formProps }: Partial<MockHookFormProps>): void => {
    render(<MockHookForm name='input' {...formProps} />);

    inputComponent = screen.getByRole("textbox");
  };

  it("displays the input with default values", () => {
    renderComponent({ defaultValue: 'default' });

    expect(screen.getByLabelText("Input")).toBeInTheDocument();
    expect(screen.getByDisplayValue("default")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter input")).toBeInTheDocument();

    expect(screen.getByTestId("inputSubtext")).toBeEmpty();
    expect(screen.getByTestId("inputErrors")).toBeEmpty();
  });

  it("displays input with overridden subtext and placeholder", () => {
    renderComponent({ placeholder: "placeholder", subtext: "subtext" });

    expect(screen.getByPlaceholderText("placeholder")).toBeInTheDocument();
    expect(screen.getByText("subtext")).toBeInTheDocument();
  });

  it("updates input when user types", () => {
    renderComponent({});

    userEvent.type(inputComponent, "Hey there!");

    expect(screen.getByDisplayValue("Hey there!")).toBeInTheDocument();
  });

  describe("error validation", () => {
    const invalidOnLength = { input: yup.string().max(2) };

    it("triggers with #validationMode onChange", async () => {
      renderComponent({ validationMode: "onChange", "validationSchema": invalidOnLength });

      userEvent.type(inputComponent, "Hey there!");

      expect(await screen.findByText("input must be at most 2 characters")).toBeInTheDocument();
    });

    it("triggers with #validationMode onBlur", async () => {
      renderComponent({ validationMode: "onBlur", "validationSchema": invalidOnLength });

      userEvent.type(inputComponent, "Hey there!");
      expect(screen.getByTestId("inputErrors")).toBeEmpty(); // still focused

      fireEvent.blur(inputComponent);

      expect(await screen.findByText("input must be at most 2 characters")).toBeInTheDocument();
    });
  });

  describe("when text area", () => {
    it("displays input as textarea with default values", () => {
      renderComponent({ as: 'textarea' });

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).not.toHaveAttribute("rows");
    });

    it("displays input as textarea with rows", () => {
      renderComponent({ 'as': 'textarea', 'rows': 2 });

      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2");
    });
  });
});