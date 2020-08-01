import React from "react";
import { InfoCardInput } from "../../../../types/InfoCard";
import { InfoCardInputFactory } from "../../../../factories";

const MockInfoCardForm: React.FC<{
  onSubmit: (data: InfoCardInput) => void;
  onCancel: () => void;
  defaultValues: InfoCardInput;
}> = ({ onSubmit, onCancel }) => {
  const mockSubmitData = InfoCardInputFactory.build(
    {},
    { transient: { filled: true } }
  );

  return (
    <form data-testid="info-card-form">
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          onSubmit(mockSubmitData);
        }}
      >
        Create
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          onCancel();
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default MockInfoCardForm;
