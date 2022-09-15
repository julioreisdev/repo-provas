import connection from "../database/connection";

async function findByName(name: string) {
  return await connection.disciplines.findUnique({ where: { name: name } });
}

const disciplinesRepository = {
  findByName,
};

export default disciplinesRepository;
