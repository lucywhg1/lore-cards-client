import { Factory } from 'fishery';
import Faker from 'faker';
import { InfoCardInput } from '../types/InfoCard';
import SectionFactory from './SectionFactory';
import ImageFactory from './FileFactory';
import TagFactory from './TagFactory';

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
      category: { id: -1, name: 'Choose...' },
      tags: [],
      avatar: null,
      subtitle: '',
      summary: '',
      description: '',
      additionalSections: [],
      relations: []
    };
  } else {
    return {
      title: Faker.company.companyName(),
      category: {
        id: -1,
        name: ''
      },
      tags: TagFactory.buildList(2),
      avatar: ImageFactory.build(),
      subtitle: Faker.company.catchPhraseDescriptor(),
      summary: Faker.lorem.words(10),
      description: Faker.lorem.paragraphs(2),
      additionalSections: SectionFactory.buildList(2),
      relations: []
    };
  }
});
