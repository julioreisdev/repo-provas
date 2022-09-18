import { faker } from "@faker-js/faker";

async function dataInvalid() {
  return {};
}

async function dataFormmatValid() {
  return {
    name: faker.lorem.word(2),
    pdfUrl: faker.internet.url(),
    category: faker.lorem.word(2),
    discipline: faker.lorem.word(2),
    teacher: faker.lorem.word(2),
  };
}

async function dataValid() {
  return {
    name: faker.lorem.word(2),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "React",
    teacher: "Diego Pinho",
  };
}

const testsFactory = {
  dataInvalid,
  dataFormmatValid,
  dataValid
};

export default testsFactory;
