const validatorErrorMessage = (schema, data) => {
	if (schema.validate(data).error) {
		return schema.validate(data).error.details[0].message
	} else {
		return null
	}
}

module.exports = { validatorErrorMessage }
