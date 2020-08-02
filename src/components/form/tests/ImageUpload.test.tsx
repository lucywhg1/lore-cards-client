import React from "react";
import ImageUpload, { PLACEHOLDER_SRC } from "../ImageUpload";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { startCase } from "lodash";
import ImageFactory from "../../../factories/FileFactory";
import Faker from "faker";

const mockOnChange = jest.fn();

const mockRevokeObjectUrl = jest.fn();
window.URL.revokeObjectURL = mockRevokeObjectUrl;
window.URL.createObjectURL = jest.fn().mockReturnValue("fakeUrl");

describe(ImageUpload, () => {
  it("displays a file input, a placeholder image, and no subtext", () => {
    render(<ImageUpload name="imageUpload" onChange={mockOnChange} />);
    const preview = screen.getByRole("img");

    expect(screen.getByLabelText(startCase("imageUpload"))).toBeInTheDocument();
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute("src", PLACEHOLDER_SRC);
    expect(screen.queryByTestId("imageUploadSubtext")).not.toBeInTheDocument();
  });

  it("displays subtext if supplied", () => {
    const fakeSubtext = Faker.lorem.sentence();
    render(
      <ImageUpload
        name="imageUpload"
        onChange={mockOnChange}
        subtext={fakeSubtext}
      />
    );

    expect(screen.getByText(fakeSubtext)).toBeInTheDocument();
  });

  describe("upload behavior", () => {
    const image = ImageFactory.build();
    let upload: HTMLElement;

    beforeEach(() => {
      render(<ImageUpload name="imageUpload" onChange={mockOnChange} />);
      upload = screen.getByLabelText(startCase("imageUpload"));

      userEvent.upload(upload, image);
    });

    it("calls onChange with selected file", () => {
      expect(mockOnChange).toHaveBeenCalledWith(image);
    });

    it("revokes object URL when new file is uploaded", () => {
      userEvent.upload(upload, image); // switch to new file, revoke old

      expect(mockRevokeObjectUrl).toHaveBeenLastCalledWith("fakeUrl");
    });

    it("updates label with chosen file name", () => {
      expect(screen.getByLabelText(image.name)).toBeInTheDocument();
    });

    it("sets preview image to chosen file", () => {
      expect(screen.getByRole("img")).toHaveAttribute("src", "fakeUrl");
    });
  });
});
