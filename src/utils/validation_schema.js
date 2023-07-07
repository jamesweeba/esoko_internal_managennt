import Joi from 'joi';

const authSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),  
  access_token: [
    Joi.string(),
    Joi.number()
  ],
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).with('username', 'password')
  .xor('password', 'access_token')

export { authSchema };
