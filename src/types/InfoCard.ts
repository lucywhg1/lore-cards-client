import Entity from './Entity';
import Section from './Section';
import Category from './Category';
import Relation from './Relation';
import { Tag, TagBase } from './Tag';

interface InfoCard extends Entity {
  title: string;
  category: Category;
  description: Section;
  summary: string;
  tags?: Tag[];
  subtitle?: string;
  avatar?: File;
  additionalSections?: Section[];
  relations?: Relation[];
}

export interface InfoCardInput {
  title: string;
  subtitle: string;
  category: Category;
  tags: TagBase[];
  summary: string;
  description: string;
  additionalSections: Section[];
  relations: Relation[];
  avatar: File | null;
}

export type InfoCardPreview = Pick<
  InfoCard,
  'title' | 'summary' | 'avatar' | 'category'
> &
  Entity;

export default InfoCard;
