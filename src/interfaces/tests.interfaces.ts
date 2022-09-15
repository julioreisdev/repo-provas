import { Tests } from "@prisma/client";

export interface ITest {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}
