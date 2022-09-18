import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database/connection";
import userFactory from "./factories/userFactory";

describe("Testa Cadastro de Usuário", () => {
  it("Deve retornar 422 ao tentar cadastrar com email inválido.", async () => {
    const user = await userFactory.createUserEmailInvalid();
    const response = await supertest(app).post("/signup").send(user);
    expect(response.status).toBe(422);
  });
  it("Deve retornar 422 ao tentar cadastrar com dados em formato inválido.", async () => {
    const user = await userFactory.dataInvalid();
    const response = await supertest(app).post("/signup").send(user);
    expect(response.status).toBe(422);
  });
  it("Deve retornar 401 ao tentar cadastrar com senha de confirmação errada.", async () => {
    const user = await userFactory.createUserPasswordInvalid();
    const response = await supertest(app).post("/signup").send(user);
    expect(response.status).toBe(401);
  });
  it("Deve retornar 409 ao tentar cadastrar um usuário que já existe.", async () => {
    const user = await userFactory.createUserValid();
    await supertest(app).post("/signup").send(user);
    const response = await supertest(app).post("/signup").send(user);
    expect(response.status).toBe(409);
  });
  it("Deve retornar 201 ao cadastrar usuário.", async () => {
    const user = await userFactory.createUserValid();
    const response = await supertest(app).post("/signup").send(user);
    expect(response.status).toBe(201);
  });
});

afterAll(async () => {
  connection.$disconnect();
});
