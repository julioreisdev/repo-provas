import { Tests } from "@prisma/client";

export type ITest = Omit<Tests, 'id'>