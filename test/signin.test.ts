import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database/connection";
import userFactory from "./factories/userFactory";

describe("Testa Login de Usuário", () => {
  it("Deve retornar 422 ao tentar cadastrar com dados em formato inválido.", async () => {
    const user = await userFactory.dataInvalid();
    const response = await supertest(app).post("/signin").send(user);
    expect(response.status).toBe(422);
  });
  it("Deve retornar 422 ao tentar cadastrar com e-mail inválido", async () => {
    const user = await userFactory.loginEmailValid();
    const response = await supertest(app).post("/signin").send(user);
    expect(response.status).toBe(422);
  });
  it("Deve retornar 401 ao tentar fazer login com usuário inválido.", async () => {
    const user = await userFactory.loginValid();
    const response = await supertest(app).post("/signin").send(user);
    expect(response.status).toBe(401);
  });
  it("Deve retornar 200 ao fazer login com sucesso.", async () => {
    const user = await userFactory.createUserValid();
    await supertest(app).post("/signup").send(user);
    const response = await supertest(app)
      .post("/signin")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  connection.$disconnect();
});
