import Joi from 'joi';

const authSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .min(2)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .lowercase()
    .required(),
})

export { authSchema };
