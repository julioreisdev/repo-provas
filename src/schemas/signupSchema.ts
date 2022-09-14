import joi from "joi";

const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirm: joi.string().required(),
});

export default signupSchema;
