import { faker } from "@faker-js/faker";

async function createUserValid() {
  const password = faker.lorem.word(2);
  return {
    email: faker.internet.email(),
    password: '123',
    passwordConfirm: '123',
  };
}

async function createUserEmailInvalid() {
  const password = faker.lorem.word(2);
  return {
    email: "",
    password: password,
    passwordConfirm: password,
  };
}

async function createUserPasswordInvalid() {
  const password = faker.lorem.word(2);
  return {
    email: faker.internet.email(),
    password: "123",
    passwordConfirm: "321",
  };
}

async function loginValid() {
  return {
    email: faker.internet.email(),
    password: faker.lorem.word(2),
  };
}

async function loginEmailValid() {
  return {
    email: "",
    password: faker.lorem.word(2),
  };
}

async function dataInvalid() {
  return {};
}

const userFactory = {
  createUserValid,
  createUserEmailInvalid,
  createUserPasswordInvalid,
  loginValid,
  loginEmailValid,
  dataInvalid,
};

export default userFactory;
