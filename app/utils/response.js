const success = (res, message = 'Successful', data = [], code = 200) => {
	res.status(code).json({ data, message })
}

const error = (
	res,
	message = 'Something Went Wrong',
	data = [],
	code = 400,
) => {
	res.status(code).json({ message })
}

module.exports = {
	errorMessage: error,
	successMessage: success,
}
