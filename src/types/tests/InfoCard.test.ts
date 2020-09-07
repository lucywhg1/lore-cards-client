import { isInPreviewBody, hasAllTags } from '../InfoCard';
import { InfoCardPreviewFactory, TagFactory } from '../../factories';

describe(isInPreviewBody, () => {
  const preview = InfoCardPreviewFactory.build();

  it('matches title, ignoring case', () => {
    const titleMatch = preview.title.substr(1).toLowerCase(); // mock query lowercasing

    expect(isInPreviewBody(preview, titleMatch)).toBe(true);
  });

  it('matches subtitle, ignoring case', () => {
    const subtitleMatch = preview.subtitle.substr(1).toLowerCase();

    expect(isInPreviewBody(preview, subtitleMatch)).toBe(true);
  });

  it('matches summary, ignoring case', () => {
    const summaryMatch = preview.summary.substr(1).toLowerCase();

    expect(isInPreviewBody(preview, summaryMatch)).toBe(true);
  });

  it('does not match nonexistent text', () => {
    expect(isInPreviewBody(preview, '   ')).toBe(false);
  });
});

describe(hasAllTags, () => {
  const preview = InfoCardPreviewFactory.build();

  it('matches if all tags are on card', () => {
    expect(hasAllTags(preview, preview.tags)).toBe(true);
  });

  it('does not match if any tags are missing from card', () => {
    const missingTags = preview.tags.concat([TagFactory.build()]); // adds id from end of sequence

    expect(hasAllTags(preview, missingTags)).toBe(false);
  });
});
