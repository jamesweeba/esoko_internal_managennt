import Joi from 'joi';

const authSchema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .lowercase()
  .required(),
  username: Joi.string()
    .min(3)
    .max(20),
  password: Joi.string()
    .min(2)
    .required(),
})

export { authSchema };
