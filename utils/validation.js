const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  variants: Joi.array().items(
    Joi.object({
      size: Joi.string().required(),
      color: Joi.string().required(),
      stock: Joi.number().required().default(0),
    })
  ),
  discount: Joi.number().default(0),
});

const validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  } else {
    next();
  }
};

module.exports = {
  validateProduct,
};