import Entity from './Entity';
import Section from './Section';
import Category from './Category';
import { Tag, TagBase } from './Tag';

export interface InfoCardInput {
  title: string;
  subtitle: string;
  category: Category;
  tags: TagBase[];
  avatarUrl: string;
  summary: string;
  description: string;
  additionalSections: Section[];
}

interface InfoCard extends Entity {
  title: string;
  subtitle: string;
  category: Category;
  tags: Tag[];
  avatarUrl: string;
  summary: string;
  description: string;
  additionalSections?: Section[];
}

/**
 * Shallowly loaded preview of a card.
 */
export interface InfoCardPreview
  extends Entity,
    Pick<
      InfoCard,
      'title' | 'subtitle' | 'summary' | 'avatarUrl' | 'category' | 'tags'
    > {}

export const isInPreviewBody = (
  card: InfoCardPreview,
  query: string
): boolean =>
  card.title.toLowerCase().includes(query) ||
  card.subtitle?.toLowerCase().includes(query) ||
  card.summary.toLowerCase().includes(query);

export const hasAllTags = (card: InfoCardPreview, tags: Tag[]): boolean => {
  return tags.every((filterTag) =>
    card.tags?.find((cardTag) => cardTag.id === filterTag.id)
  );
};

export default InfoCard;
