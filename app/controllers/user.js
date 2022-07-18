const bcrypt = require('bcryptjs')
const { errorMessage, successMessage } = require('../utils/response')
const UserModel = require('../models/user')
const userValidation = require('../validations/user')
const { generateToken } = require('../utils/token')

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
		errorMessage(res, 'Something Went Wrong')
	}
}

const authenticateController = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		return errorMessage(res, 'Wrong Credentials')
	}

	try {
		const user = await UserModel.findOne({ username }).lean().exec()

		if (user && (await bcrypt.compare(password, user.password))) {
			user.password = undefined
			delete user.password

			user.token = generateToken(user._id)

			return successMessage(res, 'User Authenticated Successfully', user)
		} else {
			errorMessage(res, 'error')
		}
	} catch (err) {
		errorMessage(res, 'Something Went Wrong')
	}
}

const userInfoController = async (req, res) => {
	return successMessage(res, null, req.authenticatedUser)
}

module.exports = {
	registerController,
	authenticateController,
	userInfoController,
}
