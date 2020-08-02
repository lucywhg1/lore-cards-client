import { Factory } from "fishery";
import Faker from "faker";

const ImageFactory = Factory.define<File>(() => {
  return new File([Faker.image.image()], `${Faker.system.fileName()}.jpg`, {
    type: "image/jpeg",
  });
});

export default ImageFactory;
