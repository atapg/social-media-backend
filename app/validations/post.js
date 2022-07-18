const Joi = require('joi')
const { validatorErrorMessage } = require('./validatorErrorMessage')

const schema = Joi.object().keys({
	title: Joi.string(),
	content: Joi.string().required(),
	postType: Joi.string().valid('text', 'image', 'video').required(),
})

module.exports = (data) => validatorErrorMessage(schema, data)
