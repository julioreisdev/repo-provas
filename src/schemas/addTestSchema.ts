import joi from "joi";

const addTestSchema = joi.object({
  name: joi.string().required(),
  pdfUrl: joi.string().required(),
  category: joi.string().required(),
  discipline: joi.string().required(),
  teacher: joi.string().required(),
});

export default addTestSchema;
