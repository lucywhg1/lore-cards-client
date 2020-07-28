import { Factory } from "fishery";
import Faker from "faker";
import { InfoCardInput } from "../types/InfoCard";
import SectionFactory from "./SectionFactory";

interface InputTransientParams {
  filled?: boolean;
}

export const InfoCardInputFactory = Factory.define<InfoCardInput, InputTransientParams>(({transientParams}) => {
  const {filled = false} = transientParams;

  if (!filled) {
    return {
      title: '',
      category: {id: -1, name: 'Choose...'},
      subtitle: '',
      summary: '',
      description: '',
      additionalSections: []
    }
  } else {
    return   {
      title: Faker.company.companyName(),
      category: {
        id: -1, name: ""
      },
      subtitle: Faker.company.catchPhraseDescriptor(), 
      summary: Faker.lorem.words(10),
      description: Faker.lorem.paragraphs(2),
      additionalSections: SectionFactory.buildList(2)
    }
  }
}
);