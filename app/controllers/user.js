const { errorMessage, successMessage } = require('../utils/response')
const UserModel = require('../models/user')
const userValidation = require('../validations/user')

const registerController = async (req, res) => {
	const error = userValidation(req.body)

	if (error) return errorMessage(res, error)

	try {
		const isUserExists = await UserModel.findOne({
			$or: [{ username: req.body.username }, { email: req.body.email }],
		})

		if (isUserExists) {
			return errorMessage(res, 'Username Already Exists')
		}

		const user = await UserModel.create(req.body)
		user.password = undefined

		delete user.password

		if (user) {
			return successMessage(res, 'User Created Successfully', user)
		} else {
			errorMessage(res, 'error')
		}
	} catch (err) {
		errorMessage(res, err)
	}
}

module.exports = {
	registerController,
}
