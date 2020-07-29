const Joi = require('@hapi/joi');

const registerValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

const registerUserValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3),
        phone: Joi.string().required(),
    });
    return schema.validate(data);
}

const loginUserValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data)
}

module.exports = {
    registerValidate,
    registerUserValidate,
    loginUserValidate,
}