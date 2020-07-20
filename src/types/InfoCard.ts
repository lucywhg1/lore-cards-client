import Entity from "./Entity";
import Section from "./Section";
import Category from "./Category";

interface InfoCard extends Entity {
  title: string;
  category: Category;
  description: Section;
  summary: string;
  tags?: string[];
  subtitle?: string;
  avatarUrl?: string;
  relatedTo?: Section;
  linkedTo?: Section;
  additionalSections?: Section[];
}

export default InfoCard;