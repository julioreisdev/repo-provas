import connection from "../database/connection";

async function findById(id: number) {
  return await connection.teachers.findUnique({ where: { id: id } });
}

async function findByName(name: string) {
  return await connection.teachers.findUnique({ where: { name: name } });
}

const teachersRepositoty = {
  findById,
  findByName,
};

export default teachersRepositoty;
