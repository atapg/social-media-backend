const Joi = require('joi')
const { validatorErrorMessage } = require('./validatorErrorMessage')

const schema = Joi.object().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	username: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required().min(8),
})

module.exports = (data) => validatorErrorMessage(schema, data)
