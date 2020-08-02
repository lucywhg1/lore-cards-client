import Entity from "./Entity";
import Section from "./Section";
import Category from "./Category";
import Tag, { TagBase } from "./Tag";

interface InfoCard extends Entity {
  title: string;
  category: Category;
  description: Section;
  summary: string;
  tags?: Tag[];
  subtitle?: string;
  avatar?: File;
  relatedTo?: Section;
  linkedTo?: Section;
  additionalSections?: Section[];
}

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

export default InfoCard;
