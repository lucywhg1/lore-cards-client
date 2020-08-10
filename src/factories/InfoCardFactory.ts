import { emptyCategory } from './../types/Category';
import { InfoCardPreview } from './../types/InfoCard';
import { Factory } from 'fishery';
import Faker from 'faker';
import { InfoCardInput } from '../types/InfoCard';
import SectionFactory from './SectionFactory';
import ImageFactory from './FileFactory';
import TagFactory from './TagFactory';
import CategoryFactory from './CategoryFactory';

export const InfoCardPreviewFactory = Factory.define<InfoCardPreview>(
  ({ sequence }) => ({
    id: sequence - 1,
    title: Faker.company.companyName(),
    subtitle: Faker.company.catchPhrase(),
    category: CategoryFactory.build(),
    avatarUrl:
      'https://i.pinimg.com/736x/53/3f/06/533f067180680761bb42ca3208243348.jpg',
    summary: Faker.lorem.paragraph()
  })
);

interface InputTransientParams {
  filled?: boolean;
}

export const InfoCardInputFactory = Factory.define<
  InfoCardInput,
  InputTransientParams
>(({ transientParams }) => {
  const { filled = false } = transientParams;

  if (!filled) {
    return {
      title: '',
      category: emptyCategory,
      tags: [],
      avatar: null,
      subtitle: '',
      summary: '',
      description: '',
      additionalSections: []
      // relations: []
    };
  } else {
    return {
      title: Faker.company.companyName(),
      category: CategoryFactory.build(),
      tags: TagFactory.buildList(2),
      avatar: ImageFactory.build(),
      subtitle: Faker.company.catchPhraseDescriptor(),
      summary: Faker.lorem.words(10),
      description: Faker.lorem.paragraphs(2),
      additionalSections: SectionFactory.buildList(2)
      // relations: []
    };
  }
});
