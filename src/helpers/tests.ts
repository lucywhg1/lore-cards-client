import { Tag } from './../types/Tag';
import { includes, startCase } from 'lodash';
import { InfoCardInput } from './../types/InfoCard';
import { screen } from '@testing-library/react';
import { fillOutFieldByElement } from '../components/form/tests/helpers';
import { Category } from '../types';
import userEvent from '@testing-library/user-event';

export const fillOutCardForm = (fields: Partial<InfoCardInput>): void => {
  for (const [key, value] of Object.entries(fields)) {
    const name = startCase(key);
    if (
      includes(
        ['title', 'subtitle', 'summary', 'description', 'avatarUrl'],
        key
      )
    ) {
      fillOutFieldByElement(
        screen.getByRole('textbox', { name }),
        value as string
      );
    } else if (key === 'category') {
      userEvent.selectOptions(
        screen.getByRole('combobox', { name: 'Category' }),
        [String((value as Category).id)]
      );
    } else if (key === 'tags') {
      userEvent.selectOptions(
        screen.getByText('Add...'),
        (value as Tag[]).map((tag) => String(tag.id))
      );
    }
  }
};
