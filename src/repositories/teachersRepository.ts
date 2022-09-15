import connection from "../database/connection";

async function findById(id: number) {
  return await connection.teachers.findUnique({ where: { id: id } });
}

const teachersRepositoty = {
  findById,
};

export default teachersRepositoty;
