import { Factory } from "fishery";
import Faker from "faker";
import Section from "../types/Section";

const SectionFactory = Factory.define<Section>(() => ({
  heading: Faker.company.bsNoun(),
  body: Faker.lorem.paragraph(),
}));

export default SectionFactory;
