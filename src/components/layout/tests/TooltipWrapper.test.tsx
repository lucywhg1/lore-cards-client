import TooltipWrapper from '../TooltipWrapper';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Faker from 'faker';
import userEvent from '@testing-library/user-event';

describe(TooltipWrapper, () => {
  const childText = Faker.company.catchPhrase();
  const tooltipText = Faker.lorem.sentence(2);

  beforeEach(() => {
    render(
      <TooltipWrapper id='test-tooltip' text={tooltipText}>
        <p>{childText}</p>
      </TooltipWrapper>
    );
  });

  it('should display child component', () => {
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('should show tooltip text on hover', async () => {
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument();

    userEvent.hover(screen.getByText(childText));

    expect(await screen.findByText(tooltipText)).toBeInTheDocument();
  });
});
