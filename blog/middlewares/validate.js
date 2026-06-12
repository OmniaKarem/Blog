const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required()
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { registerSchema, loginSchema, postSchema, validate };