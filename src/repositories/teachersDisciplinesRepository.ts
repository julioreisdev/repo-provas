import connection from "../database/connection";

async function findTacherDiscipline(teacherId: number, disciplineId: number) {
  return await connection.teachersDisciplines.findMany({
    where: { teacherId: teacherId, disciplineId: disciplineId },
  });
}

const teachersDisciplinesRepositoty = {
  findTacherDiscipline,
};

export default teachersDisciplinesRepositoty;
