import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database/connection";
import testsFactory from "./factories/testsFactory";
import userFactory from "./factories/userFactory";

async function token() {
  const user = await userFactory.createUserValid();
  await supertest(app).post("/signup").send(user);
  const response = await supertest(app)
    .post("/signin")
    .send({ email: user.email, password: user.password });
  return response.body.token;
}

async function testDataNotFound() {
  const test = await testsFactory.dataFormmatValid();
  const tokenValue = await token();
  const response = await supertest(app)
    .post("/tests")
    .set("Authorization", `Bearer ${tokenValue}`)
    .send(test);
  return response.status;
}

describe("Testa Cadastro de Prova", () => {
  it("Deve retornar 422 ao tentar cadastrar com dados inválidos.", async () => {
    const test = await testsFactory.dataInvalid();
    const tokenValue = await token();
    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send(test);
    expect(response.status).toBe(422);
  });
  it("Deve retornar 404 ao tentar cadastrar com categoria inexistente.", async () => {
    const result = await testDataNotFound();
    expect(result).toBe(404);
  });
  it("Deve retornar 404 ao tentar cadastrar com disciplina inexistente.", async () => {
    const result = await testDataNotFound();
    expect(result).toBe(404);
  });
  it("Deve retornar 404 ao tentar cadastrar com professor inexistente.", async () => {
    const result = await testDataNotFound();
    expect(result).toBe(404);
  });
  it("Deve retornar 404 ao tentar cadastrar com professor e disciplina incompatíveis.", async () => {
    const result = await testDataNotFound();
    expect(result).toBe(404);
  });
  it("Deve retornar 201 ao cadastrar prova com sucesso.", async () => {
    const test = await testsFactory.dataValid();
    const tokenValue = await token();
    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send(test);
    expect(response.status).toBe(201);
  });
});

describe("Testa Busca de Provas Por Disciplinas", () => {
  it("Deve retornar 200 ao buscar provas por disciplinas", async () => {
    const tokenValue = await token();
    const response = await supertest(app)
      .get("/tests/disciplines")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("Testa Busca de Provas Por Professores", () => {
  it("Deve retornar um array ao buscar provas por professores", async () => {
    const tokenValue = await token();
    const response = await supertest(app)
      .get("/tests/teachers")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  connection.$disconnect();
});
