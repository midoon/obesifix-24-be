import Joi from "joi";

const registerUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    activity: Joi.string().required(),
    food_type: Joi.string().required(),
  });

  return schema.validate(payload);
};

const loginUserValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

const updateUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().allow(null),
    age: Joi.number().allow(null),
    height: Joi.number().allow(null),
    weight: Joi.number().allow(null),
    activity: Joi.string().allow(null),
    food_type: Joi.string().allow(null),
  });

  return schema.validate(payload);
};

export { registerUserValidation, updateUserValidation, loginUserValidation };
