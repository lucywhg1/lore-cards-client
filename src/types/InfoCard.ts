import Entity from './Entity';
import Section from './Section';
import Category from './Category';
import { Tag, TagBase } from './Tag';

export interface InfoCardInput {
  title: string;
  subtitle: string;
  category: Category;
  tags: TagBase[];
  summary: string;
  description: string;
  additionalSections: Section[];
  avatar: File | null;
}

interface InfoCard extends Entity {
  title: string;
  category: Category;
  description: Section;
  summary: string;
  tags?: Tag[];
  subtitle?: string;
  avatarUrl?: string;
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

export default InfoCard;
