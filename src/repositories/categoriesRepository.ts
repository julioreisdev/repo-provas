import connection from "../database/connection";

async function findByid(id: number) {
  return await connection.categories.findUnique({ where: { id: id } });
}

async function findByName(name: string) {
  return await connection.categories.findUnique({ where: { name: name } });
}

const categoriesRepository = {
  findByid,
  findByName,
};

export default categoriesRepository;
