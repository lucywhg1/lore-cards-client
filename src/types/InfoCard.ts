import Section from "./Section";

interface InfoCard {
  title: string;
  category: string;
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
