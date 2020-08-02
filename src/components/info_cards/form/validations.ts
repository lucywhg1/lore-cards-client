import * as yup from 'yup';

import Section from '../../../types/Section';

export const TITLE_MAX_LENGTH = 60;
export const SUBTITLE_MAX_LENGTH = 80;
export const SUMMARY_MAX_LENGTH = 180;

export const sectionSchema: yup.ObjectSchema<Section> = yup
  .object({
    heading: yup
      .string()
      .required('a section heading is required')
      .max(
        80,
        ({ max }) => `section heading must be at most ${max} characters`
      ),
    body: yup.string().notRequired()
  })
  .defined();
