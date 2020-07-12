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

interface Section {
  heading: string;
  text: string;
}

export default InfoCard;
