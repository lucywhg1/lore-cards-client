import { fireEvent } from "@testing-library/react";

export const fillOutFieldByElement = (
  element: HTMLElement,
  value: string | number
): void => {
  fireEvent.change(element, { target: { value } });
};
