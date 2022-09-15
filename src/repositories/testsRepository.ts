import connection from "../database/connection";
import { ITest } from "../interfaces/tests.interfaces";

async function insert(data: ITest) {
    return await connection.tests.create({data: data})
}

const testsRepository = {
    insert
};

export default testsRepository;
