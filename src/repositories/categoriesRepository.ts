import connection from "../database/connection";

async function findByid(id: number) {
  return await connection.categories.findUnique({ where: { id: id } });
}

const categoriesRepository = {
  findByid,
};

export default categoriesRepository;
