import joi from "joi";

const addTestSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().integer().required(),
    teacherDisciplineId: joi.number().integer().required()
})

export default addTestSchema